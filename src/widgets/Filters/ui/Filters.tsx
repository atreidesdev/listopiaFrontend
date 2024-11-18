import { GenreProps } from '@/entities/genre/model/types';
import { ThemeProps } from '@/entities/theme/model/types';
import styles from './Filters.module.css';
import { Button } from '@/shared/ui/button/button';

type FiltersProps = {
  genres: GenreProps[];
  themes: ThemeProps[];
  selectedGenres: number[];
  selectedThemes: number[];
  onGenreChange: (id: number) => void;
  onThemeChange: (id: number) => void;
  onSearch: () => void;
};

export function Filters({
  genres,
  themes,
  selectedGenres,
  selectedThemes,
  onGenreChange,
  onThemeChange,
  onSearch,
}: FiltersProps) {
  const handleSearchClick = () => {
    onSearch();
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filterContainer}>
        <h3>Жанры</h3>
        {genres.map((genre) => (
          <label key={genre.id}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre.id)}
              onChange={() => onGenreChange(genre.id)}
            />
            {genre.name}
          </label>
        ))}
      </div>

      <div className={styles.filterContainer}>
        <h3>Темы</h3>
        {themes.map((theme) => (
          <label key={theme.id}>
            <input
              type="checkbox"
              checked={selectedThemes.includes(theme.id)}
              onChange={() => onThemeChange(theme.id)}
            />
            {theme.name}
          </label>
        ))}
      </div>
      <div>
        <Button onClick={handleSearchClick} name={'Искать'}></Button>
      </div>
    </div>
  );
}
