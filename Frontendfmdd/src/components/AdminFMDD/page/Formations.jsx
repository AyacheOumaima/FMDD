import React, { useState } from 'react';

const initialForm = {
  titre: '',
  instructeur: '',
  date: '',
  prix: '',
  image: '',
  categorie: '',
  level: '',
  certifie: false,
  duree: '',
  texte: '',
  programme: '',
  avantage: '',
  grand_titre: '',
  grande_description: '',
  nbr_inscrits: 0,
  rating: 0,
  date_creation: '',
  date_mise_a_jour: '',
  is_a_la_une: false,
};

const mockFormations = [
  {
    id: 1,
    titre: 'Développement Durable',
    instructeur: 'Dr. Martin',
    date: '2025-06-01',
    prix: 120,
    image: '',
    categorie: 'Environnement',
    level: 'Débutant',
    certifie: true,
    duree: '3 jours',
    texte: 'Introduction au développement durable.',
    programme: 'Jour 1: Bases\nJour 2: Pratique\nJour 3: Projet',
    avantage: 'Certification officielle',
    grand_titre: 'Formation phare',
    grande_description: 'Une formation complète pour comprendre les enjeux du développement durable.',
    nbr_inscrits: 25,
    rating: 4.7,
    date_creation: '2025-04-01',
    date_mise_a_jour: '2025-05-01',
    is_a_la_une: true,
  },
];

const Formations = () => {
  const [formations, setFormations] = useState(mockFormations);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleAdd = () => {
    setForm(initialForm);
    setEditId(null);
    setShowForm(true);
  };

  const handleEdit = (formation) => {
    setForm(formation);
    setEditId(formation.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setFormations(formations.filter(f => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setFormations(formations.map(f => (f.id === editId ? { ...form, id: editId } : f)));
    } else {
      setFormations([...formations, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
    setForm(initialForm);
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-fmdd-bg p-6">
      <h1 className="text-3xl font-bold text-fmdd-secondary mb-8">Gestion des Formations</h1>
      <button
        onClick={handleAdd}
        className="bg-fmdd-primary hover:bg-fmdd-secondary text-white font-bold py-2 px-4 rounded mb-6"
      >
        Ajouter une formation
      </button>

      {/* Liste des formations */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-fmdd-primary text-white">
              <th className="px-4 py-2">Titre</th>
              <th className="px-4 py-2">Instructeur</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Prix (€)</th>
              <th className="px-4 py-2">Catégorie</th>
              <th className="px-4 py-2">À la une</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formations.map(f => (
              <tr key={f.id} className="border-b hover:bg-fmdd-bg/50">
                <td className="px-4 py-2 font-semibold">{f.titre}</td>
                <td className="px-4 py-2">{f.instructeur}</td>
                <td className="px-4 py-2">{f.date}</td>
                <td className="px-4 py-2">{f.prix}</td>
                <td className="px-4 py-2">{f.categorie}</td>
                <td className="px-4 py-2">
                  {f.is_a_la_une ? (
                    <span className="bg-fmdd-accent text-white px-2 py-1 rounded text-xs">Oui</span>
                  ) : (
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">Non</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(f)}
                    className="bg-fmdd-secondary hover:bg-fmdd-primary text-white px-3 py-1 rounded"
                  >Modifier</button>
                  <button
                    onClick={() => handleDelete(f.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >Supprimer</button>
                </td>
              </tr>
            ))}
            {formations.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">Aucune formation enregistrée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modale/Formulaire d'ajout/édition */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4 text-fmdd-secondary">
              {editId ? 'Modifier la formation' : 'Ajouter une formation'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Titre *</label>
                  <input type="text" name="titre" value={form.titre} onChange={handleChange} required className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Instructeur *</label>
                  <input type="text" name="instructeur" value={form.instructeur} onChange={handleChange} required className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Date *</label>
                  <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Prix (€)</label>
                  <input type="number" name="prix" value={form.prix} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Image (URL)</label>
                  <input type="text" name="image" value={form.image} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Catégorie</label>
                  <input type="text" name="categorie" value={form.categorie} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Niveau</label>
                  <input type="text" name="level" value={form.level} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Certifiée</label>
                  <input type="checkbox" name="certifie" checked={form.certifie} onChange={handleChange} className="ml-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Durée</label>
                  <input type="text" name="duree" value={form.duree} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Nombre d'inscrits</label>
                  <input type="number" name="nbr_inscrits" value={form.nbr_inscrits} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Note (rating)</label>
                  <input type="number" step="0.1" name="rating" value={form.rating} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Date création</label>
                  <input type="date" name="date_creation" value={form.date_creation} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Date mise à jour</label>
                  <input type="date" name="date_mise_a_jour" value={form.date_mise_a_jour} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-medium mb-1">À la une</label>
                  <input type="checkbox" name="is_a_la_une" checked={form.is_a_la_une} onChange={handleChange} className="ml-2" />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Grand titre</label>
                <input type="text" name="grand_titre" value={form.grand_titre} onChange={handleChange} className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block font-medium mb-1">Grande description</label>
                <textarea name="grande_description" value={form.grande_description} onChange={handleChange} className="w-full border rounded p-2" rows={2} />
              </div>
              <div>
                <label className="block font-medium mb-1">Texte</label>
                <textarea name="texte" value={form.texte} onChange={handleChange} className="w-full border rounded p-2" rows={2} />
              </div>
              <div>
                <label className="block font-medium mb-1">Programme</label>
                <textarea name="programme" value={form.programme} onChange={handleChange} className="w-full border rounded p-2" rows={2} />
              </div>
              <div>
                <label className="block font-medium mb-1">Avantage</label>
                <textarea name="avantage" value={form.avantage} onChange={handleChange} className="w-full border rounded p-2" rows={2} />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditId(null); }}
                  className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >Annuler</button>
                <button
                  type="submit"
                  className="bg-fmdd-secondary hover:bg-fmdd-primary text-white px-4 py-2 rounded font-bold"
                >{editId ? 'Enregistrer' : 'Ajouter'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formations;