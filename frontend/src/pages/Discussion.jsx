import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaExclamationCircle } from 'react-icons/fa'; // Icônes de react-icons (installation requise)

const Discussion = () => {
  const [reclamations, setReclamations] = useState([]);
  const [selectedReclamation, setSelectedReclamation] = useState(null);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Pour forcer un rechargement

  // Charger les réclamations depuis le backend
  useEffect(() => {
    if (!token) return;

    fetch('http://localhost:3000/reclamations', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReclamations(data))
      .catch((err) => console.error('Erreur lors du chargement des réclamations:', err));
  }, [token, refreshTrigger]); // Dépendance à refreshTrigger

  const statusColors = {
    'Haute': 'bg-red-100 text-red-800 border-red-300',
    'Moyenne': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Basse': 'bg-green-100 text-green-800 border-green-300',
  };

  const handleOpenDiscussion = (reclamation) => {
    setSelectedReclamation(reclamation);
  };

  const handleCloseDiscussion = () => {
    setSelectedReclamation(null);
    setMessage('');
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log('Message envoyé pour', selectedReclamation.nomClient, ':', message);
    //alert(`Message envoyé à ${selectedReclamation.nomClient} : ${message}`);
    setMessage('');
  };

  // Fonction pour déclencher un rechargement (à appeler depuis ClientReclamations)
  const refreshDiscussions = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-800">Discussion avec les clients</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reclamations.map((reclamation) => (
          <div
            key={reclamation._id}
            className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col justify-between transform hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-blue-900">{reclamation.nomClient}</h2>
                <FaEnvelope className="text-blue-500" />
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {reclamation.description || 'Aucune description'}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[reclamation.priorite] || 'bg-gray-100 text-gray-800 border-gray-300'}`}
                >
                  {reclamation.priorite || 'Non définie'}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(reclamation.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => handleOpenDiscussion(reclamation)}
                className="w-full text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <FaExclamationCircle className="mr-2" /> Ouvrir la discussion
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedReclamation && (
        <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-600">
              Détails de la réclamation - {selectedReclamation.nomClient}
            </h2>
            <button
              onClick={handleCloseDiscussion}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-semibold transition"
            >
              Fermer
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600"><strong>Titre :</strong> {selectedReclamation.titre}</p>
              <p className="text-sm text-gray-600"><strong>Client :</strong> {selectedReclamation.nomClient}</p>
              <p className="text-sm text-gray-600"><strong>Société :</strong> {selectedReclamation.societe}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600"><strong>Date :</strong> {new Date(selectedReclamation.date).toLocaleDateString('fr-FR')}</p>
              <p className="text-sm text-gray-600"><strong>Priorité :</strong> {selectedReclamation.priorite}</p>
              <p className="text-sm text-gray-600"><strong>Créé le :</strong> {new Date(selectedReclamation.createdAt).toLocaleString('fr-FR')}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4"><strong>Description :</strong> {selectedReclamation.description}</p>

          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Envoyer un message</h3>
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tapez votre message ici..."
                className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                rows={4}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;