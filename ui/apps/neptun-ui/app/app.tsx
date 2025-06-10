// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { SystemState } from '@neptun/data-model';
import { JSX, useEffect, useState } from 'react';
import { WaterSourceOverview } from './water-source';
import { SystemStatusOverview } from './system-status';
import { NeptunBackend } from './api/neptun-backend';

const neptunBackend = new NeptunBackend('http://localhost:3333/api');

export function App() {
  const [waterStatus, setWaterStatus] = useState<SystemState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    neptunBackend.getSystemState()
      .then(state => setWaterStatus(state))
      .catch(() => setWaterStatus(null))
      .finally(() => setIsLoading(false));
  }, [waterStatus, setWaterStatus]);

  return (
    waterStatus ? <div className='h-[100%] grid overflow-scroll'>
      <div className='content-center'>
        <div className="grid grid-cols-1 m-4">
          <SystemStatusOverview systemStatus={waterStatus.status} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4'>
          { waterStatus?.sources.map(source => <WaterSourceOverview key={source.id} source={source} />) }
        </div>
      </div>
    </div> :
    isLoading ? <OnLoading/> : <OnError />
  );
}

function OnLoading(): JSX.Element {
  return <div className='content-center h-dvh'>
      <div className='object-center text-center'>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    </div>
}

function OnError(): JSX.Element {
  return <div className='content-center h-dvh'>
      <div className='object-center grid grid-cols-1 p-4'>
        <div className='rounded-xl bg-error p-4 text-error-content'>
                <h1 className='text-3xl mb-4'><b>Error</b></h1>
                <div className='bg-neutral text-neutral-content p-4'>
                  <pre>Description</pre>
                </div>
            </div>
        </div>
      </div>
}

export default App;
