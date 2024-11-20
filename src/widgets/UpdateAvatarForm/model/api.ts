import { apiPut } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

export const updateAvatar = async (
  userId: string | number,
  avatar: File,
): Promise<{ error?: string }> => {
  const formData = new FormData();
  formData.append('avatar', avatar);

  try {
    await apiPut(`user/${userId}/avatar`, formData);
    return {};
  } catch (error) {
    Sentry.captureException(error);
    return { error: 'Ошибка сервера при обновлении аватара' };
  }
};
