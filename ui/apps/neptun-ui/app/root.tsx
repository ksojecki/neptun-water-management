import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type MetaFunction,
  type LinksFunction,
} from 'react-router';
import { AuthenticationProvider } from './api/authentication';
import { CenterLayout } from '@ui/layout/centerLayout';

export const meta: MetaFunction = () => [
  {
    title: 'Neptun',
  },
];

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="styles.css" rel="stylesheet"></link>
        <Meta />
        <Links />
      </head>
      <body className='h-dvh'>
      <div className="app-navigation"></div>
        <CenterLayout>
          <AuthenticationProvider>
          {children}
          </AuthenticationProvider>
        </CenterLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
