'use client';
import { StoreWrapper } from '@/app/store/provider';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authStore } from '@/shared/auth/authStore';
import styles from './layout.module.css';

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (authStore.hasToken()) {
      router.push('/');
    }
  }, [router]);

  return (
    <StoreWrapper>
      <main className={styles.main}>{children}</main>
    </StoreWrapper>
  );
}
