'use client';
import { LogoProps } from '@/shared/ui/logo/logo';
import { NavItemProps } from '@/shared/ui/navItem/navItem';
import NavBar from '@/widgets/Navbar/ui/Navbar';
import { useState } from 'react';
import styles from './NavBarWrapper.module.css';

type NavBarWrapperProps = {
  logo?: Omit<LogoProps, 'path'>;
  leftRoutes?: Omit<NavItemProps, 'path'>[];
  rightRoutes?: Omit<NavItemProps, 'path'>[];
};

const NavBarWrapper = ({
  leftRoutes,
  rightRoutes,
  logo,
}: NavBarWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navBarWrapper}>
      <button
        className={`${styles.burgerButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span className={styles.burgerIcon}>☰</span>
      </button>
      <div className={`${styles.navBar} ${isOpen ? styles.open : ''}`}>
        <NavBar leftRoutes={leftRoutes} rightRoutes={rightRoutes} logo={logo} />
      </div>
    </div>
  );
};

export default NavBarWrapper;
