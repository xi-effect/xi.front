
export const getDesignTokens = (mode) => ({
    typography: {
        // Tell MUI what's the font-size on the html element is.
        htmlFontSize: 10,
        button: {
            textTransform: 'none'
        },
        Roboto500XiLabel: {
            fontFamily: 'Roboto',
            fontWeight: 500,
            lineHeight: '50px',
            letterSpacing: '-0.03em',
        },
        IBMPlexMono500XiLabelEnd: {
            fontFamily: 'IBM Plex Mono',
            fontWeight: 500,
            lineHeight: '50px',
            letterSpacing: '-0.03em',
        },
        OpenSans700MainLabel: {
            fontFamily: 'Open Sans',
            fontWeight: 700,
            lineHeight: '71px',
            letterSpacing: '0',
        },
        OpenSans400MainLabel: {
            fontFamily: 'Open Sans',
            fontWeight: 400,
            lineHeight: '27px',
            letterSpacing: '0',
        },
        IBMPlexSans700WhyLabel: {
            fontFamily: 'IBM Plex Sans',
            fontWeight: 700,
            fontSize: '40px',
            lineHeight: '52px',
            letterSpacing: '0',
        },
        OpenSans600WhyLabel: {
            fontFamily: 'Open Sans',
            fontWeight: 600,
            lineHeight: '27px',
            letterSpacing: '0',
        },
        OpenSans400WhyLabel: {
            fontFamily: 'Open Sans',
            fontWeight: 400,
            lineHeight: '160%',
            letterSpacing: '0',
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

