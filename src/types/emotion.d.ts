import '@emotion/react';
import theme from '@/styles/theme';

type GlobalTheme = typeof theme;
declare module '@emotion/react' {
  export interface Theme extends GlobalTheme {}
}
