import { WaterSource } from "./waterSources.js";

export type SystemState = {
    status: SystemStatus;
    sources: WaterSource[];
};

export enum SystemStatus {
    Offline = "Offline",
    Ready = "Ready",
    NoWater = "No water",
    Filling = "Filling tanks"
}