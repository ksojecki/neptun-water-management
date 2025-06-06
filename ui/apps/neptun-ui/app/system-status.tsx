import { SystemStatus } from "@neptun/data-model";
import { FcOk } from "react-icons/fc";

export function SystemStatusOverview(properties: { systemStatus: SystemStatus}) {
    return <div className='rounded-xl bg-success p-4 text-success-content flex'>
        <div className='p-4 grow'>
            <h1 className='text-xl'>System is <b>{properties.systemStatus}</b></h1>
        </div>
        <div>
            <FcOk size={60}></FcOk>
        </div>
    </div>
}