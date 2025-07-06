import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plant, CareEventType } from '../types';
import { plantsAPI } from '../services/api';
import PlantCard from '../components/PlantCard';
import { 
  Droplets, 
  Leaf, 
  Calendar, 
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantsDueToday, setPlantsDueToday] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [allPlants, dueToday] = await Promise.all([
        plantsAPI.getAll(),
        plantsAPI.getDueToday()
      ]);
      setPlants(allPlants);
      setPlantsDueToday(dueToday);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleWaterPlant = async (plantId: string) => {
    try {
      await plantsAPI.addCareEvent(plantId, {
        type: CareEventType.WATERING,
        notes: 'Watered from dashboard',
        additionalData: { amount: 0.5 }
      });
      
      // Refresh data
      await fetchData();
    } catch (err: any) {
      console.error('Error watering plant:', err);
      setError('Failed to water plant');
    }
  };

  const getStats = () => {
    const totalPlants = plants.length;
    const plantsNeedingWater = plantsDueToday.length;
    const recentlyWatered = plants.filter(plant => {
      if (!plant.schedule.lastWatered) return false;
      const lastWatered = new Date(plant.schedule.lastWatered);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return lastWatered >= yesterday;
    }).length;

    return { totalPlants, plantsNeedingWater, recentlyWatered };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm">
        <div className="px-6 py-8 text-white">
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.firstName}! 🌱
          </h1>
          <p className="mt-2 text-green-100">
            Here's what's happening with your plants today
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Leaf className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Plants
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.totalPlants}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Droplets className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Need Water Today
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.plantsNeedingWater}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Recently Watered
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {stats.recentlyWatered}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plants Due Today */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">
              Plants Due Today ({plantsDueToday.length})
            </h2>
          </div>
        </div>
        <div className="p-6">
          {plantsDueToday.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                All caught up!
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                No plants need watering today. Great job! 🎉
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plantsDueToday.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onWater={handleWaterPlant}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      {plants.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Your Garden Overview
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.slice(0, 6).map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onWater={handleWaterPlant}
                  showActions={false}
                />
              ))}
            </div>
            {plants.length > 6 && (
              <div className="mt-6 text-center">
                <a
                  href="/plants"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-200"
                >
                  View All Plants ({plants.length})
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {plants.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No plants yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding your first plant to track.
          </p>
          <div className="mt-6">
            <a
              href="/add-plant"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <Leaf className="h-4 w-4 mr-2" />
              Add Your First Plant
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;