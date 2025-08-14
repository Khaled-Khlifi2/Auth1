import React from 'react';

const statusColors = {
  'Ouvert': 'bg-green-100 text-green-700',
  'Fermé': 'bg-red-100 text-red-700',
  'En cours': 'bg-yellow-100 text-yellow-800',
};

const priorityColors = {
  'Haute': 'bg-red-100 text-red-700',
  'Moyenne': 'bg-yellow-100 text-yellow-800',
  'Basse': 'bg-blue-100 text-blue-700',
};

const personnels = ['Ahlem', 'Nawfel', 'Aziz'];

const TicketTable = ({ tickets, onPriorityChange, onAssignChange }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg bg-white border border-gray-200">
      <table className="min-w-full text-sm font-sans text-gray-700">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 text-left font-semibold">Titre</th>
            <th className="p-4 text-left font-semibold">Statut</th>
            <th className="p-4 text-left font-semibold">Priorité</th>
            <th className="p-4 text-left font-semibold">Assigné à</th>
            <th className="p-4 text-left font-semibold">Date de début</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr
              key={ticket._id || ticket.id} // support both DB _id and local id
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="p-4">{ticket.title}</td>
              <td className="p-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="p-4">
                <select
                  className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${priorityColors[ticket.priority]}`}
                  value={ticket.priority}
                  onChange={e => onPriorityChange(ticket._id || ticket.id, e.target.value)}
                >
                  <option value="Haute">Haute</option>
                  <option value="Moyenne">Moyenne</option>
                  <option value="Basse">Basse</option>
                </select>
              </td>
              <td className="p-4">
                <select
                  className="px-3 py-1 rounded-full text-xs cursor-pointer border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={ticket.assignedTo}
                  onChange={e => onAssignChange(ticket._id || ticket.id, e.target.value)}
                >
                  {personnels.map(person => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              </td>
              <td className="p-4">
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleDateString('fr-FR')
                  : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
