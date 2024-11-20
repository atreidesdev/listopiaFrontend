import { apiPost } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

export const createCollection = async (
  formData: FormData,
): Promise<{ error?: string }> => {
  try {
    await apiPost(`collection`, formData, {});
    return {};
  } catch (error) {
    Sentry.captureException(error);
    return { error: 'Ошибка сервера при создании коллекции' };
  }
};
