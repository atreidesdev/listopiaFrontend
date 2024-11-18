import { Theme } from '@/entities/theme/ui/theme';
import { ThemeProps } from '@/entities/theme/model/types';

type ThemeListProps = {
  themes: ThemeProps[];
};

export const ThemeList = (props: ThemeListProps) => {
  return (
    <h2>
      {props.themes.map((theme, index) => (
        <Theme
          key={theme.id}
          id={theme.id}
          name={theme.name}
          isLast={index === props.themes.length - 1}
        />
      ))}
    </h2>
  );
};
