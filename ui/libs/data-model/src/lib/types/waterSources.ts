export type SourceType = 'well' | 'tank' | 'rain' | 'river' | 'lake';
export type WaterLevel = 'empty' | 'medium' | 'full';

export type WaterSource = Tank | Well | Rain | SurfaceWaterSource;

export interface Source {
  id: string;
  name: string;
  isConnected: boolean;
  type: SourceType;
}

export interface MeasurableSource extends Source {
  waterLevel: WaterLevel;
}

export interface Tank extends MeasurableSource {
  type: 'tank';
  isConnected: boolean;
  isRefilled: boolean;
  maxCapacity: number;
  filledCapacity: number;
}

export interface Well extends MeasurableSource {
  type: 'well';
}

export interface Rain extends Source {
  type: 'rain';
}

export interface SurfaceWaterSource extends Source {
  type: 'river' | 'lake';
}
