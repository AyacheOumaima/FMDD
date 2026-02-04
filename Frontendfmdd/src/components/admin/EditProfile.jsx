import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

const EditProfile = () => {

  const { user,token, updateUser } = useAuth(); 
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:8000/api/v1/profile',
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password_confirmation: password
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );
      updateUser(response.data.user);
      setMessage(response.data.message);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error.response?.data);
      setMessage('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Modifier votre Profile</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
       

        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
         <div>
          <label className="block mb-1 font-medium"> Prénom </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Mot de Passe </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="Laissez vide pour garder le mot de passe actuel"
          />
        </div>
        <div className="flex justify-end gap-4 pt-6">
        <button type="submit" className="bg-[#00A99D] text-white px-4 py-2 rounded">
           Mettre à jour
        </button>
         <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="bg-[#00A99D] text-white px-4 py-2 rounded"
          >
            Annuler
          </button>
          </div>
      </form>
    </div>
  );
};

export default EditProfile;
