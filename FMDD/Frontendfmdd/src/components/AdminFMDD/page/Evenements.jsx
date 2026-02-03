import React, { useState, useEffect } from 'react';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    titre: '',
    date: '',
    ville: '',
    description: '',
    image: '',
    categorie: 'Conférence',
    prix: 0,
    description_detaillee: '',
    programme: '',
  });
  const [intervenants, setIntervenants] = useState([]);
  const [newIntervenant, setNewIntervenant] = useState({
    nom: '',
    prenom: '',
    fonction: '',
    email: '',
    telephone: '',
    biographie: '',
    photo: '',
  });

  // Format date function without date-fns
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Load sample data on first render
  useEffect(() => {
    const sampleEvent = {
      id: 1,
      titre: "Forum Développement Durable",
      date: "2025-06-15",
      ville: "Paris",
      description: "Un forum sur les innovations en développement durable",
      image: "https://via.placeholder.com/100",
      categorie: "Conférence",
      prix: 0,
      description_detaillee: "Ce forum rassemble experts et acteurs du développement durable pour discuter des dernières innovations et pratiques.",
      programme: "09:00 - Accueil\n10:00 - Conférences\n12:00 - Déjeuner\n14:00 - Ateliers\n17:00 - Networking",
      intervenants: [
        { id: 1, nom: "Dupont", prenom: "Marie", fonction: "Directrice RSE", email: "marie@example.com", telephone: "0123456789", biographie: "Experte en développement durable", photo: "https://via.placeholder.com/50" },
        { id: 2, nom: "Martin", prenom: "Jean", fonction: "Consultant", email: "jean@example.com", telephone: "0123456788", biographie: "Consultant spécialisé en transition écologique", photo: "https://via.placeholder.com/50" }
      ],
      participants: [
        { id: 1, nom: "Dubois", prenom: "Sophie", email: "sophie@example.com", statut: "Confirmé" },
        { id: 2, nom: "Lefebvre", prenom: "Thomas", email: "thomas@example.com", statut: "En attente" }
      ]
    };
    setEvents([sampleEvent]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIntervenantChange = (e) => {
    const { name, value } = e.target;
    setNewIntervenant({
      ...newIntervenant,
      [name]: value
    });
  };

  const addIntervenant = () => {
    if (newIntervenant.nom && newIntervenant.prenom) {
      setIntervenants([...intervenants, {
        ...newIntervenant,
        id: intervenants.length + 1
      }]);
      setNewIntervenant({
        nom: '',
        prenom: '',
        fonction: '',
        email: '',
        telephone: '',
        biographie: '',
        photo: '',
      });
    }
  };

  const removeIntervenant = (id) => {
    setIntervenants(intervenants.filter(inter => inter.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      id: events.length + 1,
      intervenants: [...intervenants],
      participants: []
    };
    setEvents([...events, newEvent]);
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setFormData({
      titre: '',
      date: '',
      ville: '',
      description: '',
      image: '',
      categorie: 'Conférence',
      prix: 0,
      description_detaillee: '',
      programme: '',
    });
    setIntervenants([]);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(null);
    }
  };

  const viewParticipants = (event) => {
    setSelectedEvent(event);
    setParticipants(event.participants || []);
    setShowParticipants(true);
  };

  const closeParticipantsModal = () => {
    setShowParticipants(false);
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion des Événements</h1>
        
        {/* Add Event Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mb-8 transition duration-200"
        >
          Ajouter un Événement
        </button>
        
        {/* Event Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Ajouter un nouvel événement</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Titre</label>
                    <input
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Ville</label>
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Catégorie</label>
                    <select
                      name="categorie"
                      value={formData.categorie}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="Conférence">Conférence</option>
                      <option value="Atelier">Atelier</option>
                      <option value="Formation">Formation</option>
                      <option value="Séminaire">Séminaire</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Prix (€)</label>
                    <input
                      type="number"
                      name="prix"
                      value={formData.prix}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Image URL</label>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Description courte</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="2"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Description détaillée</label>
                  <textarea
                    name="description_detaillee"
                    value={formData.description_detaillee}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Programme (une ligne par activité)</label>
                  <textarea
                    name="programme"
                    value={formData.programme}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                  />
                </div>
                
                {/* Intervenants Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Intervenants</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Nom</label>
                      <input
                        type="text"
                        name="nom"
                        value={newIntervenant.nom}
                        onChange={handleIntervenantChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Prénom</label>
                      <input
                        type="text"
                        name="prenom"
                        value={newIntervenant.prenom}
                        onChange={handleIntervenantChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Fonction</label>
                      <input
                        type="text"
                        name="fonction"
                        value={newIntervenant.fonction}
                        onChange={handleIntervenantChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={newIntervenant.email}
                        onChange={handleIntervenantChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="text"
                        name="telephone"
                        value={newIntervenant.telephone}
                        onChange={handleIntervenantChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Photo URL</label>
                      <input
                        type="text"
                        name="photo"
                        value={newIntervenant.photo}
                        onChange={handleIntervenantChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Biographie</label>
                    <textarea
                      name="biographie"
                      value={newIntervenant.biographie}
                      onChange={handleIntervenantChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows="2"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={addIntervenant}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
                  >
                    Ajouter Intervenant
                  </button>
                  
                  {intervenants.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Intervenants ajoutés:</h4>
                      <ul className="space-y-2">
                        {intervenants.map(inter => (
                          <li key={inter.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                            <span>{inter.prenom} {inter.nom} ({inter.fonction})</span>
                            <button
                              type="button"
                              onClick={() => removeIntervenant(inter.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
              {event.image && (
                <img 
                  src={event.image} 
                  alt={event.titre} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{event.titre}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {event.categorie}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{formatDate(event.date)} - {event.ville}</p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => viewParticipants(event)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Voir participants ({event.participants?.length || 0})
                  </button>
                  
                  <div className="space-x-2">
                    <button className="text-yellow-600 hover:text-yellow-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Participants Modal */}
        {showParticipants && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Participants: {selectedEvent.titre}
                </h2>
                <button
                  onClick={closeParticipantsModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Total: {participants.length}
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Confirmés: {participants.filter(p => p.statut === 'Confirmé').length}
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    En attente: {participants.filter(p => p.statut === 'En attente').length}
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prénom
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {participants.length > 0 ? (
                      participants.map(participant => (
                        <tr key={participant.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {participant.nom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.prenom}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {participant.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${participant.statut === 'Confirmé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {participant.statut}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Modifier</button>
                            <button className="text-red-600 hover:text-red-900">Supprimer</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          Aucun participant inscrit pour cet événement.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeParticipantsModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;