export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface ShareListRequest {
  email: string;
}

export enum Frequency {
  FREQUENT = 'FREQUENT',
  MEDIUM = 'MEDIUM',
  RARE = 'RARE'
}

export enum CareEventType {
  WATERING = 'WATERING',
  FERTILIZING = 'FERTILIZING',
  TRANSPLANTING = 'TRANSPLANTING'
}

export interface Schedule {
  frequency: Frequency;
  lastWatered: string | null;
  nextWateringDate?: string;
}

export interface CareEvent {
  id: string;
  type: CareEventType;
  timestamp: string;
  notes?: string;
  userId: string;
  amountLiters?: number;
  fertilizerType?: string;
  newPotSize?: string;
  soilType?: string;
}

export interface Plant {
  id: string;
  name: string;
  type?: string;
  tags?: string[];
  notes?: string;
  photoUrl?: string;
  schedule: Schedule;
  careHistory: CareEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface PlantRequest {
  name: string;
  type?: string;
  tags?: string[];
  notes?: string;
  photoUrl?: string;
  frequency: Frequency;
}

export interface CareEventRequest {
  type: CareEventType;
  notes?: string;
  additionalData?: {
    amount?: number;
    fertilizerType?: string;
    potSize?: string;
    soilType?: string;
  };
}

export interface PlantList {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  collaboratorIds: string[];
  plantIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PlantListRequest {
  name: string;
  description?: string;
}