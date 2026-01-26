import React, { createContext, useContext, useState } from 'react';

const ConfigContext = createContext(null);

export function ConfigProvider({ children }) {
  const [apiUrl, setApiUrl] = useState(import.meta.env.VITE_API_URL || 'http://localhost:8000/api');

  return (
    <ConfigContext.Provider value={{ apiUrl }}>
      {children}
    </ConfigContext.Provider>
  );
}

export const useConfig = () => useContext(ConfigContext);
