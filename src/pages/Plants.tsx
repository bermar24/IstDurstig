import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plant, CareEventType } from '../types';
import { plantsAPI } from '../services/api';
import PlantCard from '../components/PlantCard';
import {
  Search,
  Filter,
  Plus,
  Leaf,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const Plants: React.FC = () => {
  const location = useLocation();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFrequency, setFilterFrequency] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPlants();
  }, []);

  // Check if we came from add plant page or need to refresh
  useEffect(() => {
    if (location.state?.from === 'add-plant' || location.state?.refresh) {
      setSuccessMessage('Plant added successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      // Clear the state to prevent showing message on subsequent visits
      window.history.replaceState({}, document.title);
      // Force refresh the plants list
      fetchPlants();
    }
  }, [location]);

  useEffect(() => {
    filterPlants();
  }, [plants, searchTerm, filterFrequency]);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const data = await plantsAPI.getAll();
      setPlants(data);
      setError(null); // Clear any previous errors
    } catch (err: any) {
      console.error('Error fetching plants:', err);
      setError('Failed to load plants');
    } finally {
      setLoading(false);
    }
  };

  const filterPlants = () => {
    let filtered = plants;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(plant =>
          plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plant.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by frequency
    if (filterFrequency) {
      filtered = filtered.filter(plant => plant.schedule.frequency === filterFrequency);
    }

    setFilteredPlants(filtered);
  };

  const handleWaterPlant = async (plantId: string) => {
    try {
      await plantsAPI.addCareEvent(plantId, {
        type: CareEventType.WATERING,
        notes: 'Watered from plants page',
        additionalData: { amount: 0.5 }
      });

      // Refresh plants
      await fetchPlants();
      setSuccessMessage('Plant watered successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      console.error('Error watering plant:', err);
      setError('Failed to water plant');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleEditPlant = (plant: Plant) => {
    // Navigate to edit plant page (would need to implement)
    console.log('Edit plant:', plant);
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Success Message */}
        {successMessage && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{successMessage}</p>
                </div>
              </div>
            </div>
        )}

        {/* Error Message */}
        {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="mt-2 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Plants</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track all your plants in one place ({plants.length} total)
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <a
                href="/add-plant"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Plant
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                  type="text"
                  placeholder="Search plants by name, type, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            {/* Frequency Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                  value={filterFrequency}
                  onChange={(e) => setFilterFrequency(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="">All Frequencies</option>
                <option value="FREQUENT">Frequent (Every 2 days)</option>
                <option value="MEDIUM">Medium (Every 5 days)</option>
                <option value="RARE">Rare (Every 10 days)</option>
              </select>
            </div>
          </div>

          {/* Filter Summary */}
          {(searchTerm || filterFrequency) && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredPlants.length} of {plants.length} plants
                </p>
                <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterFrequency('');
                    }}
                    className="text-sm text-green-600 hover:text-green-500 transition-colors duration-200"
                >
                  Clear filters
                </button>
              </div>
          )}
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
            <div className="text-center py-12">
              <Leaf className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                {plants.length === 0 ? 'No plants yet' : 'No plants match your filters'}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {plants.length === 0
                    ? 'Get started by adding your first plant to track.'
                    : 'Try adjusting your search or filter criteria.'
                }
              </p>
              {plants.length === 0 && (
                  <div className="mt-6">
                    <a
                        href="/add-plant"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Plant
                    </a>
                  </div>
              )}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.map((plant) => (
                  <PlantCard
                      key={plant.id}
                      plant={plant}
                      onWater={handleWaterPlant}
                      onEdit={handleEditPlant}
                      showActions={true}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default Plants;