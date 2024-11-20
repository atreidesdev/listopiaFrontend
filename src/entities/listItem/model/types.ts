export type StatusCount = {
  planned: number;
  watched: number;
  watching: number;
  rewatching: number;
  postponed: number;
  dropped: number;
};

export type StatusCountByType = {
  books: StatusCount;
  movies: StatusCount;
  games: StatusCount;
};

export const statusOptions: Record<keyof StatusCount, string> = {
  planned: 'Запланировано',
  watched: 'Просмотрено',
  watching: 'Смотрю',
  rewatching: 'Пересматриваю',
  postponed: 'Отложено',
  dropped: 'Брошено',
};

export const typeSpecificTranslations: Record<
  string,
  Record<string, string>
> = {
  books: {
    planned: 'Запланировано',
    watched: 'Прочитано',
    watching: 'Читаю',
    rewatching: 'Перечитываю',
    postponed: 'Отложено',
    dropped: 'Брошено',
  },
  movies: statusOptions,
  games: {
    planned: 'Запланировано',
    watched: 'Пройдено',
    watching: 'Играю',
    rewatching: 'Перепрохожу',
    postponed: 'Отложено',
    dropped: 'Брошено',
  },
};

export const contentTypeTranslations: Record<
  'movies' | 'books' | 'games',
  string
> = {
  movies: 'Фильмы',
  books: 'Книги',
  games: 'Игры',
};
