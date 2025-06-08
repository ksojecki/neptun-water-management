import { SystemStatus } from "@neptun/data-model";
import { FaRegCircleCheck } from "react-icons/fa6";

export function SystemStatusOverview(properties: { systemStatus: SystemStatus}) {
    const colours = properties.systemStatus === SystemStatus.Ready ? 'bg-base-300 text-base-content' :
        properties.systemStatus === SystemStatus.Filling ? 'bg-info text-info-content' :
        properties.systemStatus === SystemStatus.NoWater ? 'bg-warning text-warning-content' :
        properties.systemStatus === SystemStatus.Offline ? 'bg-error text-error-content' : '';  
    const baseClases = `${colours} rounded-xl p-4 flex gap-4`
    return <div className={baseClases}>
        <div className='grow'>
            <h1 className='text-xl'><b>{properties.systemStatus}</b></h1>
        </div>
        <div className='flex-none'>
            <FaRegCircleCheck size="3rem"/>
        </div>
    </div>
}