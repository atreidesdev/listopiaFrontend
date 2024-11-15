import Link from 'next/link';
import React from 'react';
import styles from './logo.module.css';

export type LogoProps = {
  name: string;
  path: string;
};

export const Logo = ({ name, path }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${path === '/' && styles.active}`}
    >
      {name}
    </Link>
  );
};
