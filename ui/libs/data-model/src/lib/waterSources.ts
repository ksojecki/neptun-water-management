export type WaterSource = Tank | Well | Rain | SurfaceWaterSource;

export enum SourceType {
    Well = "well",
    Tank = "tank",
    Rain = "rain",
    River = "river",
    Lake = "lake"
}

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
    type: SourceType.Tank;
    isConnected: boolean;
    isRefilled: boolean;
    maxCapacity: number;
    filledCapacity: number;
}

export interface Well extends MeasurableSource {
    type: SourceType.Well;
}

export interface Rain extends Source {
    type: SourceType.Rain;
}

export interface SurfaceWaterSource extends Source {
    type: SourceType.River | SourceType.Lake;
}

export enum WaterLevel {
    Empty = 'empty',
    Medium = 'medium',
    Full = 'full'
}
