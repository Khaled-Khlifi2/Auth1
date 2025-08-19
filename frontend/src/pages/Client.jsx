import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ClientReclamations() {
  const navigate = useNavigate();
  const [reclamations, setReclamations] = useState([]);
  const [form, setForm] = useState({
    titre: "",
    nomClient: "",
    societe: "",
    date: "",
    priorite: "Moyenne",
    description: "",
  });

  const token = localStorage.getItem("token");

  // Charger les réclamations
  useEffect(() => {
    if (!token) return navigate("/login");

    fetch("http://localhost:3000/reclamations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setReclamations(data))
      .catch((err) => console.error(err));
  }, [navigate, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return navigate("/login");

    try {
      // Décoder le token pour récupérer l'ID du client
      const payload = JSON.parse(atob(token.split(".")[1]));
      const clientId = payload.userId; // Utiliser userId au lieu de id

      if (!clientId) {
        throw new Error("Client ID non trouvé dans le token. Veuillez vous reconnecter.");
      }

      const response = await fetch("http://localhost:3000/reclamations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...form, clientId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur serveur");
      }

      const newReclamation = await response.json();

      // Ajouter la nouvelle réclamation au state et rafraîchir la liste
      setReclamations((prevReclamations) => [...prevReclamations, newReclamation]);

      // Optionnel : Recharger toutes les réclamations pour garantir la cohérence
      fetch("http://localhost:3000/reclamations", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setReclamations(data))
        .catch((err) => console.error("Erreur lors du rafraîchissement:", err));

      // Réinitialiser le formulaire
      setForm({
        titre: "",
        nomClient: "",
        societe: "",
        date: "",
        priorite: "Moyenne",
        description: "",
      });
    } catch (err) {
      console.error("Erreur lors de l’ajout :", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* App Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-3 md:mb-0">
          Réclamations Client
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Logout
        </button>
      </header>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 mb-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Titre</label>
            <input
              type="text"
              name="titre"
              value={form.titre}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nom du client</label>
            <input
              type="text"
              name="nomClient"
              value={form.nomClient}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Société</label>
            <input
              type="text"
              name="societe"
              value={form.societe}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date début de problème</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Priorité</label>
            <select
              name="priorite"
              value={form.priorite}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="Haute">Haute</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              rows={4}
              placeholder="Décrivez votre réclamation..."
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-full font-semibold text-lg transition"
          >
            Ajouter Réclamation
          </button>
        </div>
      </form>

      {/* Tableau des réclamations */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border shadow rounded-2xl bg-white">
          <thead>
            <tr className="bg-indigo-100">
              <th className="border p-3 text-left">Titre</th>
              <th className="border p-3 text-left">Nom Client</th>
              <th className="border p-3 text-left">Société</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Priorité</th>
              <th className="border p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {reclamations.map((rec) => (
              <tr key={rec._id} className="text-center hover:bg-gray-50">
                <td className="border p-3">{rec.titre}</td>
                <td className="border p-3">{rec.nomClient}</td>
                <td className="border p-3">{rec.societe}</td>
                <td className="border p-3">
                  {new Date(rec.date).toLocaleDateString("fr-FR")}
                </td>
                <td className="border p-3">{rec.priorite}</td>
                <td className="border p-3">{rec.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}