import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import Chatbot from "./components/Chatbot/Chatbot";
import Contact from "./components/contact/Contact";
import Speakers from './components/Speakers/Speakers';
import Footer from './components/footer/Footer';
import Metrics from "./components/Metrics/metricas";
import Sponsor from "./components/Sponsor/sponsor";
import Sponsors from "./components/Sponsors/sponsors";
import Tickets from "./components/tickets/Tickets";
import Navbar from "./navbar/navbar";
import Hero from "./components/hero/Hero";
import PaymentGateway from "./components/payment/PaymentGateway";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Metrics />
      <Speakers />
      <Calendar />
      <Timer />
      <Tickets />
      <PaymentGateway />
      <Sponsor />
      <Sponsors />
      <Contact />
      <Footer />
      <Chatbot />
      
      
    </>
  );
}

export default App;
