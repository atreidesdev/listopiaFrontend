'use client';
import { useEffect, useState } from 'react';
import styles from './Comments.module.css';
import { getComments } from '@/widgets/Comments/model/api';
import { Pagination } from '@/widgets/Pagination/ui/Pagination';
import { CommentForm } from '@/features/CommentForm/ui/CommentForm';
import { authStore } from '@/shared/auth/authStore'; // Import the authStore to check for the token

type User = {
  id: number;
  username: string;
  profileName: string;
};

type Comment = {
  id: number;
  text: string;
  createdAt: string;
  user: User;
};

type CommentsListProps = {
  contentId: number;
  contentType: 'movies' | 'books' | 'games';
};

export const Comments = ({ contentId, contentType }: CommentsListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await getComments(contentType, contentId, currentPage);
      if (data) {
        setComments(data.comments);
        setHasNextPage(data.currentPage < data.totalPages);
      }
    };

    fetchComments();
  }, [contentId, contentType, currentPage]);

  useEffect(() => {
    setIsAuthenticated(authStore.hasToken());
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.commentsContainer}>
      <h2>Комментарии</h2>

      {isAuthenticated ? (
        <CommentForm contentType={contentType} contentId={contentId} />
      ) : (
        <p>Пожалуйста, войдите, чтобы оставить комментарий.</p>
      )}

      {comments.length > 0 ? (
        <div className={styles.Messeges}>
          {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.username}>
                  {comment.user.profileName || comment.user.username}
                </span>
                <span className={styles.createdAt}>
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Нет комментариев для этого контента.</p>
      )}

      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
