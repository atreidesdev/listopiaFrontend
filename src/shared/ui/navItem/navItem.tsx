import Link from 'next/link';
import React from 'react';
import styles from './navitem.module.css';

type Route = {
  route: string;
  label: string;
};

export type NavItemProps = {
  route: Route;
  path: string;
};

export const NavItem = ({ route, path }: NavItemProps) => {
  const isActive = path.startsWith(route.route);

  return (
    <li className={styles.navItem}>
      <Link
        href={`/${route.route}`}
        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        {route.label}
      </Link>
    </li>
  );
};
