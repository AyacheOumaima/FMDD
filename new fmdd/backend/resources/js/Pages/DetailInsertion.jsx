import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Importez la version configurée d'axios

const CandidatureForm = () => {
    // État initial du formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        formation: '',
        experience: '',
        lettre_motivation: '',
        cv: null
    });

    // État pour gérer les messages d'erreur et de succès
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Gestion des changements dans les champs de texte
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Gestion du changement de fichier CV
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setFormData(prevState => ({
                ...prevState,
                cv: file
            }));
            setError('');
        } else {
            setError('Veuillez sélectionner un fichier PDF valide');
            e.target.value = null;
        }
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Création d'un objet FormData pour l'envoi des fichiers
            const submitData = new FormData();
            
            // Ajout de tous les champs au FormData
            Object.keys(formData).forEach(key => {
                submitData.append(key, formData[key]);
            });

            // Envoi de la requête
            const response = await axios.post('/api/v1/candidatures', submitData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            });

            setSuccess('Votre candidature a été envoyée avec succès !');
            
            // Réinitialisation du formulaire
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                formation: '',
                experience: '',
                lettre_motivation: '',
                cv: null
            });

        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Une erreur est survenue lors de l\'envoi de votre candidature');
            } else {
                setError('Une erreur est survenue lors de l\'envoi de votre candidature');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Formulaire de Candidature</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Nom</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Prénom</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Téléphone</label>
                    <input
                        type="tel"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Formation</label>
                    <input
                        type="text"
                        name="formation"
                        value={formData.formation}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">Expérience</label>
                    <textarea
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                </div>

                <div>
                    <label className="block mb-1">Lettre de motivation</label>
                    <textarea
                        name="lettre_motivation"
                        value={formData.lettre_motivation}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                        rows="6"
                    />
                </div>

                <div>
                    <label className="block mb-1">CV (PDF uniquement, max 10MB)</label>
                    <input
                        type="file"
                        name="cv"
                        onChange={handleFileChange}
                        accept=".pdf"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                    }`}
                >
                    {loading ? 'Envoi en cours...' : 'Envoyer ma candidature'}
                </button>
            </form>
        </div>
    );
};

export default CandidatureForm; 