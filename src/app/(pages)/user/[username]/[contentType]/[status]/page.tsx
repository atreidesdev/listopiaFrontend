'use client';

import { List } from '@/entities/listItem/ui/List';

type Props = {
  params: {
    contentType: 'movies' | 'books' | 'games';
    status: string;
    username: string;
  };
};

const ContentStatusPage = ({ params }: Props) => {
  const { contentType, status, username } = params;

  return <List contentType={contentType} status={status} username={username} />;
};

export default ContentStatusPage;
