import {
  ApiResponse,
  type SystemState,
  type WaterSource,
} from '@neptun/data-model';

const sources: WaterSource[] = [
  {
    name: 'Rain',
    id: 'rain',
    type: 'rain',
    isConnected: false,
  },
  {
    id: 'tank0',
    isConnected: false,
    isRefilled: true,
    name: 'Main Tank',
    type: 'tank',
    waterLevel: 'medium',
    maxCapacity: 0.3,
    filledCapacity: 0.14,
  },
  {
    id: 'well0',
    isConnected: true,
    name: 'Well',
    type: 'well',
    waterLevel: 'full',
  },
];

export function getCurrentState(): ApiResponse<SystemState> {
  return {
    type: 'success',
    data: {
      status: 'Ready',
      sources,
    },
  };
}
