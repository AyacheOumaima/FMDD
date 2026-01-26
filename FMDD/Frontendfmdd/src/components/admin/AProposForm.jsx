import React from 'react';
import AdminForm from './AdminForm';
import { useNavigate, useLocation } from 'react-router-dom';

const AProposForm = ({ section, type = 'equipe' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = section !== null;
  const initialValues = section || {
    nom: '',
    prenom: '',
    role: '',
    email: '',
    linkedin: '',
    description: '',
    image: '',
    annee: '',
    titre: '',
    service: '',
    modalite: '',
    profil: '',
    is_a_la_une: false
  };

  const handleSubmit = async (formData) => {
    const url = isEditing 
      ? `/admin/apropos/${type}/${section.id}` 
      : `/admin/apropos/${type}`;
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      await axios[method.toLowerCase()](url, formData);
      navigate('/admin/apropos');
    } catch (error) {
      throw error;
    }
  };

  return (
    <AdminForm 
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/apropos')}
      title={isEditing ? `Modifier ${type}` : `Nouveau ${type}`}
      initialValues={initialValues}
    >
      {({ handleChange, formData }) => (
        <div>
          {type === 'equipe' && (
            <>
              {/* Informations personnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Rôle et contact */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rôle
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://www.linkedin.com/in/..."
                />
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="4"
                />
              </div>

              {/* Photo */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleChange(e)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {type === 'objectifs' && (
            <>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  name="titre"
                  value={formData.titre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="4"
                />
              </div>
            </>
          )}

          {type === 'services' && (
            <>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profil
                </label>
                <input
                  type="text"
                  name="profil"
                  value={formData.profil}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modalité
                </label>
                <input
                  type="text"
                  name="modalite"
                  value={formData.modalite}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {type === 'histoire' && (
            <>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Année
                </label>
                <input
                  type="number"
                  name="annee"
                  value={formData.annee}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="4"
                />
              </div>
            </>
          )}

          {/* Options */}
          <div className="mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_a_la_une"
                checked={formData.is_a_la_une}
                onChange={handleChange}
                className="mr-2"
              />
              <span>À la une</span>
            </div>
          </div>
        </div>
      )}
    </AdminForm>
  );
};

export default AProposForm;
