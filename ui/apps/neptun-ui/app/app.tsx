// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { SystemState } from '@neptun/data-model';
import { useEffect, useState } from 'react';
import { FcOk } from "react-icons/fc";

export function App() {
  const [waterStatus, setWaterStatus] = useState<SystemState | null>(null);
  useEffect(() => {
      fetch('http://localhost:3333/api/water')
        .then(response => response.json() as Promise<SystemState>)
        .then(status => setWaterStatus(status));
  }, [waterStatus, setWaterStatus]);
  return (
    <div className='h-dvh grid content-center p-4'>
      <div className="object-center bg-neutral rounded-full grid grid-cols-1 p-4">
        <div className='rounded-ful bg-success p-4 text-success-content rounded-full flex'>
          <div className='p-4 grow'>
            <h1 className='text-xl'>System is <b>{waterStatus?.status}</b></h1>
          </div>
          <div>
            <FcOk size={60}></FcOk>
          </div>
        </div>
      </div>
      <div className='flex p-4 gap-4'>
        { waterStatus?.sources.map(source => 
          <div className='bg-success text-success-content p-4 rounded-full'>
            <h1 className='text-xl'>{source.type}</h1>
            <p>Source is <b>{source.water.state}</b></p>
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
