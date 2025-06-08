import { SourceType, SystemState, SystemStatus, WaterLevel, WaterSource } from "@neptun/data-model"

const sources: WaterSource[] = [
    {
        name: 'Rain',
        id: "rain",
        type: SourceType.Rain,
        isConnected: true
    },
    {
        id: "tank0",
        isConnected: false,
        isRefilled: true,
        name: "Main Tank",
        type: SourceType.Tank,
        waterLevel: WaterLevel.Medium,
        maxCapacity: 0.3,
        filledCapacity: 0.14
    },
    {
        id: "well0",
        isConnected: true,
        name: "Well",
        type: SourceType.Well,
        waterLevel: WaterLevel.Full
    }
];

export function getCurrentState(): SystemState {
    return {
        status: SystemStatus.Ready,
        sources
    };
}