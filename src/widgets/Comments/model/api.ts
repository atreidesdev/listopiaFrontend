import { apiGet } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';
import { CommentResponse } from '@/features/CommentForm/model/api';

export type GetCommentsResponse = {
  comments: CommentResponse[];
  totalPages: number;
  currentPage: number;
};

export const getComments = async (
  contentType: string,
  contentId: number,
  page: number = 1,
): Promise<GetCommentsResponse | null> => {
  try {
    const trimmedContentType = contentType.slice(0, -1);

    return await apiGet<GetCommentsResponse>(
      `comments/${trimmedContentType}/${contentId}?page=${page}`,
    );
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};
