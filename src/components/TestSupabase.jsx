import { useState, useEffect } from 'react';
import { testConnection } from '../lib/supabase';

function TestSupabase() {
  const [status, setStatus] = useState({ loading: true, result: null });

  useEffect(() => {
    async function checkConnection() {
      const result = await testConnection();
      setStatus({ loading: false, result });
    }
    checkConnection();
  }, []);

  if (status.loading) {
    return <div>Test de connexion en cours...</div>;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Statut de la connexion Supabase</h2>
      
      {status.result.success ? (
        <div className="text-green-600">
          <p className="mb-2">✅ Connexion réussie</p>
          <p>{status.result.message}</p>
          {status.result.data.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Données reçues :</h3>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(status.result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <div className="text-red-600">
          <p className="mb-2">❌ Erreur de connexion</p>
          <p>{status.result.message}</p>
          {status.result.error && (
            <p className="mt-2 text-sm">Détails: {status.result.error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TestSupabase;