import { apiPut } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

type UpdateEmailRequest = {
  email: string;
};

export const updateEmail = async (
  userId: string | number,
  { email }: UpdateEmailRequest,
): Promise<{ error?: string }> => {
  try {
    await apiPut(`user/${userId}/email`, { email });
    return {};
  } catch (error) {
    Sentry.captureException(error);
    return { error: 'Ошибка сервера' };
  }
};
