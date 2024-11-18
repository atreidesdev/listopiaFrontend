import { apiGet } from '@/shared/api/fetch';
import { Metadata } from 'next';
import * as Sentry from '@sentry/nextjs';

export const revalidate = 60;
export const dynamicParams = true;

type UserProfile = {
  username: string;
  profileName?: string;
  avatarPath: string;
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
      <h1>Профиль пользователя: {username}</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
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
