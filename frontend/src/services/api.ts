import axios from 'axios';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Plant,
  PlantRequest,
  CareEventRequest,
  PlantList,
  PlantListRequest,
  User,
  ShareListRequest
} from '../types';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
);

// File upload helper
const uploadFile = async (file: File): Promise<string> => {
  // In a real application, you would upload to a cloud storage service
  // For demo purposes, we'll convert to base64
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// Auth API
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  searchByEmail: async (email: string): Promise<User[]> => {
    const response = await api.get(`/users/search?email=${encodeURIComponent(email)}`);
    return response.data;
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};

// Plants API
export const plantsAPI = {
  getAll: async (): Promise<Plant[]> => {
    const response = await api.get('/plants');
    return response.data;
  },

  getById: async (id: string): Promise<Plant> => {
    const response = await api.get(`/plants/${id}`);
    return response.data;
  },

  create: async (plant: PlantRequest): Promise<Plant> => {
    const response = await api.post('/plants', plant);
    return response.data;
  },

  update: async (id: string, plant: PlantRequest): Promise<Plant> => {
    const response = await api.put(`/plants/${id}`, plant);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/plants/${id}`);
  },

  addCareEvent: async (id: string, event: CareEventRequest): Promise<Plant> => {
    const response = await api.post(`/plants/${id}/care-events`, event);
    return response.data;
  },

  getDueToday: async (): Promise<Plant[]> => {
    const response = await api.get('/plants/due-today');
    return response.data;
  },

  uploadPhoto: async (file: File): Promise<string> => {
    // In production, implement actual file upload to cloud storage
    return await uploadFile(file);
  },
};

// Plant Lists API
export const plantListsAPI = {
  getAll: async (): Promise<PlantList[]> => {
    const response = await api.get('/plant-lists');
    return response.data;
  },

  getById: async (id: string): Promise<PlantList> => {
    const response = await api.get(`/plant-lists/${id}`);
    return response.data;
  },

  create: async (plantList: PlantListRequest): Promise<PlantList> => {
    const response = await api.post('/plant-lists', plantList);
    return response.data;
  },

  update: async (id: string, plantList: PlantListRequest): Promise<PlantList> => {
    const response = await api.put(`/plant-lists/${id}`, plantList);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/plant-lists/${id}`);
  },

  addPlant: async (listId: string, plantId: string): Promise<PlantList> => {
    const response = await api.post(`/plant-lists/${listId}/plants/${plantId}`);
    return response.data;
  },

  removePlant: async (listId: string, plantId: string): Promise<PlantList> => {
    const response = await api.delete(`/plant-lists/${listId}/plants/${plantId}`);
    return response.data;
  },

  shareWithUser: async (listId: string, shareRequest: ShareListRequest): Promise<PlantList> => {
    const response = await api.post(`/plant-lists/${listId}/share`, shareRequest);
    return response.data;
  },

  removeCollaborator: async (listId: string, userId: string): Promise<PlantList> => {
    const response = await api.delete(`/plant-lists/${listId}/collaborators/${userId}`);
    return response.data;
  },
};

export default api;