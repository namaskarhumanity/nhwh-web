import Header from "./Header";
import Footer from "./Footer";
import WhatsAppWidget from "../components/WhatsAppWidget";
import { Helmet } from "react-helmet";

const Layout = ({
  children,
  title = "Namaskar Humanity Welfare Society - Transforming Lives, Building Hope",
  description = "Join Namaskar Humanity Welfare Society in creating lasting change through education, healthcare, and women empowerment initiatives. A UP government-registered NGO making a positive impact on society.",
  keywords = "NGO, charity, education, healthcare, women empowerment, social work, volunteer, donate, Namaskar Humanity",
}) => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
      </Helmet>
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default Layout;
