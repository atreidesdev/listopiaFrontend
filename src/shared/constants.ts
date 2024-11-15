import { NavItemProps } from '@/shared/ui/navItem/navItem';

export const API_URL = 'http://localhost:3001';

export const UPLOADS_URL = 'http://localhost:3001/';

export const leftRoutes: Omit<NavItemProps, 'path'>[] = [
  { route: { route: 'content/games', label: 'Games' } },
  { route: { route: 'content/books', label: 'Books' } },
  { route: { route: 'content/movies', label: 'Movies' } },
];

export const rightRoutes: Omit<NavItemProps, 'path'>[] = [
  { route: { route: '/auth/register', label: 'Register' } },
  { route: { route: '/auth/login', label: 'Login' } },
];
