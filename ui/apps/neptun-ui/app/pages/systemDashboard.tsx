// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { ReactNode } from 'react';
import { WaterSourceOverview } from '../components/dashboard/waterSource';
import { SystemStatusOverview } from '../components/dashboard/systemStatus';
import { useSystemState } from '../api/clientApi';

export function SystemDashboard() {
  const { systemState, queryState } = useSystemState();

  if ( queryState === 'loading' ) return <OnLoading />;
  if ( queryState === 'error' ) return <OnError />;


  return (
    <div className='h-[100%] grid overflow-scroll'>
      <div className='content-center'>
        <div className="grid grid-cols-1 m-4">
          <SystemStatusOverview systemStatus={systemState.status} />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4'>
          { systemState.sources.map(source => <WaterSourceOverview key={source.id} source={source} />) }
        </div>
      </div>
    </div>
  );
}

function OnLoading(): ReactNode {
  return <div className='content-center h-dvh'>
      <div className='object-center text-center'>
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    </div>
}

function OnError(): ReactNode {
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

export default SystemDashboard;
