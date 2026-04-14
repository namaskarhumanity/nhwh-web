import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget = () => {
  const whatsappNumber = "918808250884";
  const message = "Hello! I'm interested in learning more about Namaskar Humanity Welfare Society.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-400 hover:bg-green-500 text-white px-4 py-3 rounded-2xl shadow-2xl hover:shadow-green-400/50 transition-all duration-300 flex items-center gap-3 group"
        style={{ minWidth: '160px' }}
      >
        <FaWhatsapp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Contact Us
          </span>
          <span className="text-xs text-green-100" style={{ fontFamily: "'Inter', sans-serif" }}>
            WhatsApp
          </span>
        </div>
      </button>
    </div>
  );
};

export default WhatsAppWidget; 