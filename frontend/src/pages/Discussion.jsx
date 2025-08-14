// pages/Discussion.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const clients = [
  {
    id: 1,
    name: 'Khaled Khlifi',
    lastMessage: 'Je rencontre un problème avec le système...',
    status: 'En attente',
  },
  {
    id: 2,
    name: 'Ahmed ',
    lastMessage: 'Merci pour la réponse rapide.',
    status: 'Répondu',
  },
  {
    id: 3,
    name: 'Yassine',
    lastMessage: 'Quand est-ce que la mise à jour sera disponible ?',
    status: 'En attente',
  },
];

const statusColors = {
  'En attente': 'bg-yellow-100 text-yellow-800',
  'Répondu': 'bg-green-100 text-green-800',
};

const Discussion = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Discussion avec les clients</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white border rounded-xl shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-lg font-semibold text-blue-900 mb-1">{client.name}</h2>
              <p className="text-sm text-gray-600 mb-2 truncate">
                {client.lastMessage}
              </p>
              <span
                className={`px-2 py-1 text-xs rounded font-medium ${statusColors[client.status]}`}
              >
                {client.status}
              </span>
            </div>

            <div className="mt-4">
              <Link to={`/discussion/${client.id}`}>
                <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Ouvrir la discussion
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussion;
