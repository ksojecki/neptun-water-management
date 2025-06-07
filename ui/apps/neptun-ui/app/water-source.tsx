import { WaterSource } from "@neptun/data-model";

export function WaterSourceOverview(properties: { source: WaterSource, className?: string }) {
    const percentage = Math.round(properties.source.water.percentage * 100);
    const defaultClasses = 'bg-success text-success-content p-4 rounded-md'
    return (
        <div className={[defaultClasses, properties.className].join(' ')}>
            <div className="flex">
                <div className="flex-auto">
                    <h1 className='text-xl grow'>{properties.source.type}</h1>
                    <p>Source is <b>{properties.source.status}</b></p>
                </div>
                <div className="flex-none">
                    <div className="radial-progress" style={{ "--value": percentage } as React.CSSProperties  } 
                        aria-valuenow={percentage} role="progressbar">{percentage}%</div>
                </div>
            </div>
        </div> 
    )
}