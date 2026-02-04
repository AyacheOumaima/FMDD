import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FormationForm = ({ formation = null }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = formation !== null;
  const [formData, setFormData] = useState(formation || {
    titre: '',
    type: '',
    date: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire:', formData);
    navigate('/admin/formations');
  };

  return (
    <BaseForm
      onSubmit={handleSubmit}
      onCancel={() => navigate('/admin/formations')}
      title={isEditing ? 'Modifier une formation' : 'Nouvelle formation'}
      initialValues={initialValues}
    >
      {({ formData, handleChange }) => (
        <div className="space-y-6">
          <div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">Sélectionner un type</option>
              <option value="débutant">Débutant</option>
              <option value="intermédiaire">Intermédiaire</option>
              <option value="avancé">Avancé</option>
            </select>
          </div>

          <div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Avantages */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avantages
            </label>
            <textarea
              name="avantage"
              value={formData.avantage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows="4"
              placeholder="Liste des avantages séparés par des retours à la ligne"
            />
          </div>

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
    </BaseForm>
  );
};

export default FormationForm;
