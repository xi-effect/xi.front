// eslint-disable-next-line import/prefer-default-export
export const getDesignTokens = (mode) => ({
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
    typography: {
        htmlFontSize: 10,
        button: {
            textTransform: "none"
        },
    },
    palette: {
        ...(!mode
            ? {
                mode: "light",
                primary: {
                    main: "#5F85D8",
                    light: "#7f9ddf",
                    dark: "#425d97",
                },
                secondary: {
                    main: "#53BF80",
                    light: "#75cb99",
                    dark: "#3a8559",
                },
                background: {
                    main: "#f5f5f5",
                    secondary: "#eeeeee",
                }
            }
            : {
                mode: "dark",
                primary: {
                    main: "#5F85D8",
                    light: "#7f9ddf",
                    dark: "#425d97",
                },
                secondary: {
                    main: "#53BF80",
                    light: "#75cb99",
                    dark: "#3a8559",
                },
                background: {
                    main: "#212121",
                    secondary: "#424242",
                }

            }),
    },
});

