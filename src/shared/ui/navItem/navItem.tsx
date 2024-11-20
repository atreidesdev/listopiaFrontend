import Link from 'next/link';
import React from 'react';
import styles from './navItem.module.css';

type Route = {
  route: string;
  label: string;
};

export type NavItemProps = {
  route: Route;
  path: string;
  onClick?: () => void;
  shouldHighlightActive?: boolean;
  shouldScaleOnHover?: boolean;
};

export const NavItem = ({
  route,
  path,
  onClick,
  shouldHighlightActive = true,
  shouldScaleOnHover = true,
}: NavItemProps) => {
  const isActive = shouldHighlightActive && path.includes(route.route);

  return (
    <li
      className={`${styles.navItem} ${
        shouldScaleOnHover ? styles.hoverScale : ''
      }`}
      onClick={onClick}
    >
      <Link
        href={`/${route.route}`}
        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        {route.label}
      </Link>
    </li>
  );
};
