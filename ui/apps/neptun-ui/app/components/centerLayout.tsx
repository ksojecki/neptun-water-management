import { ReactNode } from 'react';

type CenterLayoutProps = { children: ReactNode };

export const CenterLayout = ({ children }: CenterLayoutProps) => (
  <div className="h-dvh overflow-scroll">
    <div className="content-center h-[100%]">
      {children}
    </div>
  </div>
);
