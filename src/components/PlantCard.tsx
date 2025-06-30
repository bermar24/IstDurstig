import React from 'react';
import { Plant, CareEventType } from '../types';
import { 
  Droplets, 
  Calendar, 
  Tag, 
  Clock,
  Scissors,
  Zap
} from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onWater?: (plantId: string) => void;
  onEdit?: (plant: Plant) => void;
  showActions?: boolean;
}

const PlantCard: React.FC<PlantCardProps> = ({ 
  plant, 
  onWater, 
  onEdit, 
  showActions = true 
}) => {
  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'FREQUENT':
        return 'Every 2 days';
      case 'MEDIUM':
        return 'Every 5 days';
      case 'RARE':
        return 'Every 10 days';
      default:
        return 'Unknown';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'FREQUENT':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'RARE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const needsWatering = () => {
    if (!plant.schedule.lastWatered) return true;
    
    const lastWatered = new Date(plant.schedule.lastWatered);
    const now = new Date();
    const daysSinceWatered = Math.floor((now.getTime() - lastWatered.getTime()) / (1000 * 60 * 60 * 24));
    
    const frequencyDays = plant.schedule.frequency === 'FREQUENT' ? 2 : 
                         plant.schedule.frequency === 'MEDIUM' ? 5 : 10;
    
    return daysSinceWatered >= frequencyDays;
  };

  const getLastCareEvent = () => {
    if (!plant.careHistory || plant.careHistory.length === 0) return null;
    return plant.careHistory[plant.careHistory.length - 1];
  };

  const getCareEventIcon = (type: CareEventType) => {
    switch (type) {
      case CareEventType.WATERING:
        return <Droplets className="h-4 w-4" />;
      case CareEventType.FERTILIZING:
        return <Zap className="h-4 w-4" />;
      case CareEventType.TRANSPLANTING:
        return <Scissors className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const lastCareEvent = getLastCareEvent();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Plant Image */}
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        {plant.photoUrl ? (
          <img
            src={plant.photoUrl}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Droplets className="h-16 w-16 text-gray-400" />
          </div>
        )}
        {needsWatering() && (
          <div className="absolute top-2 right-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Needs Water
            </div>
          </div>
        )}
      </div>

      {/* Plant Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{plant.name}</h3>
          {showActions && onEdit && (
            <button
              onClick={() => onEdit(plant)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
        </div>

        {plant.type && (
          <p className="text-sm text-gray-600 mb-2">{plant.type}</p>
        )}

        {/* Frequency Badge */}
        <div className="flex items-center mb-3">
          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getFrequencyColor(plant.schedule.frequency)}`}>
            {getFrequencyText(plant.schedule.frequency)}
          </span>
        </div>

        {/* Tags */}
        {plant.tags && plant.tags.length > 0 && (
          <div className="flex items-center mb-3">
            <Tag className="h-4 w-4 text-gray-400 mr-2" />
            <div className="flex flex-wrap gap-1">
              {plant.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
              {plant.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                  +{plant.tags.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Last Care Event */}
        {lastCareEvent && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            {getCareEventIcon(lastCareEvent.type)}
            <span className="ml-2">
              Last {lastCareEvent.type.toLowerCase()} on{' '}
              {new Date(lastCareEvent.timestamp).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Notes */}
        {plant.notes && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{plant.notes}</p>
        )}

        {/* Actions */}
        {showActions && onWater && (
          <div className="flex space-x-2">
            <button
              onClick={() => onWater(plant.id)}
              className={`flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white transition-colors duration-200 ${
                needsWatering()
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              } focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <Droplets className="h-4 w-4 mr-2" />
              {needsWatering() ? 'Water Now' : 'Water'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantCard;