import type theme from '@/styles/theme';

import '@emotion/react';

type GlobalTheme = typeof theme;
declare module '@emotion/react' {
  export interface Theme extends GlobalTheme {}
}
