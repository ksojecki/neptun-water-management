// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { SystemState } from '@neptun/data-model';
import { useEffect, useState } from 'react';

export function App() {
  const [waterStatus, setWaterStatus] = useState<SystemState | null>(null);
  useEffect(() => {
      fetch('http://localhost:3333/api/water')
        .then(response => response.json() as Promise<SystemState>)
        .then(status => setWaterStatus(status));
  }, [waterStatus, setWaterStatus]);
  return (
    <div>
        <h1>{waterStatus?.status}</h1>
    </div>
  );
}

export default App;
