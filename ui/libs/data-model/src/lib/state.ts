export type SystemState = {
    status: SystemStatus;
    sources: WaterSource[];
};

export enum SourceType {
    Well = "well",
    Tank = "tank",
    Rain = "rain"
}

export enum SystemStatus {
    Offline = "offline",
    Ready = "ready",
    NoWater = "no water",
    Filling = "filling tanks"
}

export type WaterSource = {
    id: string;
    status: WaterSourceStatus;
    name: string;
    type: SourceType;
    capacity: number;
    water: {
        volume: number;
        percentage: number;
        state: WaterState;
    };
}

export enum WaterSourceStatus {
    Unknown = 'unknown',
    Connected = 'connected',
    Disconected = 'disconnected',
    Refilling = 'refilling'
}

export enum WaterState {
    Empty = 'empty',
    Medium = 'medium',
    Full = 'full'
}
