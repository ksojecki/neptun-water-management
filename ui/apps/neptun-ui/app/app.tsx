// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { SystemState } from '@neptun/data-model';
import { useEffect, useState } from 'react';
import { WaterSourceOverview } from './water-source';
import { SystemStatusOverview } from './system-status';

export function App() {
  const [waterStatus, setWaterStatus] = useState<SystemState | null>(null);
  useEffect(() => {
      fetch('http://localhost:3333/api/water')
        .then(response => response.json() as Promise<SystemState>)
        .then(status => setWaterStatus(status));
  }, [waterStatus, setWaterStatus]);
  if (!waterStatus) {
    return <p>Loading...</p>
  }
  return (
    <div className='h-dvh grid content-center p-4'>
      <div className="object-center grid grid-cols-1 p-4">
        <SystemStatusOverview systemStatus={waterStatus.status} />
      </div>
      <div className='flex p-4 gap-4'>
        { waterStatus?.sources.map(source => <WaterSourceOverview key={source.id} source={source} />) }
      </div>
    </div>
  );
}

export default App;
