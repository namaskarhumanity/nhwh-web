import { motion } from "framer-motion";
import Layout from "../layout/Layout";
import { CheckCircleIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo/nhws-logo.png";
import TextLogo from "../assets/logo/nhws-text.png";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [downloading, setDownloading] = useState(false);
  const paymentId = searchParams.get("payment_id");
  const orderId = searchParams.get("order_id");
  const amount = searchParams.get("amount");
  const donorName = searchParams.get("donor_name") || "N/A";
  const donorPhone = searchParams.get("donor_phone") || "N/A";
  const ngoRegistrationNumber = "KOS/07181/2023-2024";

  const getImageDataUrl = (src) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";

      image.onload = () => {
        const maxDimension = 240;
        const scale = Math.min(maxDimension / image.width, maxDimension / image.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");
        if (!context) {
          reject(new Error("Unable to prepare logo for receipt"));
          return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve({
          dataUrl: canvas.toDataURL("image/png"),
          width: canvas.width,
          height: canvas.height,
        });
      };

      image.onerror = () => reject(new Error("Unable to load logo for receipt"));
      image.src = src;
    });

  const getEmojiDataUrl = (emoji, size = 72) => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    context.clearRect(0, 0, size, size);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = `${Math.floor(size * 0.72)}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
    context.fillText(emoji, size / 2, size / 2 + 1);

    return canvas.toDataURL("image/png");
  };

  const downloadReceipt = async () => {
    setDownloading(true);
    try {
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;
      const [logoImage, textLogoImage] = await Promise.all([
        getImageDataUrl(Logo),
        getImageDataUrl(TextLogo),
      ]);
      const heartEmoji = getEmojiDataUrl("❤️");
      const namaskarEmoji = getEmojiDataUrl("🙏");

      const formatCurrency = (value) => {
        const numeric = Number(value);
        return Number.isFinite(numeric)
          ? `INR ${numeric.toLocaleString("en-IN")}`
          : `INR ${value || "---"}`;
      };

      const drawField = (label, value, y, valueX = margin + 62) => {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(71, 85, 105);
        pdf.text(label, margin + 8, y);

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(15, 23, 42);
        pdf.text(String(value), valueX, y);
      };

      pdf.setDrawColor(125, 211, 252);
      pdf.setLineWidth(0.9);
      pdf.rect(margin, 10, contentWidth, pageHeight - 24);

      pdf.setFillColor(240, 249, 255);
      pdf.rect(margin + 1, 11, contentWidth - 2, 30, "F");

      const logoRatio = logoImage.width / logoImage.height;
      const logoDrawWidth = logoRatio >= 1 ? 14 : 14 * logoRatio;
      const logoDrawHeight = logoRatio >= 1 ? 14 / logoRatio : 14;
      const logoX = margin + 6;
      const logoY = 16;
      pdf.addImage(logoImage.dataUrl, "PNG", logoX, logoY, logoDrawWidth, logoDrawHeight);

      const textLogoRatio = textLogoImage.width / textLogoImage.height;
      const textLogoDrawWidth = 24;
      const textLogoDrawHeight = textLogoDrawWidth / textLogoRatio;
      const textLogoX = logoX + logoDrawWidth + 4;
      const textLogoY = 17;
      pdf.addImage(
        textLogoImage.dataUrl,
        "PNG",
        textLogoX,
        textLogoY,
        textLogoDrawWidth,
        textLogoDrawHeight
      );

      const headerTextX = Math.max(margin + 28, textLogoX + textLogoDrawWidth + 6);

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(2, 132, 199);
      pdf.setFontSize(14);
      pdf.text("Namaskar Humanity Welfare Society", headerTextX, 20);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      pdf.text("Kaushambi, Uttar Pradesh", headerTextX, 26);
      pdf.text(`NGO Reg. No: ${ngoRegistrationNumber}`, headerTextX, 31);
      pdf.text("Email: info@namaskarhumanity.org | Web: namaskarhumanity.org", headerTextX, 35);

      pdf.setDrawColor(226, 232, 240);
      pdf.setLineWidth(0.5);
      pdf.line(margin + 5, 41, pageWidth - margin - 5, 41);

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(29, 78, 216);
      pdf.setFontSize(16);
      pdf.text("DONATION RECEIPT", margin + 6, 52);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(100, 116, 139);
      pdf.text("Acknowledgement of successful contribution", margin + 6, 58);
      if (heartEmoji) {
        pdf.addImage(heartEmoji, "PNG", pageWidth - margin - 24, 46, 4.8, 4.8);
      }
      if (namaskarEmoji) {
        pdf.addImage(namaskarEmoji, "PNG", pageWidth - margin - 18, 46, 4.8, 4.8);
      }

      pdf.setFillColor(248, 250, 252);
      pdf.setDrawColor(186, 230, 253);
      pdf.rect(margin + 6, 64, contentWidth - 12, 79, "FD");

      drawField("Receipt Number", paymentId || "N/A", 74);
      drawField("Order ID", orderId || "N/A", 82);
      drawField("Transaction Date", formatDate(), 90);
      drawField("Donor Name", donorName, 98);
      drawField("Donor Phone", donorPhone, 106);
      drawField("Payment Method", "Razorpay", 114);
      drawField("Payment Status", "SUCCESSFUL", 122);
      drawField("NGO Registration No.", ngoRegistrationNumber, 130);

      pdf.setFillColor(239, 246, 255);
      pdf.rect(margin + 6, 150, contentWidth - 12, 26, "F");
      pdf.setDrawColor(147, 197, 253);
      pdf.rect(margin + 6, 150, contentWidth - 12, 26);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(3, 105, 161);
      pdf.text("Amount Received", margin + 10, 159);
      pdf.setFontSize(18);
      pdf.setTextColor(30, 64, 175);
      pdf.text(formatCurrency(amount), margin + 10, 170);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(71, 85, 105);
      pdf.text("Purpose: Social welfare and community development initiatives", margin + 86, 163, {
        maxWidth: 78,
      });

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.setTextColor(51, 65, 85);
      pdf.text("Issued By", margin + 6, 189);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.8);
      pdf.setTextColor(71, 85, 105);
      pdf.text("Namaskar Humanity Welfare Society", margin + 6, 196);
      pdf.text(`Reg. No: ${ngoRegistrationNumber}`, margin + 6, 202);

      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(51, 65, 85);
      pdf.text("Anurag Singh", pageWidth - 72, 196);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      pdf.setTextColor(71, 85, 105);
      pdf.text("Authorized Signatory", pageWidth - 72, 201);
      pdf.setDrawColor(148, 163, 184);
      pdf.line(pageWidth - 76, 205, pageWidth - margin - 6, 205);

      pdf.setFillColor(236, 253, 245);
      pdf.setDrawColor(167, 243, 208);
      pdf.rect(margin + 6, 215, contentWidth - 12, 20, "FD");
      pdf.setFont("helvetica", "italic");
      pdf.setFontSize(8.5);
      pdf.setTextColor(6, 95, 70);
      pdf.text(
        "With love and gratitude, thank you for supporting humanity. This is a system-generated receipt.",
        margin + 10,
        226,
        { maxWidth: contentWidth - 20 }
      );
      if (heartEmoji) {
        pdf.addImage(heartEmoji, "PNG", pageWidth - margin - 25, 219, 5, 5);
      }
      if (namaskarEmoji) {
        pdf.addImage(namaskarEmoji, "PNG", pageWidth - margin - 18.5, 219, 5, 5);
      }

      pdf.setDrawColor(226, 232, 240);
      pdf.line(margin + 5, pageHeight - 18, pageWidth - margin - 5, pageHeight - 18);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text(`Generated on ${formatDate()}`, margin + 6, pageHeight - 12);
      pdf.text("Page 1 of 1", pageWidth - margin - 20, pageHeight - 12);

      const fileName = `payment-receipt-${paymentId || "unknown"}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to download receipt. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const formatDate = (date = new Date()) => {
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Layout
      title={"Payment Successful - Namaskar Humanity Welfare Society"}
      description={"Your donation has been successfully processed. Thank you for your generosity!"}
      keywords={"payment success, donation success, thank you"}
    >
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <motion.div
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <CheckCircleIcon className="w-20 h-20 text-green-500" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
            <p className="text-gray-600 text-lg mb-6">
              Your donation has been successfully processed.
            </p>
            <div className="mb-6 flex items-center justify-center gap-4 rounded-xl border border-sky-100 bg-sky-50/60 px-4 py-3">
              <img src={Logo} alt="NHWS logo" className="h-10 w-10 object-contain" />
              <img
                src={TextLogo}
                alt="Namaskar Humanity text logo"
                className="h-8 object-contain"
              />
            </div>
            <div className="flex gap-2 flex-col mt-4">
              <button
                onClick={downloadReceipt}
                disabled={downloading}
                className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                {downloading ? "Downloading..." : "Download Receipt (PDF)"}
              </button>
              <Link
                to="/"
                className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all text-center"
              >
                Back to Home
              </Link>
              <Link
                to="/program"
                className="w-full py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all text-center"
              >
                View Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentSuccess;
