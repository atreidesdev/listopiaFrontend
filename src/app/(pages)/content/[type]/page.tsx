'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { CardList } from '@/shared/ui/card/ui/cardList';
import { CardProps } from '@/shared/ui/card/ui/card';
import { Loader } from '@/shared/ui/loader/loader';
import { Pagination } from '@/widgets/Pagination/ui/Pagination';
import styles from './page.module.css';
import {
  fetchDataByType,
  fetchGenres,
  fetchHasNextPage,
  fetchThemes,
} from '@/app/(pages)/content/[type]/api';
import { ThemeProps } from '@/entities/theme/model/types';
import { GenreProps } from '@/entities/genre/model/types';
import { Filters } from '@/widgets/Filters/ui/Filters';
import * as Sentry from '@sentry/nextjs';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 12;

type PageProps = {
  params: { type: string };
};

export default function ContentByTypePage({ params }: PageProps) {
  const { type } = params;
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState<CardProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [themes, setThemes] = useState<ThemeProps[]>([]);

  const [selectedFilterGenres, setSelectedFilterGenres] = useState<number[]>(
    [],
  );
  const [selectedFilterThemes, setSelectedFilterThemes] = useState<number[]>(
    [],
  );

  const page = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);
  const pageSize = parseInt(
    searchParams.get('pageSize') || `${DEFAULT_PAGE_SIZE}`,
    10,
  );

  const parseFilters = useCallback(() => {
    const parseParam = (param: string | null) =>
      param ? param.split(',').map(Number) : [];

    return {
      genres: parseParam(searchParams.get('genres')),
      themes: parseParam(searchParams.get('themes')),
    };
  }, [searchParams]);

  useEffect(() => {
    const { genres, themes } = parseFilters();
    setSelectedFilterGenres(genres);
    setSelectedFilterThemes(themes);
  }, [parseFilters]);

  const fetchData = useCallback(
    async (page: number, genres: number[], themes: number[]) => {
      setLoading(true);
      try {
        const [result, nextPageAvailable] = await Promise.all([
          fetchDataByType(type, page, pageSize, genres, themes),
          fetchHasNextPage(type, page, pageSize, genres, themes),
        ]);
        setData(result);
        setHasNextPage(nextPageAvailable);
      } catch (error) {
        setData(null);
        Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    },
    [type, pageSize],
  );

  useEffect(() => {
    const { genres, themes } = parseFilters();
    fetchData(page, genres, themes);
  }, [fetchData, page, parseFilters]);

  const fetchFilters = useCallback(async () => {
    try {
      const [genresData, themesData] = await Promise.all([
        fetchGenres(type),
        fetchThemes(type),
      ]);
      setGenres(genresData);
      setThemes(themesData);
    } catch (error) {
      Sentry.captureException(error);
    }
  }, [type]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const updateURLParams = useCallback(
    (newPage: number = DEFAULT_PAGE) => {
      const params = new URLSearchParams();
      params.set('page', `${newPage}`);
      params.set('pageSize', `${DEFAULT_PAGE_SIZE}`);

      if (selectedFilterGenres.length) {
        params.set('genres', selectedFilterGenres.join(','));
      }
      if (selectedFilterThemes.length) {
        params.set('themes', selectedFilterThemes.join(','));
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, selectedFilterGenres, selectedFilterThemes],
  );

  const handleSearch = () => {
    updateURLParams();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.page}>
      <Filters
        genres={genres}
        themes={themes}
        selectedGenres={selectedFilterGenres}
        selectedThemes={selectedFilterThemes}
        onGenreChange={(id) =>
          setSelectedFilterGenres((prev) =>
            prev.includes(id)
              ? prev.filter((gid) => gid !== id)
              : [...prev, id],
          )
        }
        onThemeChange={(id) =>
          setSelectedFilterThemes((prev) =>
            prev.includes(id)
              ? prev.filter((tid) => tid !== id)
              : [...prev, id],
          )
        }
        onSearch={handleSearch}
      />
      <div className={styles.content}>
        {data ? <CardList cards={data} /> : <p>Ошибка загрузки данных</p>}
        <Pagination
          currentPage={page}
          hasNextPage={hasNextPage}
          onPageChange={(newPage) => updateURLParams(newPage)}
        />
      </div>
    </div>
  );
}
