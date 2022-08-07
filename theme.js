// eslint-disable-next-line import/prefer-default-export
import GolosTextVF from './public/fonts/Golos-Text_VF.woff2';

export const getDesignTokens = (mode) => ({
    typography: {
        htmlFontSize: 10,
        button: {
            textTransform: "none"
        },
        fontFamily: 'Golos, Arial',
    },
    components: {
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
    breakpoints: {
        key: {
            0: "ax",
            1: "xs",
            2: "sm",
            3: "md",
            4: "dl",
            5: "lg",
            6: "gx",
            7: "xl",
            8: "lp",
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
        ...(mode === "light"
            ? {
                mode: "light",
                primary: {
                    dark: "#445AFF",
                    main: "#697BFF",
                    light: "#B4BDFF",
                    pale: "#ECEFFF",
                },
                secondary: {
                    dark: "#9769FF",
                    main: "#BD9FFF",
                    light: "#EEE7FF",
                    pale: "#F5F0FF",
                },
                gray: {
                    100: "#000000",
                    80: "#333333",
                    40: "#999999",
                    10: "#E6E6E6",
                    0: "#FFFFFF",
                },
                success: {
                    dark: "#39EF84",
                    main: "#61F29D",
                    light: "#B0F9CE",
                    pale: "#EBFDF3",
                },
                error: {
                    dark: "#F42D2D",
                    main: "#F65757",
                    light: "#FBABAB",
                    pale: "#FEEAEA",
                },
                // Старые значения
                background: {
                    main: "#f5f5f5",
                    secondary: "#eeeeee",
                }
            }
            : {
                mode: "dark",
                primary: {
                    dark: "#445AFF",
                    main: "#697BFF",
                    light: "#B4BDFF",
                    pale: "#ECEFFF",
                },
                secondary: {
                    dark: "#9769FF",
                    main: "#BD9FFF",
                    light: "#EEE7FF",
                    pale: "#F5F0FF",
                },
                gray: {
                    100: "#000000",
                    80: "#333333",
                    40: "#999999",
                    10: "#E6E6E6",
                    0: "#FFFFFF",
                },
                success: {
                    dark: "#39EF84",
                    main: "#61F29D",
                    light: "#B0F9CE",
                    pale: "#EBFDF3",
                },
                error: {
                    dark: "#F42D2D",
                    main: "#F65757",
                    light: "#FBABAB",
                    pale: "#FEEAEA",
                },
                // Старые значения
                background: {
                    main: "#212121",
                    secondary: "#424242",
                }

            }),
    },
});

