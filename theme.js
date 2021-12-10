
export const getDesignTokens = (mode) => ({
    typography: {
        // Tell MUI what's the font-size on the html element is.
        htmlFontSize: 10,
        button: {
            textTransform: 'none'
        },
    },
    palette: {
        ...(!mode
            ? {
                mode: 'light',
                text: {
                    main: "#212121",
                    dark: "#616161",
                    reverseMain: "#fafafa",
                    reverseDark: "#bdbdbd",

                    disabled: "rgba(0, 0, 0, 0.38)",
                    primary: "rgba(0, 0, 0, 0.87)",
                    secondary: "rgba(0, 0, 0, 0.6)",
                },
                constant: {
                    textWhite: "#fafafa",
                    textBlack: "#212121",
                    landingBlue: "#6cadee",
                    landingPink: "#d391e3",
                },
                primary: {
                    main: '#145fe1',
                    light: '#2c72ed',
                    dark: '#1150c1',
                },
                secondary: {
                    main: '#769234',
                    light: '#86a73c',
                    dark: '#647f2f',
                },
                background: {
                    main: '#b0caf8',
                }
            }
            : {
                mode: 'dark',
                // palette values for dark mode
                text: {
                    main: "#fafafa",
                    dark: "#bdbdbd",
                    reverseMain: "#212121",
                    reverseDark: "#616161",
                    disabled: "rgba(255, 255, 255, 0.38)",
                    primary: "rgba(255, 255, 255, 0.87)",
                    secondary: "rgba(255, 255, 255, 0.6)",
                    icon: "rgba(255, 255, 255, 0.8)",
                },
                constant: {
                    textWhite: "#fafafa",
                    textBlack: "#212121",
                    landingBlue: "#6cadee",
                    landingPink: "#d391e3",
                },
                primary: {
                    main: '#145fe1',
                    light: '#2c72ed',
                    dark: '#1150c1',
                },
                secondary: {
                    main: '#145fe1',
                    light: '#2c72ed',
                    dark: '#1150c1',
                },
                background: {
                    main: '#4d89ef',
                }

            }),
    },
});

