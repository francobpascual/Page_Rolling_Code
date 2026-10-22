import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import Contact from "./components/contact/Contact";
import Speakers from './components/Speakers/Speakers';
import Footer from './components/footer/Footer';
import Metrics from "./components/Metrics/metricas";
import Speakers from "./components/Speakers/Speakers";
import Sponsor from "./components/Sponsor/sponsor";
import Sponsors from "./components/Sponsors/sponsors";
import Tickets from "./components/tickets/Tickets";

function App() {
  return (
    <>
      <Metrics />
      <Speakers />
      <Calendar />
      <Tickets />
      <Sponsor />
      <Sponsors />
      <Contact />
      <Footer />
      
      
    </>
  );
}

export default App;
