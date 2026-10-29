import { useRef, useState } from "react";
import "./App.css";

import Calendar from "./components/Calendar/Calendar";
import Chatbot from "./components/Chatbot/Chatbot";
import Contact from "./components/contact/Contact";
import Speakers from "./components/Speakers/Speakers";
import Footer from "./components/footer/Footer";
import Metrics from "./components/Metrics/metricas";
import Sponsor from "./components/Sponsor/sponsor";
import Sponsors from "./components/Sponsors/sponsors";
import Tickets from "./components/tickets/Tickets";
import Navbar from "./navbar/navbar";
import Hero from "./components/hero/Hero";
import PaymentGateway from "./components/payment/PaymentGateway";
import Timer from "./components/timer/Timer";

const TOTAL_EARLY_TICKETS = 60;
const INITIAL_REMAINING_TICKETS = 38;

function App() {
  const [remainingEarlyTickets, setRemainingEarlyTickets] = useState(
    INITIAL_REMAINING_TICKETS
  );

  const remainingTicketsRef = useRef(INITIAL_REMAINING_TICKETS);

  const [paymentSelection, setPaymentSelection] = useState({
    ticketId: "early",
    version: 0,
  });

  function handleSelectTicket(ticketId: string) {
    if (!["early", "general", "virtual"].includes(ticketId)) return;

    setPaymentSelection((previous) => ({
      ticketId,
      version: previous.version + 1,
    }));

    window.requestAnimationFrame(() => {
      const paymentSection = document.getElementById("payment");

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      paymentSection?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function handlePurchase(ticketId: string, quantity: number): boolean {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      return false;
    }

    if (ticketId === "general" || ticketId === "virtual") {
      return true;
    }

    if (ticketId !== "early") {
      return false;
    }

    if (quantity > remainingTicketsRef.current) {
      return false;
    }

    const newRemainingTickets = remainingTicketsRef.current - quantity;

    remainingTicketsRef.current = newRemainingTickets;
    setRemainingEarlyTickets(newRemainingTickets);

    return true;
  }

  return (
    <>
      <Navbar />
      <Hero />
      <Metrics />
      <Speakers />
      <Calendar />

      <Timer
        totalTickets={TOTAL_EARLY_TICKETS}
        remainingTickets={remainingEarlyTickets}
      />

      <Tickets
        remainingEarlyTickets={remainingEarlyTickets}
        onSelectTicket={handleSelectTicket}
      />

      <PaymentGateway
        key={paymentSelection.version}
        initialTicketId={paymentSelection.ticketId}
        remainingEarlyTickets={remainingEarlyTickets}
        onPurchase={handlePurchase}
      />

      <Sponsor />
      <Sponsors />
      <Contact />
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;