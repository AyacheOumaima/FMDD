import { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import axios from 'axios';

export default function OffreEmploi() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    formation: '',
    experience: '',
    lettre_motivation: '',
    cv: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFormData((prev) => ({ ...prev, cv: file }));
      setError('');
    } else {
      setError('Veuillez sélectionner un fichier PDF ou DOCX valide');
      e.target.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const response = await axios.post('http://localhost:8000/api/v1/candidatures', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
      });

      if (response.status === 201) {
        setSubmitted(true);
        setShowForm(false);
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          formation: '',
          experience: '',
          lettre_motivation: '',
          cv: null,
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Une erreur est survenue lors de l'envoi de la candidature.");
      } else {
        setError("Erreur réseau ou serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-10">
      {/* 🔙 Lien de retour */}
      <div>
        <a
          href="#"
          onClick={() => window.history.back()}
          className="inline-block bg-[#00A99D] text-[#13335F] px-4 py-2 rounded-full text-sm"
        >
          ← Retour
        </a>
      </div>

      {/* 🖼️ Informations générales */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src="/logo-entreprise.png"
            alt="Logo entreprise"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h2 className="text-xl font-bold text-[#13335F]">Nom de l'entreprise</h2>
            <p className="text-[#13335F] text-lg">Intitulé du poste</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Briefcase color="#FFB347" />
            <span>CDI</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign color="#FFB347" />
            <span>3500 MAD</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin color="#FFB347" />
            <span>Casablanca</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock color="#FFB347" />
            <span>2 ans d'expérience</span>
          </div>
        </div>
      </div>

      {/* 📋 Description & Profil */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#13335F] mb-2">Description du poste</h3>
          <p>
            Nous recherchons un développeur passionné pour rejoindre notre équipe et contribuer à des projets innovants.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#13335F] mb-2">Profil recherché</h3>
          <p>
            Titulaire d'un Bac+3 minimum, vous justifiez d'une première expérience en développement web.
          </p>
        </div>
      </div>

      {/* 📩 Section de candidature */}
      <div className="text-center">
        <h4 className="text-[#00A99D] text-xl font-semibold mb-4">Ce poste vous intéresse ?</h4>

        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#FFB347] text-[#13335F] font-semibold px-6 py-2 rounded hover:opacity-90 transition"
          >
            Postuler
          </button>
        )}

        {/* Formulaire de candidature */}
        {showForm && !submitted && (
          <div className="min-h-screen bg-[#F4F9FF] flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-center text-[#13335F] mb-6">Candidature</h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                  {error}
                </div>
              )}

              {/* NOM */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="nom">
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* PRENOM */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="prenom">
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* TELEPHONE */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="telephone">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* FORMATION */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="formation">
                  Formation/Diplôme
                </label>
                <input
                  type="text"
                  id="formation"
                  name="formation"
                  value={formData.formation}
                  onChange={handleInputChange}
                  placeholder="Ex. : Licence"
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* EXPÉRIENCE */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="experience">
                  Expérience Professionnelle
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={3}
                  required
                  className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                ></textarea>
              </div>

              {/* LETTRE DE MOTIVATION */}
              <div className="mb-4">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="lettre_motivation">
                  Lettre de motivation
                </label>
                <textarea
                  id="lettre_motivation"
                  name="lettre_motivation"
                  value={formData.lettre_motivation}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full p-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                ></textarea>
              </div>

              {/* CV */}
              <div className="mb-6">
                <label className="block text-[#13335F] font-medium text-lg mb-1" htmlFor="cv">
                  CV (PDF ou DOCX)
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf,.docx"
                  required
                  className="w-full p-2 border border-gray-300 rounded bg-white file:bg-[#FFB347] file:text-white file:rounded file:px-4 file:py-1 file:border-0 focus:outline-none focus:border-[#FFB347] hover:border-[#FFB347]"
                />
              </div>

              {/* BOUTON ENVOYER */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#FFB347] text-white font-semibold px-6 py-2 rounded hover:bg-[#e0a033] transition w-full ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
              </button>
            </form>
          </div>
        )}

        {/* Message succès */}
        {submitted && (
          <div className="mt-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded">
            ✅ Votre candidature a été envoyée avec succès !
          </div>
        )}
      </div>
    </div>
  );
}