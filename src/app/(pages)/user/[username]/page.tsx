import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';
import * as Sentry from '@sentry/nextjs';
import Lists from '@/widgets/Lists/ui/Lists';
import Image from 'next/image';
import { POSTER_PLACEHOLDER, UPLOADS_URL } from '@/shared/constants';
import { NavItem } from '@/shared/ui/navItem/navItem';
import styles from './page.module.css';
import { StatusCountByType } from '@/entities/listItem/model/types';

export const revalidate = 60;
export const dynamicParams = true;

export type UserProfile = {
  username: string;
  profileName?: string;
  avatarPath: string | null;
  bookCount: number;
  movieCount: number;
  gameCount: number;
  statusCount: StatusCountByType;
};

type PageProps = {
  params: { username: string };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = params;
  try {
    const user = await apiGet<UserProfile>(`user/profile/${username}`);
    if (user) {
      return {
        title: `${user.profileName || user.username} - Профиль пользователя`,
        description: `Страница профиля пользователя ${user.profileName || user.username}.`,
      };
    }
  } catch (error) {
    Sentry.captureException(error);
  }

  return {
    title: 'Пользователь не найден',
    description: 'Не удалось загрузить данные для профиля пользователя.',
  };
}

export default async function UserByUsernamePage({ params }: PageProps) {
  const { username } = params;
  let userData: UserProfile | null = null;

  try {
    userData = await apiGet<UserProfile>(`user/profile/${username}`);
  } catch (error) {
    Sentry.captureException(error);
  }

  return (
    <div>
      {userData ? (
        <div className={styles.page}>
          <div className={styles.bio}>
            <Image
              src={
                userData.avatarPath
                  ? UPLOADS_URL + userData.avatarPath
                  : POSTER_PLACEHOLDER
              }
              alt={userData.profileName || 'Avatar placeholder'}
              width={100}
              height={100}
              className={styles.avatar}
            />
            <h2>{userData.profileName || username}</h2>
            <NavItem
              route={{
                route: `user/${username}/collections`,
                label: `Коллекции`,
              }}
              path={''}
            />
          </div>
          <Lists {...userData.statusCount} username={username} />
        </div>
      ) : (
        <p>Ошибка загрузки профиля пользователя...</p>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const users = await apiGet<UserProfile[]>('user');

    return users.map((user) => ({
      username: user.username,
    }));
  } catch (error) {
    Sentry.captureException(error);
    return [];
  }
}
