// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { SystemState } from '@neptun/data-model';
import { JSX, useEffect, useState } from 'react';
import { WaterSourceOverview } from './water-source';
import { SystemStatusOverview } from './system-status';

export function App() {
  const [waterStatus, setWaterStatus] = useState<SystemState | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
      fetch('http://localhost:3333/api/water')
        .then(response => response.json() as Promise<SystemState>)
        .then(status => {
          setWaterStatus(status);
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error fetching water status:', error);
          setWaterStatus(null);
          setIsLoading(false);
        });
      }, [waterStatus, setWaterStatus]);

  return (
    waterStatus ? <div className='h-dvh grid content-center p-4'> 
      <div className="object-center grid grid-cols-1 p-4">
        <SystemStatusOverview systemStatus={waterStatus.status} />
      </div>
      <div className='flex p-4 gap-4'>
        { waterStatus?.sources.map(source => <WaterSourceOverview className="basis-1/3" key={source.id} source={source} />) }
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
