import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

// ✅ CORRECT IMPORT: Points to src/axios.js
import api from '../../axios'; 

const EvenementForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = !!id; 
  const [previewImage, setPreviewImage] = useState(null);

  // 1. Initial Values for Events
  const [initialValues, setInitialValues] = useState({
    titre: '',
    description: '',
    date: '',
    heure: '',
    lieu: '',
    ville: '',
    type_evenement: 'gratuit',
    categorie: '',
    limite_de_places: 0,
    image: null 
  });

  // 2. Fetch Data if Editing
  useEffect(() => {
    if (isEditMode) {
      api.get(`/events/${id}`)
        .then(response => {
          const data = response.data;
          
          setInitialValues({
            titre: data.titre || '',
            description: data.description || '',
            date: data.date || '',
            heure: data.heure || '',
            lieu: data.lieu || '',
            ville: data.ville || '',
            type_evenement: data.type_evenement || 'gratuit',
            categorie: data.categorie || '',
            limite_de_places: data.limite_de_places || 0,
            image: null // Keep null to avoid re-uploading string
          });

          if (data.image) {
            const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
            const imageUrl = data.image.startsWith('http') 
              ? data.image 
              : `${baseUrl}/${data.image}`;
            setPreviewImage(imageUrl);
          }
        })
        .catch(error => console.error("Erreur chargement:", error));
    }
  }, [id, isEditMode]);

  // 3. Validation
  const validationSchema = Yup.object({
    titre: Yup.string().required('Le titre est requis'),
    date: Yup.date().required('La date est requise'),
    description: Yup.string().required('La description est requise'),
    ville: Yup.string().required('La ville est requise'),
  });

  // 4. Submit Handler (Handles Images & Laravel PUT)
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
        // Laravel requires POST with _method="PUT" for files
        formData.append('_method', 'PUT'); 
        await api.post(`/events/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/events', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      navigate('/admin/evenements'); 
    } catch (error) {
      console.error("Erreur soumission:", error);
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
        {isEditMode ? 'Modifier l\'événement' : 'Créer un événement'}
      </h2>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Titre</label>
              <Field name="titre" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              <ErrorMessage name="titre" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <Field name="date" type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Heure</label>
                <Field name="heure" type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ville</label>
                <Field name="ville" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
                <ErrorMessage name="ville" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <Field as="textarea" name="description" rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
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
                <img src={previewImage} alt="Aperçu" className="mt-2 h-32 object-cover rounded" />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <Field as="select" name="type_evenement" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                   <option value="gratuit">Gratuit</option>
                   <option value="payant">Payant</option>
                </Field>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                <Field name="categorie" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-3">
              <button type="button" onClick={() => navigate('/admin/evenements')} className="px-4 py-2 border rounded">Annuler</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {isSubmitting ? 'En cours...' : (isEditMode ? 'Modifier' : 'Créer')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EvenementForm;