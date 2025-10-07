import { Tank, WaterSource } from "@neptun/data-model";
import { JSX } from "react";
import { FaRegSun, FaCloudRain } from "react-icons/fa6";

export function WaterSourceOverview(properties: { source: WaterSource, className?: string }): JSX.Element {
    const source = properties.source;
    const colours = source.type === 'rain' && source.isConnected ? 'bg-info text-info-content' :
        source.isConnected ? 'bg-primary text-primary-content' : 'bg-base-300 text-base-content';
    const animation = (source.type === 'tank' && source.isRefilled) || (
        source.type === 'rain' && source.isConnected
    ) ? 'animate-pulse' : '';
    const defaultClasses = `${colours} ${animation} p-4 rounded-md`;

    return (
        <div className={[defaultClasses, properties.className].join(' ')}>
            <div className="flex">
                <div className="flex-auto">
                    <h1 className='text-xl grow'>{properties.source.name}</h1>
                    { source.type === 'tank'&& <TankDetails tank={source} /> }
                </div>
                <div className="flex-none">
                    <SidePanel source={source} />
                </div>
            </div>
        </div>
    )
}

export function SidePanel( properties: { source: WaterSource }): JSX.Element {
    const source = properties.source;
    if (source.type === 'tank') {
        const percentage = source.filledCapacity / source.maxCapacity * 100;
        return <WaterLevelDisplay percentage={percentage} />
    }
    if (source.type === 'well') {
        const percentage = source.waterLevel === 'empty' ? 0 :
            source.waterLevel === 'medium' ? 50 : 100;
        return <WaterLevelDisplay percentage={percentage} label={source.waterLevel as string}/>
    }

    if (source.type === 'rain') {
        return <RainStatus isRaining={source.isConnected} />
    }

    return <div></div>
}

export function WaterLevelDisplay(properties: { percentage: number, label?: string }): JSX.Element {
    const label = properties.label || `${Math.round(properties.percentage)}%`;
    return <div className="radial-progress" style={{ "--value": properties.percentage, '--size': '7rem' } as React.CSSProperties  }
        aria-valuenow={properties.percentage} role="progressbar">{label}</div>
}

export function RainStatus(properties: { isRaining: boolean }): JSX.Element {
    return properties.isRaining ? <FaCloudRain className="size-[7rem]"/> : <FaRegSun className="size-[7rem]"/>
}

export function TankDetails(properties: { tank: Tank }): JSX.Element {
    const tank = properties.tank;
    return <div className="flex flex-col">
        <div className="text-sm">Capacity: {tank.maxCapacity} m³</div>
        <div className="text-sm">Filled: {tank.filledCapacity} m³</div>
        { tank.isRefilled && <div className="badge badge-info mt-2">Filling in progress</div> }
    </div>
}
