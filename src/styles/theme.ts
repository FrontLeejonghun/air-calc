const colors = {
  purple: {
    '01': '#F4F5FF',
    '02': '#E8EAFC',
    '03': '#D6DAFF',
    '05': '#729DFF',
    '06': '#8F8AF9',
    '07': '#786EF5',
    '08': '#6953F1',
    '09': '#5E3DEA',
    '10': '#4D27DB',
    '11': '#3B1ABF',
  },
  white: '#FFFFFF',
  red: '#E65052',
  gray: {
    '01': '#F9F9F9',
    '02': '#f4f4f4',
    '03': '#EFEFEF',
    '04': '#E9E9E9',
    '05': '#D7D7D7',
    '06': '#BCBCBC',
    '07': '#999999',
    '08': '#7B7B7B',
    '09': '#595959',
    '10': '#434343',
    '11': '#262626',
  },
  orange: '#FFBE1C',
  green: {
    '01': '#E6F7EC',
    '02': '#00CF58',
    '03': '#03933B',
  },
  yellow: {
    '01': '#FFC255',
    '04': '#FFBE1C',
  },
  pink: {
    '01': '#FFF1F1',
    '02': '#FFEBEB',
    '05': '#F09091',
  },
  error: {
    red: '#E65052',
  },
  black: '#000000',
} as const;

const theme = {
  breakpoints: {
    mobile: '430px',
    tablet: '768px',
  },
  padding: {
    layout: '20px',
  },
  fonts: {
    weight: {
      thin: 200,
      regular: 400,
      bold: 600,
      extraBold: 700,
    },
    size: {
      h1: '28px',
      h2: '24px',
      h3: '22px',
      h4: '20px',
      h5: '18px',
      p1: '16px',
      p2: '14px',
      p3: '12px',
      p4: '11px',
    },
  },
  colors: {
    ...colors,
    primary: {
      default: colors.purple['09'],
      mindcare: colors.purple['09'],
      routine: colors.purple['09'],
    },
    inactive: colors.gray['03'],
    disabled: colors.gray['05'],
    text: colors.gray['11'],
  },
} as const;

export default theme;
