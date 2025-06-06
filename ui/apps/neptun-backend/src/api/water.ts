import { WaterSourceStatus, WaterState, SourceType, SystemState, SystemStatus, WaterSource } from "@neptun/data-model"

const sources: WaterSource[] = [
    {
        id: "tank0",
        status: WaterSourceStatus.Unknown,
        name: "",
        type: SourceType.Tank,
        capacity: 0.2,
        water: {
            volume: 0.1,
            percentage: 0.5,
            state: WaterState.Full
        }
    },
    {
        id: "tank1",
        status: WaterSourceStatus.Unknown,
        name: "",
        type: SourceType.Tank,
        capacity: 0.3,
        water: {
            volume: 0.15,
            percentage: 0.5,
            state: WaterState.Empty
        }
    },
    {
        id: "well0",
        status: WaterSourceStatus.Unknown,
        name: "",
        type: SourceType.Well,
        capacity: 0,
        water: {
            volume: 0,
            percentage: 0,
            state: WaterState.Medium
        }
    }
];

export function getCurrentState(): SystemState {
    return {
        status: SystemStatus.Ready,
        sources
    };
}