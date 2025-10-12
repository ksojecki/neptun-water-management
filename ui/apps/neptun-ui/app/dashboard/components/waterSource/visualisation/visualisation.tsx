import { WaterSource } from '@neptun/data-model';
import { Rain, RadialLevel } from './levelIndicators';

type VisualStatusProps = { source: WaterSource };

export const Visualisation = ({ source }: VisualStatusProps) => {
  if (source.type === 'tank') {
    const percentage = (source.filledCapacity / source.maxCapacity) * 100;
    return <RadialLevel percentage={percentage} />;
  }
  if (source.type === 'well') {
    const percentage =
      source.waterLevel === 'empty'
        ? 0
        : source.waterLevel === 'medium'
        ? 50
        : 100;
    return (
      <RadialLevel
        percentage={percentage}
        label={source.waterLevel as string}
      />
    );
  }

  if (source.type === 'rain') {
    return <Rain isRaining={source.isConnected} />;
  }

  return <div></div>;
};
