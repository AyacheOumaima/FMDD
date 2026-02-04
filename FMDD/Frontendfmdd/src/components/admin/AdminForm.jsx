// src/components/admin/AdminForm.jsx
import React, { useState, useEffect } from 'react';

const AdminForm = ({ title, initialValues, onSubmit, onCancel, children }) => {
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitLocal = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <form onSubmit={handleSubmitLocal} className="space-y-6">
        
        {/* On passe les données et le handler au contenu du formulaire (BlogPostForm) */}
        {children({ handleChange, formData, setFormData })}

        <div className="flex justify-end pt-4 gap-3">
          <button 
            type="button" 
            onClick={onCancel} 
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;