'use client';
import { useStores } from '@/app/store/useStore';
import { UPLOADS_URL } from '@/shared/constants';
import { Avatar } from '@/shared/ui/avatar/ui/avatar';
import { Dropdown } from '@/shared/ui/dropdown/ui/dropdown';
import { Logo, LogoProps } from '@/shared/ui/logo/logo';
import { NavItem, NavItemProps } from '@/shared/ui/navItem/navItem';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

type Props = {
  logo?: Omit<LogoProps, 'path'>;
  leftRoutes?: Omit<NavItemProps, 'path'>[];
  rightRoutes?: Omit<NavItemProps, 'path'>[];
};

const NavBar = ({ logo, leftRoutes = [], rightRoutes = [] }: Props) => {
  const path = usePathname();
  const { authStore } = useStores();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    authStore.clearTokens();
    window.location.href = '/';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        {logo && <Logo name={logo.name} path={path} />}
        {leftRoutes.map((route) => (
          <NavItem key={route.route.route} {...route} path={path} />
        ))}
      </div>
      <div className={styles.navbarRight}>
        {isClient && authStore.hasToken() ? (
          <Dropdown
            menuItems={[
              <NavItem
                key="settings"
                path={path}
                route={{
                  route: `settings`,
                  label: 'Настройки',
                }}
              />,
              <NavItem
                key="collections"
                path={path}
                route={{
                  route: `user/${authStore.username}/collections`,
                  label: 'Коллекции',
                }}
              />,
              <NavItem
                path={path}
                key="logout"
                route={{
                  route: '/',
                  label: 'Выйти',
                }}
                shouldHighlightActive={false}
                onClick={handleLogout}
              />,
            ]}
            showChildren={true}
          >
            <Avatar
              avatarPath={
                authStore.avatar
                  ? String(UPLOADS_URL + authStore.avatar)
                  : 'https://cdn.prod.website-files.com/65b3cc40daa94fa5529af155/65b3cc40daa94fa5529af285_Bryan-image%20(1).jpeg'
              }
              size={50}
              username={authStore.username || 'Username'}
              profileName={authStore.profileName || 'Profile Name'}
            />
          </Dropdown>
        ) : (
          rightRoutes.map((route) => (
            <NavItem key={route.route.route} {...route} path={path} />
          ))
        )}
      </div>
    </nav>
  );
};

export default NavBar;
