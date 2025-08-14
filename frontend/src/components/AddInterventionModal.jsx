import React, { useState } from 'react';

const AddInterventionModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    titre: '',
    statut: 'Planifiée',
    priorité: 'Moyenne',
    client: '',
    fin: '',
    réponse: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dateDebut = new Date().toISOString().slice(0, 10);
    onSave({ ...formData, début: dateDebut });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
        <h2 className="text-lg font-semibold mb-4">Ajouter une intervention</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
            placeholder="Titre"
            className="input"
          />
          <input
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
            placeholder="Client"
            className="input"
          />
          <input
            name="fin"
            value={formData.fin}
            onChange={handleChange}
            type="date"
            required
            className="input"
          />
          <input
            name="réponse"
            value={formData.réponse}
            onChange={handleChange}
            placeholder="Réponse"
            className="input"
          />

          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="input"
          >
            <option>Planifiée</option>
            <option>En cours</option>
            <option>Terminée</option>
          </select>

          <select
            name="priorité"
            value={formData.priorité}
            onChange={handleChange}
            className="input"
          >
            <option>Haute</option>
            <option>Moyenne</option>
            <option>Basse</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 text-gray-600 hover:underline"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInterventionModal;
