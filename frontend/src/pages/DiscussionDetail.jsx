import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const fakeClientTickets = {
  1: {
    name: 'Khaled Khlifi',
    ticket: {
      title: 'Problème de connexion',
      message: 'Je n’arrive pas à me connecter à mon compte.',
      date: '2025-08-01',
      status: 'En attente',
    },
  },
  2: {
    name: 'Ahmed ',
    ticket: {
      title: 'Suggestion d’amélioration',
      message: 'Je propose une fonctionnalité pour la recherche.',
      date: '2025-07-28',
      status: 'Répondu',
    },
  },
};

const DiscussionDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const client = fakeClientTickets[clientId];

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  if (!client) {
    return <p className="text-red-600">Client non trouvé.</p>;
  }

  const handleSend = () => {
    if (newMessage.trim() === '') return;

    const newEntry = {
      from: 'you',
      text: newMessage,
      date: new Date().toLocaleString(),
    };

    setMessages((prev) => [...prev, newEntry]);
    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline text-sm"
      >
        ← Retour
      </button>

      <h1 className="text-2xl font-bold text-gray-800">
        Discussion avec {client.name}
      </h1>

      {/* Ticket Info */}
      <div className="bg-white p-6 rounded shadow border space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">{client.ticket.title}</h2>
        <p className="text-sm text-gray-600">{client.ticket.message}</p>
        <div className="text-sm text-gray-500">
          <p><strong>Date:</strong> {client.ticket.date}</p>
          <p>
            <strong>Statut:</strong>{' '}
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
              {client.ticket.status}
            </span>
          </p>
        </div>
      </div>

      {/* Message Thread: only show if there are messages */}
      {messages.length > 0 && (
        <div className="bg-white p-4 rounded shadow border space-y-2 max-h-[300px] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.from === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-xs text-sm ${
                  msg.from === 'you'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs mt-1 text-gray-400">{msg.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply Input */}
      <div className="flex items-center space-x-2">
        <textarea
          className="flex-grow border p-2 rounded resize-none text-sm"
          rows="2"
          placeholder="Écrire une réponse..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
};

export default DiscussionDetail;
