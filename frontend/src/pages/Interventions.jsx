import React, { useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import InterventionTable from '../components/InterventionTable';
import AddInterventionModal from '../components/AddInterventionModal';

const Interventions = ({ interventions, onAddIntervention }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id) => alert(`Éditer intervention ${id}`);
  const handleDelete = (id) => {
    alert('Suppression désactivée ici (car data globale)');
  };

  return (
    <div className="p-4 space-y-4">
      <HeaderBar
        hideAddButton
        showAddInterventionButton
        onAddIntervention={() => setIsModalOpen(true)}
      />

      <InterventionTable
        interventions={interventions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <AddInterventionModal
          onClose={() => setIsModalOpen(false)}
          onSave={onAddIntervention}
        />
      )}
    </div>
  );
};

export default Interventions;
