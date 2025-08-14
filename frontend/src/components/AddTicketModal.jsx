import React, { useState, useEffect } from 'react';

const AddTicketModal = ({ isOpen, onClose, onSubmit, reclamationsClients }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Moyenne');
  const [assignedTo, setAssignedTo] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [reclamationId, setReclamationId] = useState(null);

  // Si on sélectionne une réclamation, le titre et la date fin se mettent à jour
  useEffect(() => {
    if (reclamationId) {
      const rec = reclamationsClients.find(r => r.id === parseInt(reclamationId));
      if (rec) {
        setTitle(rec.title);
        // dateFin reste libre pour être modifiée par l'utilisateur
      }
    }
  }, [reclamationId]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !assignedTo) {
      alert("Veuillez sélectionner une réclamation et un assigné.");
      return;
    }
    onSubmit({ title, priority, assignedTo, dateFin, reclamationId });
    setTitle('');
    setPriority('Moyenne');
    setAssignedTo('');
    setDateFin('');
    setReclamationId(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded p-6 w-[400px] space-y-4"
      >
        <h2 className="text-xl font-bold">Ajouter un ticket</h2>

        <label className="block">
          Réclamation client non assignée:
          <select
            value={reclamationId || ''}
            onChange={(e) => setReclamationId(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          >
            <option value="" disabled>-- Sélectionner une réclamation --</option>
            {reclamationsClients.map(r => (
              <option key={r.id} value={r.id}>{r.title} (de {r.clientName})</option>
            ))}
          </select>
        </label>

        <label className="block">
          Titre:
          <input
            type="text"
            value={title}
            readOnly
            className="w-full border rounded p-2 mt-1 bg-gray-100"
          />
        </label>

        <label className="block">
          Assigné à:
          <input
            type="text"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            placeholder="Nom du personnel"
            className="w-full border rounded p-2 mt-1"
            required
          />
        </label>

        <label className="block">
          Priorité:
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option>Haute</option>
            <option>Moyenne</option>
            <option>Basse</option>
          </select>
        </label>

        <label className="block">
          Date de fin:
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </label>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Annuler</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ajouter</button>
        </div>
      </form>
    </div>
  );
};

export default AddTicketModal;
