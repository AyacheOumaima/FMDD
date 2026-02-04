import React, { useState, useEffect } from 'react';
import { Users, Compass, BookOpen, Leaf, Hammer, UserCheck, DollarSign } from 'lucide-react';

import TeamMember from '../components/commun/TeamMember'; // Ensure this path is correct
import LoadingSpinner from '../components/commun/LoadingSpinner'; // Ensure this path is correct
import { API_BASE_URL, API_URL } from '../config/api.config';
import axios from 'axios';

// Configuration de l'instance API pour les appels non-API (CSRF)
const apiBase = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Configuration de l'instance API pour les appels API v1
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Intercepteur pour les requêtes (envoie le token CSRF s'il est en localStorage)
// Note: Si Laravel Sanctum gère le token via un cookie XSRF-TOKEN,
// cette partie peut être superflue car Axios envoie les cookies automatiquement.
// Conservez-le si vous avez une gestion manuelle du token via localStorage.
api.interceptors.request.use(
    config => {
        const storedToken = localStorage.getItem('csrfToken');
        if (storedToken) {
            config.headers['X-XSRF-TOKEN'] = storedToken;
        }
        return config;
    },
    error => {
        console.error('Erreur dans l\'intercepteur de requête:', error);
        return Promise.reject(error);
    }
);

// Intercepteur pour les réponses (gestion des erreurs globales et potentiellement stockage du CSRF token)
api.interceptors.response.use(
    response => {
        // Optionnel: Si le backend renvoie le CSRF token dans une en-tête après /sanctum/csrf-cookie
        // et que vous voulez le stocker manuellement.
        // C'est souvent inutile avec Sanctum si le token est mis dans un cookie HTTPOnly.
        const csrfToken = response.headers['x-csrf-token']; // Vérifiez l'en-tête exacte de votre backend
        if (csrfToken) {
            localStorage.setItem('csrfToken', csrfToken);
        }
        return response;
    },
    error => {
        console.error('Erreur API:', error);
        // Vous pouvez ajouter une logique de déconnexion ici si c'est une erreur 401/403
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Gérer la redirection ou l'affichage d'un message pour l'utilisateur
            console.warn('Authentification expirée ou non autorisée.');
        }
        return Promise.reject(error);
    }
);

const AProposPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [infosGenerales, setInfosGenerales] = useState(null);
    const [equipe, setEquipe] = useState([]);
    const [objectifs, setObjectifs] = useState([]);
    const [histoire, setHistoire] = useState([]);
    const [servicesProfils, setServicesProfils] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Récupérer le token CSRF. Laravel Sanctum met souvent le token dans un cookie XSRF-TOKEN,
                // que Axios gère automatiquement avec `withCredentials: true`.
                // Cette requête est nécessaire pour que le cookie soit initialisé.
                await apiBase.get(`${API_BASE_URL}/sanctum/csrf-cookie`);

                // Exécuter tous les appels API en parallèle pour de meilleures performances
                const [infosRes, equipeRes, objectifsRes, histoireRes, servicesProfilsRes] = await Promise.all([
                    api.get(`${API_URL}/apropos/infos`),
                    api.get(`${API_URL}/apropos/equipe`),
                    api.get(`${API_URL}/apropos/objectifs`),
                    api.get(`${API_URL}/apropos/histoire`),
                    api.get(`${API_URL}/apropos/services-profils`)
                ]);

                // Vérifier le contenu des réponses
                console.log('Contenu des réponses:', {
                    infos: infosRes.data,
                    equipe: equipeRes.data,
                    objectifs: objectifsRes.data,
                    histoire: histoireRes.data,
                    servicesProfils: servicesProfilsRes.data
                });

                // Vérifier la structure exacte des données
                console.log('Structure exacte des données:', {
                    infos: typeof infosRes.data,
                    equipe: Array.isArray(equipeRes.data) ? equipeRes.data.length : 'Pas un tableau',
                    objectifs: Array.isArray(objectifsRes.data) ? objectifsRes.data.length : 'Pas un tableau',
                    histoire: Array.isArray(histoireRes.data) ? histoireRes.data.length : 'Pas un tableau',
                    servicesProfils: Array.isArray(servicesProfilsRes.data) ? servicesProfilsRes.data.length : 'Pas un tableau'
                });

                // Vérifier les premières données de chaque tableau
                console.log('Premières données:', {
                    equipe: equipeRes.data?.[0],
                    objectifs: objectifsRes.data?.[0],
                    histoire: histoireRes.data?.[0],
                    servicesProfils: servicesProfilsRes.data?.[0]
                });

                // Mettre à jour les états avec les données récupérées
                const data = {
                    infos: infosRes.data,
                    equipe: equipeRes.data,
                    objectifs: objectifsRes.data,
                    histoire: histoireRes.data,
                    servicesProfils: servicesProfilsRes.data
                };

                // Vérifier la structure des données
                console.log('Structure des données:', {
                    infos: typeof data.infos,
                    equipe: Array.isArray(data.equipe),
                    objectifs: Array.isArray(data.objectifs),
                    histoire: Array.isArray(data.histoire),
                    servicesProfils: Array.isArray(data.servicesProfils)
                });

                // Mise à jour des états avec des vérifications plus robustes
                setInfosGenerales(data.infos || {});
                setEquipe(data.equipe || []);
                setObjectifs(data.objectifs || []);
                setHistoire(data.histoire || []);
                setServicesProfils(data.servicesProfils || []);

                // Vérifier que les états sont mis à jour
                console.log('États après mise à jour:', {
                    infosGenerales,
                    equipe,
                    objectifs,
                    histoire,
                    servicesProfils
                });

                // Logs détaillés pour déboguer
                console.log('Réponses API:', {
                    infos: data.infos,
                    equipe: data.equipe,
                    objectifs: data.objectifs,
                    histoire: data.histoire,
                    servicesProfils: data.servicesProfils
                });

                // Logs des états avant mise à jour
                console.log('États avant mise à jour:', {
                    infosGenerales,
                    equipe,
                    objectifs,
                    histoire,
                    servicesProfils
                });

                // Mise à jour des états avec des vérifications
                setInfosGenerales(data.infos || {});
                setEquipe(Array.isArray(data.equipe) ? data.equipe : []);
                setObjectifs(Array.isArray(data.objectifs) ? data.objectifs : []);
                setHistoire(Array.isArray(data.histoire) ? data.histoire : []);
                setServicesProfils(Array.isArray(data.servicesProfils) ? data.servicesProfils : []);

                setLoading(false); // Le chargement est terminé
            } catch (err) {
                setError('Une erreur est survenue lors du chargement des données.');
                setLoading(false);
                console.error('Erreur de chargement:', err);
            }
        };

        fetchData();
    }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois au montage

    // Afficher le spinner de chargement si les données sont en cours de récupération
    if (loading) {
        return <LoadingSpinner />;
    }

    // Afficher un message d'erreur si une erreur s'est produite
    if (error) {
        return <div className="text-red-500 text-center p-4">{error}</div>;
    }

    // Mapper les noms d'icônes du backend aux composants Lucide React avec leurs couleurs
    const iconMap = {
        'users': { component: Users, color: 'text-blue-600' },
        'compass': { component: Compass, color: 'text-purple-600' },
        'book-open': { component: BookOpen, color: 'text-green-600' },
        'leaf': { component: Leaf, color: 'text-emerald-600' },
        'hammer': { component: Hammer, color: 'text-orange-600' },
        'user-check': { component: UserCheck, color: 'text-pink-600' },
        'dollar-sign': { component: DollarSign, color: 'text-yellow-600' },
        // Ajouter d'autres icônes ici au besoin
    };

    // Fonction pour obtenir l'icône appropriée
    const getIcon = (iconName) => {
        // Convertir le nom de l'icône en minuscules et remplacer les espaces par des tirets
        const normalizedIcon = iconName?.toLowerCase().replace(/\s+/g, '-');
        // Retourner l'icône correspondante ou Users par défaut
        return iconMap[normalizedIcon] || { component: Users, color: 'text-gray-600' };
    };

    return (
        <div className="min-h-screen py-12 bg-blue-light">
            <div className="container mx-auto px-4">
                {/* Header */}
                <h1 className="text-4xl font-semibold font-poppins text-blue-950 mb-8">
                    {infosGenerales?.titre || "À Propos"}
                </h1>

                {/* Mot du Président */}
                {infosGenerales && (
                    <section className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-12 flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
                            <img
                                src={
                                    // Chercher le président dans l'équipe
                                    equipe?.find(member => member.poste === 'Président')?.photo 
                                    || "https://via.placeholder.com/200"
                                }
                                alt={infosGenerales.titre || "Image du président"}
                                className="rounded-full w-48 h-48 object-cover shadow-md"
                            />
                        </div>
                        <div className="w-full md:w-2/3 md:pl-6 text-center md:text-left">
                            <h2 className="text-2xl font-semibold text-blue-950 mb-4">Mot du Président</h2>
                            <p className="text-gray-700 mb-6">
                                {infosGenerales.description || "Message du président à venir..."}
                            </p>
                            <p className="text-gray-700 font-medium">
                                - {Array.isArray(equipe) ? equipe.find(member => member.poste === 'Président')?.nom : "Nom du Président"}, Président du FMDD
                            </p>
                        </div>
                    </section>
                )}

                {/* Mission & Vision */}
                {infosGenerales && (
                    <section className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-12">
                        <h2 className="text-2xl font-semibold text-blue-950 mb-4">Notre Mission</h2>
                        <p className="text-gray-700 mb-6">{infosGenerales.mission || "Mission du FMDD à venir..."}</p>
                        <h2 className="text-2xl font-semibold text-blue-950 mb-4">Notre Vision</h2>
                        <p className="text-gray-700">{infosGenerales.vision || "Vision du FMDD à venir..."}</p>
                    </section>
                )}

                {/* Objectifs */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-950 mb-6">Nos Objectifs</h2>
                    {Array.isArray(objectifs) && objectifs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {objectifs.map((objectif, index) => {
                                const iconData = getIcon(objectif.icone);
                                return (
                                    <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md text-center">
                                        <iconData.component className={`mx-auto ${iconData.color} mb-4`} size={40} />
                                        <h3 className="text-lg font-medium mb-2">{objectif.titre}</h3>
                                        <p className="text-gray-600">{objectif.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">Aucun objectif à afficher pour le moment.</p>
                    )}
                </section>

                {/* Services par Profil */}
                <section className="bg-white border border-gray-200 p-6 rounded-lg shadow mb-12">
                    <h2 className="text-2xl font-semibold text-blue-950 mb-6">Nos Services par Profil</h2>
                    {servicesProfils.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-blue-950 text-white">
                                    <tr>
                                        <th className="p-4">Profil</th>
                                        <th className="p-4">Services offerts</th>
                                        <th className="p-4">Modalités d'accès</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {servicesProfils.map((service, index) => (
                                        <tr key={index}>
                                            <td className="p-4 font-medium">{service.profil}</td>
                                            <td className="p-4">
                                                <ul className="list-disc list-inside text-gray-700">
                                                    {/* Vérifier si services_offerts est un tableau, sinon le traiter comme une chaîne ou un élément unique */}
                                                    {Array.isArray(service.services_offerts) ? (
                                                        service.services_offerts.map((item, idx) => (
                                                            <li key={idx}>{item}</li>
                                                        ))
                                                    ) : (
                                                        <li>{service.services_offerts}</li> // Fallback si ce n'est pas un tableau
                                                    )}
                                                </ul>
                                            </td>
                                            <td className="p-4 text-gray-700">{service.modalites_acces}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">Aucun service par profil à afficher pour le moment.</p>
                    )}
                </section>

                {/* Équipe - CORRIGÉ */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-blue-950 mb-6">Notre Équipe</h2>
                    {Array.isArray(equipe) && equipe.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {equipe.map((member, idx) => (
                                <TeamMember
                                    key={idx}
                                    name={`${member.prenom} ${member.nom}`}
                                    role={member.poste}
                                    image={member.photo || "https://via.placeholder.com/200"}
                                    linkedin={member.reseaux_sociaux?.linkedin} // Accès sécurisé
                                    email={member.email}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">Aucun membre d'équipe à afficher pour le moment.</p>
                    )}
                </section>

                {/* Histoire */}
                <section className="bg-white border border-gray-200 p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-blue-950 mb-6">Notre Histoire</h2>
                    {histoire.length > 0 ? (
                        <div className="relative">
                            <div className="absolute h-full w-0.5 bg-blue-950 left-4"></div>
                            <div className="space-y-8">
                                {histoire.map((item, index) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-400 border-4 border-blue-950 mt-1 mr-4"></div>
                                        <div>
                                            <h3 className="text-xl font-medium text-blue-950">{new Date(item.date_evenement).toLocaleDateString('fr-FR', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}</h3>
                                            <p className="text-gray-700">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center">Aucune histoire à afficher pour le moment.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AProposPage;