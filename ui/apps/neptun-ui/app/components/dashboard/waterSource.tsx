import { WaterSource } from "@neptun/data-model";
import { JSX } from "react";
import { Rain } from "./sourceStates/rain";
import { RadialLevel } from './sourceStates/radialLevel';
import { Details } from './sourceStates/details';

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
                    { source.type === 'tank'&& <Details tank={source} /> }
                </div>
                <div className="flex-none">
                    <VisualStatus source={source} />
                </div>
            </div>
        </div>
    )
}

export function VisualStatus(properties: { source: WaterSource }): JSX.Element {
    const source = properties.source;
    if (source.type === 'tank') {
        const percentage = source.filledCapacity / source.maxCapacity * 100;
        return <RadialLevel percentage={percentage} />
    }
    if (source.type === 'well') {
        const percentage = source.waterLevel === 'empty' ? 0 :
            source.waterLevel === 'medium' ? 50 : 100;
        return <RadialLevel percentage={percentage} label={source.waterLevel as string}/>
    }

    if (source.type === 'rain') {
        return <Rain isRaining={source.isConnected} />
    }

    return <div></div>
}


