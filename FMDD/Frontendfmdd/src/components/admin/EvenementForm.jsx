import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import api from '../../axios'; 

const EvenementForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = !!id; 
  const [previewImage, setPreviewImage] = useState(null);

 const [initialValues, setInitialValues] = useState({
    titre: '',
    description: '',
    date: '',
    heure: '',
    ville: '',
    type_evenement: 'gratuit',
    limite_de_places: 0,
    prix: 0,
    // ✅ Noms mis à jour
    date_limite_inscription: '', 
    heure_limite_inscription: '',
    image: null 
});

  useEffect(() => {
    if (isEditMode) {
      // ✅ Utilisation de /evenements pour correspondre au contrôleur
      api.get(`/api/v1/evenements/${id}`)
        .then(response => {
          const data = response.data.data || response.data;
          setInitialValues({
            ...data,
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

  const validationSchema = Yup.object({
    titre: Yup.string().required('Le titre est requis'),
    date: Yup.date().required('La date est requise'),
    description: Yup.string().required('La description est requise'),
    ville: Yup.string().required('La ville est requise'),
  });

 const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
        if (key !== 'image') {
            // ✅ Laravel n'aime pas les chaînes vides pour les dates. 
            // Si c'est vide, on n'envoie rien (Laravel mettra NULL grâce au nullable)
            if (values[key] !== '' && values[key] !== null) {
                formData.append(key, values[key]);
            }
        }
    });

    if (values.image instanceof File) {
        formData.append('image', values.image);
    }

    try {
      // ✅ VÉRIFICATION URL : 
      // Si votre instance axios a déjà baseURL: '.../api/v1', utilisez juste '/evenements'
      // Si votre instance axios n'a que '...:8000', utilisez '/api/v1/evenements'
      
      const endpoint = isEditMode ? `/api/v1/evenements/${id}` : '/api/v1/evenements';
      
      if (isEditMode) {
        formData.append('_method', 'PUT'); 
      }

      // await api.post(endpoint, formData);
await api.post(endpoint, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

      navigate('/admin/evenements'); 
    } catch (error) {
      console.error("Erreur détaillée:", error.response?.data);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setSubmitting(false);
    }
};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">
        {isEditMode ? '✏️ Modifier l\'événement' : '📅 Créer un événement'}
      </h2>

      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* ✅ FIX : Ajout de 'values' et 'errors' ici pour éviter le ReferenceError */}
        {({ setFieldValue, isSubmitting, values, errors }) => {
          // Debugging : affiche les erreurs de validation si le bouton ne marche pas
          if (Object.keys(errors).length > 0) console.log("Erreurs Formik:", errors);

          return (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium">Titre</label>
                <Field name="titre" className="mt-1 block w-full rounded-md border-gray-300 p-2 border" />
                <ErrorMessage name="titre" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Date de l'événement</label>
                  <Field name="date" type="date" className="mt-1 block w-full rounded-md border-gray-300 p-2 border" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Ville</label>
                  <Field name="ville" className="mt-1 block w-full rounded-md border-gray-300 p-2 border" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium">Type</label>
                  <Field as="select" name="type_evenement" className="mt-1 block w-full rounded-md border-gray-300 p-2 border">
                    <option value="gratuit">Gratuit</option>
                    <option value="payant">Payant</option>
                  </Field>
                </div>
                {/* ✅ Utilisation sécurisée de values car déclaré plus haut */}
                {values.type_evenement === 'payant' && (
                  <div>
                    <label className="block text-sm font-medium">Prix (MAD)</label>
                    <Field name="prix" type="number" className="mt-1 block w-full rounded-md border-gray-300 p-2 border" />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium">Limite de places</label>
                  <Field name="limite_de_places" type="number" className="mt-1 block w-full rounded-md border-gray-300 p-2 border" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium">Description</label>
                <Field as="textarea" name="description" rows="3" className="mt-1 block w-full rounded-md border-gray-300 p-2 border" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium">Image</label>
                <input type="file" onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  if (file) {
                    setFieldValue('image', file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }} className="mt-1 block w-full" />
                {previewImage && <img src={previewImage} className="mt-2 h-32 rounded border" alt="Aperçu" />}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button type="button" onClick={() => navigate('/admin/evenements')} className="px-4 py-2 border rounded hover:bg-gray-50">
                  Annuler
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isSubmitting ? 'Envoi...' : 'Enregistrer'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EvenementForm;