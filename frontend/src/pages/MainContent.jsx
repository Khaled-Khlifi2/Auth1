import React, { useState } from 'react';
import Tickets from './Tickets';
import Interventions from './Interventions';

// Données initiales
const initialTickets = [
  { id: 1, title: 'Login Issue', status: 'Ouvert', priority: 'Haute', assignedTo: 'Alice', date: '2025-08-01', dateFin: '2025-08-05' },
  { id: 2, title: 'Bug sur dashboard', status: 'Fermé', priority: 'Moyenne', assignedTo: 'Bob', date: '2025-08-02', dateFin: '2025-08-04' },
  { id: 3, title: 'Demande de modification', status: 'En cours', priority: 'Basse', assignedTo: '', date: '2025-08-03', dateFin: '' },
];

const initialInterventions = [
  {
    id: 1,
    code: 'INT-001',
    titre: 'Remplacement matériel',
    statut: 'Planifiée',
    priorité: 'Haute',
    client: 'Client A',
    début: '2025-08-01',
    fin: '2025-08-03',
    réponse: 'En attente',
  },
];

const MainContent = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [interventions, setInterventions] = useState(initialInterventions);

  const handleAddTicket = ({ title, priority, assignedTo, dateFin }) => {
    const nextId = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
    const today = new Date().toISOString().split('T')[0];

    const newTicket = {
      id: nextId,
      title,
      status: 'Ouvert',
      priority,
      assignedTo,
      date: today,
      dateFin,
    };

    setTickets(prev => [...prev, newTicket]);

    if (assignedTo) {
      const newIntervention = {
        id: nextId,
        code: `INT-${String(nextId).padStart(3, '0')}`,
        titre: title,
        statut: 'Planifiée',
        priorité: priority,
        client: assignedTo,
        début: today,
        fin: dateFin || '',
        réponse: 'En attente',
      };
      setInterventions(prev => [...prev, newIntervention]);
    }
  };

  const handleAddIntervention = (newIntervention) => {
    setInterventions(prev => [...prev, newIntervention]);
  };

  return (
    <div className="flex space-x-10 p-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">Tickets</h2>
        <Tickets
          tickets={tickets}
          setTickets={setTickets}
          onAddTicket={handleAddTicket}
          onNewIntervention={handleAddIntervention} // <-- important
        />
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-4">Interventions</h2>
        <Interventions
          interventions={interventions}
          setInterventions={setInterventions}
        />
      </div>
    </div>
  );
};

export default MainContent;
