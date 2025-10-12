import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./dashboard/dashboardPage.tsx'),
  route('/login', './authentication/loginPage.tsx'),
] satisfies RouteConfig;
