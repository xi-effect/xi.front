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
            textTransform: 'capitalize',
            height: '64px',
            width: '136px',
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
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'capitalize',
            height: '64px',
            width: '136px',
            borderRadius: '8px',
            color: '#445AFF',
            border: '1px solid #445AFF',
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '22px',
            backgroundColor: 'transparent',
          },
        },
      ],
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: 'Inter, Arial',
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
            dark: '#445AFF', // blue.100
            main: '#697BFF', // blue.80
            light: '#B4BDFF', // blue.40
            pale: '#ECEFFF', // blue.10
          },
          secondary: {
            dark: '#9769FF', // purple.100
            main: '#BD9FFF', // blue.80
            light: '#EEE7FF', // blue.40
            pale: '#F5F0FF', // blue.10
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
