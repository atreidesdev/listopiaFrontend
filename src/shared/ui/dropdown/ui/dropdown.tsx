'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import styles from './dropdownMenu.module.css';

type DropdownProps = {
  children: ReactNode;
  menuItems: ReactNode[];
  showChildren: boolean;
};

export const Dropdown = ({
  children,
  menuItems,
  showChildren,
}: DropdownProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={styles.dropdownContainer}>
      {isMobile ? (
        <>
          {children}
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>{item}</React.Fragment>
          ))}
        </>
      ) : (
        <>
          {children}
          <div className={styles.menu}>
            {showChildren && children}
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>{item}</React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
