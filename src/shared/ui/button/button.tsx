import Image, { StaticImageData } from 'next/image';
import React from 'react';
import styles from './button.module.css';

export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  name?: string;
  icon?: string | StaticImageData;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export const Button = ({
  type = 'button',
  variant = 'primary',
  name,
  icon,
  onClick,
  className,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className || ''}`}
      disabled={disabled}
    >
      {icon ? <Image src={icon} alt="icon" className={styles.icon} /> : name}
    </button>
  );
};
