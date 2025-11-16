import { WaterSource as WaterSourceDto } from '@neptun/data-model';
import { JSX } from 'react';
import { TankStateDescription } from './tankStateDescription';
import { Visualisation } from './visualisation';

export function WaterSource(properties: {
  source: WaterSourceDto;
  className?: string;
}): JSX.Element {
  const source = properties.source;
  const colours =
    source.type === 'rain' && source.isConnected
      ? 'bg-info text-info-content'
      : source.isConnected
      ? 'bg-primary text-primary-content'
      : 'bg-base-300 text-base-content';
  const animation =
    (source.type === 'tank' && source.isRefilled) ||
    (source.type === 'rain' && source.isConnected)
      ? 'animate-pulse'
      : '';
  const defaultClasses = `${colours} ${animation} p-4 rounded-md`;

  return (
    <div className={[defaultClasses, properties.className].join(' ')}>
      <div className="flex">
        <div className="flex-auto">
          <h1 className="text-xl grow">{properties.source.name}</h1>
          {source.type === 'tank' && <TankStateDescription tank={source} />}
        </div>
        <div className="flex-none">
          <Visualisation source={source} />
        </div>
      </div>
    </div>
  );
}
