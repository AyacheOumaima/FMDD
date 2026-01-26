import { useEffect, useState } from "react";
import axios from "axios";

function API() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/hello`, { withCredentials: true })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Erreur API :", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Réponse de Laravel :</h1>
      <p>{message}</p>
    </div>
  );
}

export default API;


