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
    Filling = "Filling tanks"
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
    Unknown,
    Connected,
    Disconected,
    Refilling,
}

export enum WaterState {
    Empty = 'empty',
    Medium = 'medium',
    Full = 'fullś'
}
