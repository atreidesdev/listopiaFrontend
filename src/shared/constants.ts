import { NavItemProps } from '@/shared/ui/navItem/navItem';

export const API_URL = 'https://atreidesdev-back-5763.twc1.net';

export const UPLOADS_URL = 'https://atreidesdev-back-5763.twc1.net/';

export const POSTER_PLACEHOLDER =
  'https://aimint.org/ap/wp-content/uploads/sites/18/2016/04/image-placeholder-vertical.jpg';

export const leftRoutes: Omit<NavItemProps, 'path'>[] = [
  { route: { route: 'content/games', label: 'Игры' } },
  { route: { route: 'content/books', label: 'Книги' } },
  { route: { route: 'content/movies', label: 'Синема' } },
  { route: { route: 'collections', label: 'Коллекции' } },
];

export const rightRoutes: Omit<NavItemProps, 'path'>[] = [
  { route: { route: 'auth/register', label: 'Регистрация' } },
  { route: { route: 'auth/login', label: 'Вход' } },
];
