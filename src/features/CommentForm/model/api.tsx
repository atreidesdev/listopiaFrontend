import { apiPost } from '@/shared/api/fetch';
import * as Sentry from '@sentry/nextjs';

export type UserResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
  lastActivity: string;
  active: boolean;
  email: string;
  avatarPath: string | null;
  username: string;
  profileName: string;
  role: string;
};

export type CommentResponse = {
  id: number;
  createdAt: string;
  updatedAt: string;
  text: string;
  userId: number;
  parentId: number | null;
  user: UserResponse;
  replies: CommentResponse[];
};

export type CreateCommentRequest = {
  text: string;
  parentId?: number | null;
};

export const postComment = async (
  contentType: string,
  contentId: number,
  data: CreateCommentRequest,
): Promise<CommentResponse | null> => {
  try {
    const trimmedContentType = contentType.slice(0, -1);

    return await apiPost<CommentResponse>(
      `comments/${trimmedContentType}/${contentId}`,
      data,
    );
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};
