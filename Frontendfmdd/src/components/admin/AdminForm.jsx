import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../axios'; // ✅ Correct Import

const AdminForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [previewImage, setPreviewImage] = useState(null);

  // 1. Initial Values for Team/Members
  const [initialValues, setInitialValues] = useState({
    nom: '',
    prenom: '',
    role: '',
    email: '',
    linkedin: '',
    description: '',
    image: null
  });

  // 2. Fetch Data
  useEffect(() => {
    if (isEditMode) {
      // Assuming your backend route for team members is '/equipe' or '/members'
      api.get(`/equipe/${id}`) 
        .then(response => {
          const data = response.data;
          setInitialValues({
            nom: data.nom || '',
            prenom: data.prenom || '',
            role: data.role || '',
            email: data.email || '',
            linkedin: data.linkedin || '',
            description: data.description || '',
            image: null
          });

          if (data.image) {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
            const imageUrl = data.image.startsWith('http') ? data.image : `${baseUrl}/${data.image}`;
            setPreviewImage(imageUrl);
          }
        })
        .catch(error => console.error("Erreur chargement:", error));
    }
  }, [id, isEditMode]);

  // 3. Validation
  const validationSchema = Yup.object({
    nom: Yup.string().required('Le nom est requis'),
    prenom: Yup.string().required('Le prénom est requis'),
    email: Yup.string().email('Email invalide').required('L\'email est requis'),
    role: Yup.string().required('Le rôle est requis'),
  });

  // 4. Submit Handler
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
        if (key !== 'image' && values[key] !== null) {
            formData.append(key, values[key]);
        }
    });

    if (values.image instanceof File) {
        formData.append('image', values.image);
    }

    try {
      if (isEditMode) {
        formData.append('_method', 'PUT');
        await api.post(`/equipe/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/equipe', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/admin/equipe'); // Adjust this route if needed
    } catch (error) {
      console.error("Erreur:", error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {isEditMode ? 'Modifier le membre' : 'Ajouter un membre'}
      </h2>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <Field name="nom" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                <ErrorMessage name="nom" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <Field name="prenom" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                <ErrorMessage name="prenom" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Field name="email" type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Rôle / Fonction</label>
              <Field name="role" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">LinkedIn (Optionnel)</label>
              <Field name="linkedin" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Field as="textarea" name="description" rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Photo de profil</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    setFieldValue('image', file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
                className="mt-1 block w-full"
              />
              {previewImage && (
                <img src={previewImage} alt="Aperçu" className="mt-2 h-24 w-24 object-cover rounded-full border" />
              )}
            </div>

            <div className="flex justify-end pt-4 gap-3">
              <button type="button" onClick={() => navigate('/admin/equipe')} className="px-4 py-2 border rounded">Annuler</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {isSubmitting ? 'Enregistrement...' : (isEditMode ? 'Enregistrer' : 'Créer')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminForm;