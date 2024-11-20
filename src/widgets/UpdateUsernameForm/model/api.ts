import { apiPut } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

type UpdateUsernameRequest = {
  username: string;
};

export const updateUsername = async (
  userId: string | number,
  { username }: UpdateUsernameRequest,
): Promise<{ error?: string }> => {
  try {
    await apiPut(`user/${userId}/username`, { username });
    return {};
  } catch (error) {
    Sentry.captureException(error);
    return { error: 'Ошибка сервера' };
  }
};
