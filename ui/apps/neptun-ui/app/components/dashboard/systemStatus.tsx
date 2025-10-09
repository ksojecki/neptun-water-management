import { SystemStatus } from "@neptun/data-model";
import { FaRegCircleCheck } from "react-icons/fa6";

export function SystemStatusOverview(properties: { systemStatus: SystemStatus}) {
    const colours = properties.systemStatus === 'Ready' ? 'bg-base-300 text-base-content' :
        properties.systemStatus === 'FillingTanks' ? 'bg-info text-info-content' :
        properties.systemStatus === 'NoWater' ? 'bg-warning text-warning-content' :
        properties.systemStatus === 'Offline' ? 'bg-error text-error-content' : '';
    const baseClasses = `${colours} rounded-xl p-4 flex gap-4`
    return <div className={baseClasses}>
        <div className='grow'>
            <h1 className='text-xl'><b>{properties.systemStatus}</b></h1>
        </div>
        <div className='flex-none'>
            <FaRegCircleCheck size="3rem"/>
        </div>
    </div>
}
