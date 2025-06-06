import { WaterSource } from "@neptun/data-model";

export function WaterSourceOverview(properties: { source: WaterSource }) {
    const percentage = Math.round(properties.source.water.percentage * 100);
    return (
        <div className='bg-success text-success-content p-4 rounded-md'>
            <div className="grid grid-cols-3">
                <div>
                    <h1 className='text-xl'>{properties.source.type}</h1>
                    <p>Source is <b>{properties.source.water.state}</b></p>
                </div>
                <div>
                    <div className="radial-progress" style={{ "--value": percentage } as React.CSSProperties  } 
                        aria-valuenow={percentage} role="progressbar">{percentage}%</div>
                </div>
            </div>
        
        </div> 
    )
}