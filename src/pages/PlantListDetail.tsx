import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PlantList, Plant, CareEventType, ShareListRequest, User } from '../types';
import { plantListsAPI, plantsAPI, usersAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import PlantCard from '../components/PlantCard';
import {
    ArrowLeft,
    Users,
    Share2,
    Plus,
    Mail,
    X,
    UserPlus,
    // Trash2,
    // Edit,
    AlertCircle,
    CheckCircle,
    Calendar,
    List,
    Crown,
    UserX
} from 'lucide-react';

const shareSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
});

const PlantListDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();
    const [plantList, setPlantList] = useState<PlantList | null>(null);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [collaborators, setCollaborators] = useState<User[]>([]);
    const [owner, setOwner] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError: setFormError,
    } = useForm<ShareListRequest>({
        resolver: yupResolver(shareSchema),
    });

    useEffect(() => {
        if (id) {
            fetchPlantListDetail();
        }
    }, [id]);

    const fetchPlantListDetail = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const [listData, allPlants] = await Promise.all([
                plantListsAPI.getById(id),
                plantsAPI.getAll()
            ]);

            setPlantList(listData);

            // Filter plants that belong to this list
            const listPlants = allPlants.filter(plant =>
                listData.plantIds.includes(plant.id)
            );
            setPlants(listPlants);

            // Fetch owner details
            try {
                const ownerData = await usersAPI.getById(listData.ownerId);
                setOwner(ownerData);
            } catch (err) {
                console.error('Error fetching owner:', err);
            }

            // Fetch collaborator details
            if (listData.collaboratorIds.length > 0) {
                try {
                    const collaboratorPromises = listData.collaboratorIds.map(id => usersAPI.getById(id));
                    const collaboratorData = await Promise.all(collaboratorPromises);
                    setCollaborators(collaboratorData);
                } catch (err) {
                    console.error('Error fetching collaborators:', err);
                }
            } else {
                setCollaborators([]);
            }
        } catch (err: any) {
            console.error('Error fetching plant list detail:', err);
            setError('Failed to load plant list details');
        } finally {
            setLoading(false);
        }
    };

    const handleWaterPlant = async (plantId: string) => {
        try {
            await plantsAPI.addCareEvent(plantId, {
                type: CareEventType.WATERING,
                notes: 'Watered from plant list',
                additionalData: { amount: 0.5 }
            });

            // Refresh plants
            await fetchPlantListDetail();
            setSuccessMessage('Plant watered successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            console.error('Error watering plant:', err);
            setError('Failed to water plant');
            setTimeout(() => setError(null), 3000);
        }
    };

    const onShareSubmit = async (data: ShareListRequest) => {
        if (!plantList) return;

        setIsSharing(true);
        try {
            await plantListsAPI.shareWithUser(plantList.id, data);
            setSuccessMessage(`List shared with ${data.email} successfully!`);
            setShowShareModal(false);
            reset();

            // Refresh the list to show new collaborator
            await fetchPlantListDetail();
        } catch (error: any) {
            console.error('Error sharing list:', error);
            setFormError('root', {
                message: error.response?.data?.message || 'Failed to share list. Please check the email address.',
            });
        } finally {
            setIsSharing(false);
        }
    };

    const handleRemovePlant = async (plantId: string) => {
        if (!plantList) return;

        try {
            await plantListsAPI.removePlant(plantList.id, plantId);
            await fetchPlantListDetail();
            setSuccessMessage('Plant removed from list successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            console.error('Error removing plant from list:', err);
            setError('Failed to remove plant from list');
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleRemoveCollaborator = async (collaboratorId: string) => {
        if (!plantList) return;

        try {
            await plantListsAPI.removeCollaborator(plantList.id, collaboratorId);
            await fetchPlantListDetail();
            setSuccessMessage('Collaborator removed successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            console.error('Error removing collaborator:', err);
            setError('Failed to remove collaborator');
            setTimeout(() => setError(null), 3000);
        }
    };

    // Calculate permissions - ensure boolean values
    const isOwner = Boolean(currentUser && plantList && currentUser.id === plantList.ownerId);
    const canEdit = Boolean(currentUser && plantList && (currentUser.id === plantList.ownerId || plantList.collaboratorIds.includes(currentUser.id)));

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error && !plantList) {
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

    if (!plantList) {
        return (
            <div className="text-center py-12">
                <List className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Plant list not found</h3>
                <p className="mt-1 text-sm text-gray-500">The plant list you're looking for doesn't exist.</p>
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
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <button
                        onClick={() => navigate('/plant-lists')}
                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Plant Lists
                    </button>

                    <div className="flex items-center space-x-4 mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">{plantList.name}</h1>
                        {isOwner && (
                            <button
                                onClick={() => setShowShareModal(true)}
                                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            >
                                <Share2 className="h-4 w-4 mr-2" />
                                Share
                            </button>
                        )}
                    </div>

                    {plantList.description && (
                        <p className="text-gray-600 mb-4">{plantList.description}</p>
                    )}

                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                            <List className="h-4 w-4 mr-1" />
                            <span>{plants.length} plants</span>
                        </div>
                        <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{plantList.collaboratorIds.length + 1} members</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Created {new Date(plantList.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {/* Members Section */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Members</h3>
                        <div className="space-y-3">
                            {/* Owner */}
                            {owner && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Crown className="h-5 w-5 text-yellow-500 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {owner.firstName} {owner.lastName}
                                            </p>
                                            <p className="text-sm text-gray-500">{owner.email}</p>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Owner
                  </span>
                                </div>
                            )}

                            {/* Collaborators */}
                            {collaborators.map((collaborator) => (
                                <div key={collaborator.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Users className="h-5 w-5 text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {collaborator.firstName} {collaborator.lastName}
                                            </p>
                                            <p className="text-sm text-gray-500">{collaborator.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Collaborator
                    </span>
                                        {isOwner && (
                                            <button
                                                onClick={() => handleRemoveCollaborator(collaborator.id)}
                                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                                title="Remove collaborator"
                                            >
                                                <UserX className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Plants Grid */}
            {plants.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow">
                    <List className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No plants in this list</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Add plants to this list to start tracking their care.
                    </p>
                    {canEdit && (
                        <div className="mt-6">
                            <a
                                href="/add-plant"
                                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Plant
                            </a>
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plants.map((plant) => (
                        <div key={plant.id} className="relative group">
                            <PlantCard
                                plant={plant}
                                onWater={canEdit ? handleWaterPlant : undefined}
                                showActions={canEdit}
                            />
                            {canEdit && (
                                <button
                                    onClick={() => handleRemovePlant(plant.id)}
                                    className="absolute top-2 left-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                                    title="Remove from list"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Share Plant List</h3>
                            <button
                                onClick={() => {
                                    setShowShareModal(false);
                                    reset();
                                }}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600">
                                Share "{plantList.name}" with another user by entering their email address.
                                They will be able to view and modify this list.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onShareSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    <Mail className="inline h-4 w-4 mr-1" />
                                    User Email
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                    placeholder="user@example.com"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                                    onClick={() => {
                                        setShowShareModal(false);
                                        reset();
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSharing}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    {isSharing ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Sharing...
                                        </div>
                                    ) : (
                                        <>
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Share List
                                        </>
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

export default PlantListDetail;