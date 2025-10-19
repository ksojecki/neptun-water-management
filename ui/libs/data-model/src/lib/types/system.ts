import { WaterSource } from "./waterSources";

export type SystemState = {
    status: SystemStatus;
    sources: WaterSource[];
};

export type SystemStatus = 'Offline' | 'Ready' | 'NoWater' | 'FillingTanks';
