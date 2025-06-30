import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PlantList, PlantListRequest } from '../types';
import { plantListsAPI } from '../services/api';
import {
  List,
  Plus,
  Users,
  Calendar,
  AlertCircle,
  Share2,
  X,
  Eye
} from 'lucide-react';

const schema = yup.object({
  name: yup.string().required('List name is required'),
  description: yup.string(),
});

const PlantLists: React.FC = () => {
  const navigate = useNavigate();
  const [plantLists, setPlantLists] = useState<PlantList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError: setFormError,
  } = useForm<PlantListRequest>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    fetchPlantLists();
  }, []);

  const fetchPlantLists = async () => {
    try {
      setLoading(true);
      const data = await plantListsAPI.getAll();
      setPlantLists(data);
    } catch (err: any) {
      console.error('Error fetching plant lists:', err);
      setError('Failed to load plant lists');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PlantListRequest) => {
    setIsCreating(true);
    try {
      await plantListsAPI.create(data);
      setShowCreateModal(false);
      reset();
      await fetchPlantLists(); // Refresh the list
    } catch (error: any) {
      console.error('Error creating plant list:', error);
      setFormError('root', {
        message: error.response?.data?.message || 'Failed to create plant list. Please try again.',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    reset();
  };

  const handleViewList = (listId: string) => {
    navigate(`/plant-lists/${listId}`);
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

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Plant Lists</h1>
            <p className="mt-1 text-sm text-gray-500">
              Organize and share your plants with others
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create List
            </button>
          </div>
        </div>

        {/* Plant Lists */}
        {plantLists.length === 0 ? (
            <div className="text-center py-12">
              <List className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No plant lists yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Create your first plant list to organize and share your plants.
              </p>
              <div className="mt-6">
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First List
                </button>
              </div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plantLists.map((list) => (
                  <div
                      key={list.id}
                      className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 group"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {list.name}
                        </h3>
                        <Share2 className="h-5 w-5 text-gray-400" />
                      </div>

                      {list.description && (
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {list.description}
                          </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <List className="h-4 w-4 mr-1" />
                          <span>{list.plantIds.length} plants</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{list.collaboratorIds.length + 1} members</span>
                        </div>
                      </div>

                      <div className="flex items-center text-xs text-gray-400 mb-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>
                    Created {new Date(list.createdAt).toLocaleDateString()}
                  </span>
                      </div>

                      <div className="space-y-2">
                        <button
                            onClick={() => handleViewList(list.id)}
                            className="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View List
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
        )}

        {/* Create List Modal */}
        {showCreateModal && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Create New Plant List</h3>
                  <button
                      onClick={handleCloseModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      List Name *
                    </label>
                    <input
                        {...register('name')}
                        type="text"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="e.g., Indoor Plants, Outdoor Garden"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                        {...register('description')}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="Optional description for your plant list..."
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  {errors.root && (
                      <div className="rounded-md bg-red-50 p-4">
                        <p className="text-sm text-red-800">{errors.root.message}</p>
                      </div>
                  )}

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isCreating}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isCreating ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                          </div>
                      ) : (
                          'Create List'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default PlantLists;