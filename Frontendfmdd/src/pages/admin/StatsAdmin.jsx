
import React, { useState, useEffect } from 'react';

import axios from '../../axios';
import Chart from 'react-apexcharts';
import { TrendingUp, BarChart3 } from 'lucide-react';


const StatsAdmin = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('month');

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

  // Données fictives pour démonstration (à remplacer par vos vraies données)
  const generateMockData = () => {
    const mois = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return mois.map(mois => ({
      x: mois,
      y: Math.floor(Math.random() * 50) + 20
    }));
  };

  // Graphique 1: Évolution temporelle (ligne)
  const lineChartOptions = {
    series: [
      {
        name: 'Projets',
        data: stats.projets_par_mois?.map((val, idx) => ({ x: `Mois ${idx + 1}`, y: val })) || generateMockData()
      },
      {
        name: 'Formations',
        data: generateMockData()
      },
      {
        name: 'Événements',
        data: generateMockData()
      }
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: false
          },

          autoSelected: 'zoom'
        },
        background: 'transparent',
        foreColor: '#6B7280'
      },
      colors: ['#3B82F6', '#10B981', '#8B5CF6'],
      stroke: {
        width: [3, 3, 3],
        curve: 'smooth',
        lineCap: 'round'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 90, 100]
        }
      },
      markers: {
        size: 5,
        colors: ['#ffffff'],
        strokeColors: ['#3B82F6', '#10B981', '#8B5CF6'],
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      xaxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          formatter: (val) => `${val}`,
          style: {
            fontSize: '12px'
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetY: -10,
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        markers: {
          radius: 6,
          width: 12,
          height: 12,
          offsetX: -5,
          offsetY: 1
        },
        itemMargin: {
          horizontal: 20,
          vertical: 0
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        }
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: true
        },
        y: {
          formatter: (val) => `${val} éléments`
        }
      }
    }
  };

  // Graphique 2: Répartition (donut)
  const donutChartOptions = {
    series: [
      stats.total_projets || 25,
      stats.total_formations || 18,
      stats.total_evenements || 12,
      stats.total_insertions || 8,
      stats.total_temoignages || 15
    ],
    options: {
      chart: {
        type: 'donut',
        height: 350
      },
      colors: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'],
      labels: ['Projets', 'Formations', 'Événements', 'Insertions', 'Témoignages'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
                color: '#6B7280'
              },
              value: {
                show: true,
                fontSize: '24px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: '#111827',
                formatter: (val) => `${val}`
              },
              total: {
                show: true,
                label: 'Total',
                color: '#6B7280',
                formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0)
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };



  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-xs text-green-600 font-medium">{trend}% ce mois</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('text-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-red-600 text-xl">!</span>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-red-800">Erreur de chargement</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchStats}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* GRAPHIQUES VERTICAUX */}
      <div className="space-y-6">
        {/* Graphique en ligne - Évolution de l'activité */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Évolution de l'activité</h2>
              <p className="text-sm text-gray-600">Performance sur les 12 derniers mois</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          
          {/* Conteneur personnalisé pour la légende et les contrôles */}
        
          
          <Chart 
            options={lineChartOptions.options} 
            series={lineChartOptions.series} 
            type="line" 
            height={350} 
          />
        </div>

        {/* Graphique donut - Répartition du contenu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Répartition du contenu</h2>
              <p className="text-sm text-gray-600">Distribution par catégorie</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-violet-600" />
            </div>
          </div>
          <Chart 
            options={donutChartOptions.options} 
            series={donutChartOptions.series} 
            type="donut" 
            height={350} 
          />
        </div>
      </div>

    </div>
  );
};

export default StatsAdmin;
