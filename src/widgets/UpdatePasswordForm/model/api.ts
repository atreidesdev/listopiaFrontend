import { apiPut } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

type UpdatePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export const updatePassword = async (
  userId: string | number,
  { currentPassword, newPassword }: UpdatePasswordRequest,
): Promise<{ error?: string }> => {
  try {
    await apiPut(`user/${userId}/password`, {
      currentPassword,
      newPassword,
    });
    return {};
  } catch (error) {
    Sentry.captureException(error);
    return { error: 'Ошибка сервера' };
  }
};
