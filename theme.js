// eslint-disable-next-line import/prefer-default-export
import GolosTextVF from './public/fonts/Golos-Text_VF.woff2';

export const getDesignTokens = (mode) => ({
  components: {
    // Name of the component
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: '4px',
          marginLeft: 0,
          fontSize: '14px',
          lineHeight: '16px',
        },
      },
    },
    MuiInputBase: {
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            height: '56px',
            width: '356px',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            padding: '19px 20px 17px 20px',
            '&:hover': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            height: '48px',
            width: '164px',
            borderRadius: '8px',
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '22px',
            backgroundColor: '#445AFF',
            '&:hover': {
              backgroundColor: '#697BFF',
            },
          },
        },
      ],
    },
    MuiCssBaseline: {
      styleOverrides: `
            @font-face {
              font-family: 'Golos';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Golos'), url(${GolosTextVF}) format('woff2');
            }
          `,
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Golos, Arial',
  },
  breakpoints: {
    key: {
      0: 'ax',
      1: 'xs',
      2: 'sm',
      3: 'md',
      4: 'dl',
      5: 'lg',
      6: 'gx',
      7: 'xl',
      8: 'lp',
    },
    values: {
      ax: 0,
      xs: 240,
      sm: 480,
      md: 720,
      dl: 980,
      lg: 1200,
      gx: 1536,
      xl: 1980,
      lp: 2200,
    },
  },
  palette: {
    ...(mode === 'light'
      ? {
          mode: 'light',
          primary: {
            dark: '#445AFF',
            main: '#697BFF',
            light: '#B4BDFF',
            pale: '#ECEFFF',
          },
          secondary: {
            dark: '#9769FF',
            main: '#BD9FFF',
            light: '#EEE7FF',
            pale: '#F5F0FF',
          },
          gray: {
            100: '#000000',
            80: '#333333',
            40: '#999999',
            10: '#E6E6E6',
            0: '#FFFFFF',
          },
          success: {
            dark: '#39EF84',
            main: '#61F29D',
            light: '#B0F9CE',
            pale: '#EBFDF3',
          },
          error: {
            dark: '#F42D2D',
            main: '#F65757',
            light: '#FBABAB',
            pale: '#FEEAEA',
          },
          // Старые значения
          background: {
            main: '#f5f5f5',
            secondary: '#eeeeee',
          },
        }
      : {
          mode: 'dark',
          primary: {
            dark: '#445AFF',
            main: '#697BFF',
            light: '#B4BDFF',
            pale: '#ECEFFF',
          },
          secondary: {
            dark: '#9769FF',
            main: '#BD9FFF',
            light: '#EEE7FF',
            pale: '#F5F0FF',
          },
          gray: {
            100: '#000000',
            80: '#333333',
            40: '#999999',
            10: '#E6E6E6',
            0: '#FFFFFF',
          },
          success: {
            dark: '#39EF84',
            main: '#61F29D',
            light: '#B0F9CE',
            pale: '#EBFDF3',
          },
          error: {
            dark: '#F42D2D',
            main: '#F65757',
            light: '#FBABAB',
            pale: '#FEEAEA',
          },
          // Старые значения
          background: {
            main: '#212121',
            secondary: '#424242',
          },
        }),
  },
});
