// src/pages/Tickets.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderBar from "../components/HeaderBar";
import TicketTable from "../components/TicketTable";
import AddTicketModal from "../components/AddTicketModal";

const API_URL = "http://localhost:3000"; // Your backend URL

const reclamationsClients = [
  { id: 1, title: "Connexion impossible", clientName: "Client A" },
  { id: 2, title: "Erreur 500 sur API", clientName: "Client B" },
  { id: 3, title: "Formulaire inactif", clientName: "Client C" },
];

const Tickets = ({ onNewIntervention }) => {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch tickets from backend
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Add new ticket
  const handleAddTicket = async ({ title, priority, assignedTo, dateFin, reclamationId }) => {
    try {
      const token = localStorage.getItem("token");
      const today = new Date().toISOString().split("T")[0];

      const res = await axios.post(
        `${API_URL}/tickets`,
        {
          title,
          priority,
          assignedTo,
          status: "En cours", // default
          date: today,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Add the new ticket to state without refetch
      setTickets((prev) => [...prev, res.data.ticket]);
      setShowModal(false);

      // Optional: Add intervention
      if (assignedTo && onNewIntervention) {
        const reclamation = reclamationsClients.find((r) => r.id === parseInt(reclamationId));
        const clientName = reclamation?.clientName || assignedTo;

        const newIntervention = {
          id: Date.now(),
          code: `INT-${tickets.length + 1}`,
          titre: title,
          statut: "Planifiée",
          priorité: priority,
          client: clientName,
          début: today,
          fin: dateFin || "",
          réponse: "En attente",
        };

        onNewIntervention(newIntervention);
      }
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  // In Tickets.jsx
const handlePriorityChange = (id, newPriority) => {
  setTickets((prevTickets) =>
    prevTickets.map((t) => (t.id === id ? { ...t, priority: newPriority } : t))
  );

  // Optional: call API to update backend
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/tickets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ priority: newPriority }),
  });
};

const handleAssignChange = (id, newAssignedTo) => {
  setTickets((prevTickets) =>
    prevTickets.map((t) => (t.id === id ? { ...t, assignedTo: newAssignedTo } : t))
  );

  // Optional: call API to update backend
  const token = localStorage.getItem('token');
  fetch(`http://localhost:3000/tickets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ assignedTo: newAssignedTo }),
  });
};


  const filteredTickets = tickets.filter((ticket) => {
    const matchesDate = dateFilter ? ticket.date === dateFilter : true;
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;
    return matchesDate && matchesStatus;
  });

  return (
    <>
      <div className={`${showModal ? "blur-sm pointer-events-none select-none" : ""} p-6 space-y-6`}>
        <HeaderBar
          onAdd={() => setShowModal(true)}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        <TicketTable tickets={filteredTickets} />
      </div>

      <AddTicketModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddTicket}
        reclamationsClients={reclamationsClients}
      />
    </>
  );
};

export default Tickets;
