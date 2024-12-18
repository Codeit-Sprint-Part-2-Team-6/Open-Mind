const theme = {
  gray: {
    10: '#FFFFFF',
    20: '#F9F9F9',
    30: '#CFCFCF',
    40: '#818181',
    50: '#515151',
    60: '#000000',
  },
  brown: {
    10: '#F5F1EE',
    20: '#E4D5C9',
    30: '#C7BBB5',
    40: '#542F1A',
    50: '#341909',
  },
  blue: '#1877F2',
  yellow: '#FEE500',
  red: '#B93333',
  shadows: {
    small: '0 4px 4px #8C8C8C40',
    medium: '0 4px 4px #00000040',
    large: '0 16px 20px #3030309E',
  },
  typography: {
    h1: {
      fontSize: '2.5rem', // 40px
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '2rem', // 32px
      fontWeight: 'bold',
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1.25rem', // 20px
      fontWeight: 'normal',
    },
    body1Bold: {
      fontSize: '1.25rem', // 20px
      fontWeight: 'bold',
    },
    body2: {
      fontSize: '1.125rem', // 18px
      fontWeight: 'normal',
    },
    body2Bold: {
      fontSize: '1.125rem', // 18px
      fontWeight: 'bold',
    },
    body3: {
      fontSize: '16px',
      fontWeight: 'normal',
    },
    body3Bold: {
      fontSize: '16px',
      fontWeight: 'bold',
    },
    caption1: {
      fontSize: '14px',
      fontWeight: 'normal',
    },
    caption1Medium: {
      fontSize: '14px',
      fontWeight: '500',
    },
    caption1Bold: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
    device: {
      mobileMx: `(max-width: 600px)`,
      tabletMx: `(max-width: 768px)`,
      laptopMx: `(max-width: 1024px)`,
      mobileMn: `(min-width: 600px)`,
      tabletMn: `(min-width: 768px)`,
      laptopMn: `(min-width: 1200px)`,
    },
  },
  mixBlendMode: 'normal',
};

const lightTheme = {
  ...theme,
  mixBlendMode: 'normal',
};

const darkTheme = {
  ...theme,
  mixBlendMode: 'difference',
};

export default theme;

export { lightTheme, darkTheme };
