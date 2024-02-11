import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';

import theme from '@/styles/theme';

import '@/styles/reset.css';
import '@/styles/fonts.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <div />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
