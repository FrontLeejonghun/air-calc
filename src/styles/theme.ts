import { Theme } from '@emotion/react';

const colors = {
  purple: { '09': '#5E3DEA' },
  white: '#FFFFFF',
  red: '#E65052',
  gray: {
    '03': '#EFEFEF',
    '05': '#D7D7D7',
    11: '#262626',
  },
  green: '#00CF58',
};

const theme: Theme = {
  fonts: {
    size: {
      description: '0.875em',
    },
  },
  colors: {
    primary: colors.purple['09'],
    inactive: colors.gray['05'],
    disabled: colors.gray['03'],
    border: colors.gray['03'],
    white: colors.white,
    defaultBackground: colors.white,
  },
};

export default theme;
