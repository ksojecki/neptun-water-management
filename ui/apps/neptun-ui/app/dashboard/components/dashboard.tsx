import { SystemStatusOverview } from './systemStatus';
import { WaterSource } from './waterSource';
import { SystemState } from '@neptun/data-model';

type DashboardProps = {
  systemState: SystemState;
};

export const Dashboard = ({ systemState }: DashboardProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 m-4">
        <SystemStatusOverview systemStatus={systemState.status} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {systemState.sources.map((source) => (
          <WaterSource key={source.id} source={source} />
        ))}
      </div>
    </div>
  );
};
