import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PlantRequest, Frequency, PlantList } from '../types';
import { plantsAPI, plantListsAPI } from '../services/api';
import {
  Leaf,
  Camera,
  Tag,
  FileText,
  Calendar,
  ArrowLeft,
  Upload,
  X,
  Link as LinkIcon,
  List
} from 'lucide-react';

// Define form data interface that matches our form structure
interface PlantFormData {
  name: string;
  type: string;
  tags: string[];
  notes: string;
  photoUrl: string;
  frequency: Frequency;
  plantListId: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Plant name is required'),
  type: yup.string().default(''),
  tags: yup.array().of(yup.string().required()).default([]),
  notes: yup.string().default(''),
  photoUrl: yup.string().url('Must be a valid URL').default(''),
  frequency: yup.mixed<Frequency>().oneOf(Object.values(Frequency)).required('Watering frequency is required'),
  plantListId: yup.string().required('Please select a plant list'),
});

const AddPlant: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoMethod, setPhotoMethod] = useState<'file' | 'url'>('file');
  const [plantLists, setPlantLists] = useState<PlantList[]>([]);
  const [loadingLists, setLoadingLists] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<PlantFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      type: '',
      tags: [],
      notes: '',
      photoUrl: '',
      frequency: Frequency.MEDIUM,
      plantListId: '',
    },
  });

  const watchedTags = watch('tags') || [];

  useEffect(() => {
    fetchPlantLists();
  }, []);

  const fetchPlantLists = async () => {
    try {
      setLoadingLists(true);
      const lists = await plantListsAPI.getAll();
      setPlantLists(lists);

      // Auto-select first list if only one exists
      if (lists.length === 1) {
        setValue('plantListId', lists[0].id);
      }
    } catch (error) {
      console.error('Error fetching plant lists:', error);
      setError('plantListId', { message: 'Failed to load plant lists' });
    } finally {
      setLoadingLists(false);
    }
  };

  const onSubmit: SubmitHandler<PlantFormData> = async (data) => {
    setIsLoading(true);
    try {
      let photoUrl = data.photoUrl;

      // If user uploaded a file, convert to base64 for demo purposes
      // In production, you'd upload to a cloud storage service
      if (photoFile && photoMethod === 'file') {
        photoUrl = await convertFileToBase64(photoFile);
      }

      const plantData: PlantRequest = {
        name: data.name,
        type: data.type || undefined,
        tags: data.tags.filter(tag => tag.trim() !== ''),
        notes: data.notes || undefined,
        photoUrl: photoUrl || undefined,
        frequency: data.frequency,
      };

      // Create the plant
      const newPlant = await plantsAPI.create(plantData);

      // Add plant to the selected list
      if (data.plantListId) {
        await plantListsAPI.addPlant(data.plantListId, newPlant.id);
      }

      // Navigate back to plants page which will refresh the list
      navigate('/plants', { state: { from: 'add-plant', refresh: true } });
    } catch (error: any) {
      console.error('Error creating plant:', error);
      setError('root', {
        message: error.response?.data?.message || 'Failed to create plant. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('photoUrl', { message: 'Please select an image file' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('photoUrl', { message: 'Image must be less than 5MB' });
        return;
      }

      setPhotoFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setValue('photoUrl', '');
  };

  const addTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue('tags', [...watchedTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const frequencyOptions = [
    { value: Frequency.FREQUENT, label: 'Frequent', description: 'Every 2 days' },
    { value: Frequency.MEDIUM, label: 'Medium', description: 'Every 5 days' },
    { value: Frequency.RARE, label: 'Rare', description: 'Every 10 days' },
  ];

  return (
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Add New Plant</h1>
          <p className="mt-2 text-gray-600">
            Add a new plant to your collection and start tracking its care
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            {/* Plant List Selection */}
            <div>
              <label htmlFor="plantListId" className="block text-sm font-medium text-gray-700">
                <List className="inline h-4 w-4 mr-1" />
                Add to Plant List *
              </label>
              {loadingLists ? (
                  <div className="mt-1 flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 mr-2"></div>
                    <span className="text-sm text-gray-500">Loading plant lists...</span>
                  </div>
              ) : (
                  <select
                      {...register('plantListId')}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  >
                    <option value="">Select a plant list</option>
                    {plantLists.map((list) => (
                        <option key={list.id} value={list.id}>
                          {list.name} ({list.plantIds.length} plants)
                        </option>
                    ))}
                  </select>
              )}
              {errors.plantListId && (
                  <p className="mt-1 text-sm text-red-600">{errors.plantListId.message}</p>
              )}
              {plantLists.length === 0 && !loadingLists && (
                  <p className="mt-1 text-sm text-yellow-600">
                    No plant lists found. Create a plant list first to organize your plants.
                  </p>
              )}
            </div>

            {/* Plant Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                <Leaf className="inline h-4 w-4 mr-1" />
                Plant Name *
              </label>
              <input
                  {...register('name')}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="e.g., My Fiddle Leaf Fig"
              />
              {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Plant Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Plant Type
              </label>
              <input
                  {...register('type')}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="e.g., Fiddle Leaf Fig, Snake Plant, Pothos"
              />
              {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Camera className="inline h-4 w-4 mr-1" />
                Plant Photo
              </label>

              {/* Photo Method Toggle */}
              <div className="flex space-x-4 mb-4">
                <button
                    type="button"
                    onClick={() => setPhotoMethod('file')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        photoMethod === 'file'
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                >
                  <Upload className="inline h-4 w-4 mr-1" />
                  Upload File
                </button>
                <button
                    type="button"
                    onClick={() => setPhotoMethod('url')}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                        photoMethod === 'url'
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                >
                  <LinkIcon className="inline h-4 w-4 mr-1" />
                  Use URL
                </button>
              </div>

              {photoMethod === 'file' ? (
                  <div>
                    {!photoPreview ? (
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                  htmlFor="photo-upload"
                                  className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                              >
                                <span>Upload a photo</span>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                          </div>
                        </div>
                    ) : (
                        <div className="relative">
                          <img
                              src={photoPreview}
                              alt="Plant preview"
                              className="w-full h-48 object-cover rounded-md"
                          />
                          <button
                              type="button"
                              onClick={removePhoto}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                    )}
                  </div>
              ) : (
                  <input
                      {...register('photoUrl')}
                      type="url"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="https://example.com/plant-photo.jpg"
                  />
              )}

              {errors.photoUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.photoUrl.message}</p>
              )}
            </div>

            {/* Watering Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Calendar className="inline h-4 w-4 mr-1" />
                Watering Frequency *
              </label>
              <div className="space-y-3">
                {frequencyOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                          {...register('frequency')}
                          id={option.value}
                          type="radio"
                          value={option.value}
                          className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300"
                      />
                      <label htmlFor={option.value} className="ml-3 block text-sm">
                        <span className="font-medium text-gray-900">{option.label}</span>
                        <span className="text-gray-500 ml-2">({option.description})</span>
                      </label>
                    </div>
                ))}
              </div>
              {errors.frequency && (
                  <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags
              </label>
              <div className="flex space-x-2 mb-2">
                <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Add a tag (e.g., indoor, low-light, pet-safe)"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add
                </button>
              </div>
              {watchedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {watchedTags.map((tag, index) => (
                        <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                        >
                    {tag}
                          <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
                          >
                      <span className="sr-only">Remove tag</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="m1 1 6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                    ))}
                  </div>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Add tags to help organize and filter your plants
              </p>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                <FileText className="inline h-4 w-4 mr-1" />
                Notes
              </label>
              <textarea
                  {...register('notes')}
                  rows={3}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Any special care instructions or notes about this plant..."
              />
              {errors.notes && (
                  <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
              )}
            </div>

            {/* Error Message */}
            {errors.root && (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-800">{errors.root.message}</p>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-3">
              <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </div>
                ) : (
                    'Add Plant'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AddPlant;