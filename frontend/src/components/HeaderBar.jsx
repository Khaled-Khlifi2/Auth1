import React from 'react';

const HeaderBar = ({
  hideAddButton = false,
  showAddInterventionButton = false,
  onAdd,
  onAddIntervention,
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center bg-blue-100 p-4 rounded-t-md shadow">
      <div className="flex flex-wrap items-center gap-4">
        {!hideAddButton && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            <span className="material-icons text-sm">add</span> Ajouter un ticket
          </button>
        )}

        {showAddInterventionButton && (
          <button
            onClick={onAddIntervention}
            className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            <span className="material-icons text-sm">add</span> Ajouter une intervention
          </button>
        )}

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="">Tous les statuts</option>
          <option value="Ouvert">Ouvert</option>
          <option value="Fermé">Fermé</option>
          <option value="En cours">En cours</option>
        </select>
      </div>

      <div className="flex items-center gap-3 mt-2 sm:mt-0">
        <button className="flex items-center gap-1 text-sm text-blue-700 hover:underline">
          <span className="material-icons text-sm">print</span> Imprimer
        </button>
        <button className="flex items-center gap-1 text-sm text-green-600 hover:underline">
          <span className="material-icons text-sm">file_download</span> Exporter
        </button>
      </div>
    </div>
  );
};

export default HeaderBar;
