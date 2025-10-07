import { WaterSource } from "./waterSources.js";

export type SystemState = {
    status: SystemStatus;
    sources: WaterSource[];
};

export type SystemStatus = 'Offline' | 'Ready' | 'NoWater' | 'FillingTanks';
