import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import Chart from 'react-apexcharts';

const StatsAdmin = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/admin/stats');
      setStats(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    series: [
      {
        name: 'Projets',
        data: stats.projets_par_mois || []
      }
    ],
    options: {
      chart: {
        type: 'line',
        height: 350
      },
      xaxis: {
        type: 'category'
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">Statistiques</h1>

      {loading && (
        <div className="text-center py-4">Chargement...</div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Utilisateurs" 
          value={stats.total_users || 0}
          icon="👥"
          color="text-blue-600"
        />
        <StatCard 
          title="Projets" 
          value={stats.total_projets || 0}
          icon="🏗️"
          color="text-green-600"
        />
        <StatCard 
          title="Formations" 
          value={stats.total_formations || 0}
          icon="🎓"
          color="text-yellow-600"
        />
        <StatCard 
          title="Événements" 
          value={stats.total_evenements || 0}
          icon="📅"
          color="text-purple-600"
        />
        <StatCard 
          title="Insertions" 
          value={stats.total_insertions || 0}
          icon="💼"
          color="text-pink-600"
        />
        <StatCard 
          title="Témoignages" 
          value={stats.total_temoignages || 0}
          icon="💬"
          color="text-orange-600"
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Évolution des projets</h2>
        <Chart options={chartOptions.options} series={chartOptions.series} type="line" height={350} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center">
      <div className={`${color} text-2xl mr-3`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default StatsAdmin;
