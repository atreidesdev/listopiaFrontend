'use client';
import { StoreWrapper } from '@/app/store/provider';
import { ReactNode } from 'react';
import styles from './layout.module.css';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <StoreWrapper>
      <main className={styles.main}>{children}</main>
    </StoreWrapper>
  );
}
