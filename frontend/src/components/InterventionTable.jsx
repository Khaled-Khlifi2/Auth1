import React from 'react';

const statusColors = {
  Planifiée: 'bg-yellow-100 text-yellow-800',
  'En cours': 'bg-blue-100 text-blue-700',
  Terminée: 'bg-green-100 text-green-700',
};

const priorityColors = {
  Haute: 'bg-red-100 text-red-700',
  Moyenne: 'bg-yellow-100 text-yellow-800',
  Basse: 'bg-blue-100 text-blue-700',
};

const InterventionTable = ({ interventions = [], onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow bg-white border border-gray-200">
      <table className="min-w-[900px] w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold">
            <th className="p-4">Code</th>
            <th className="p-4">Titre</th>
            <th className="p-4">Client</th>
            <th className="p-4">Début</th>
            <th className="p-4">Fin</th>
            <th className="p-4">Statut</th>
            <th className="p-4">Priorité</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interventions.map((item) => (
            <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="p-4">{item.code}</td>
              <td className="p-4">{item.titre}</td>
              <td className="p-4">{item.client}</td>
              <td className="p-4">{item.début}</td>
              <td className="p-4">{item.fin}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[item.statut]}`}>
                  {item.statut}
                </span>
              </td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[item.priorité]}`}>
                  {item.priorité}
                </span>
              </td>
              <td className="p-4 space-x-2">
                <button onClick={() => onEdit(item.id)} className="text-blue-600 hover:underline text-xs">
                  Éditer
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:underline text-xs">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}

          {interventions.length === 0 && (
            <tr>
              <td colSpan="8" className="p-4 text-center text-gray-400">
                Aucune intervention enregistrée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterventionTable;
