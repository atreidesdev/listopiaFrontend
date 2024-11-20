import { apiPut } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

type UpdateProfileNameRequest = {
  profileName: string;
};

export const updateProfileName = async (
  userId: string | number,
  { profileName }: UpdateProfileNameRequest,
): Promise<{ error?: string }> => {
  try {
    await apiPut(`user/${userId}/profile-name`, { profileName });
    return {};
  } catch (error) {
    Sentry.captureException(error);
    return { error: 'Ошибка сервера' };
  }
};
