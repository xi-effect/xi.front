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
        },
    },
    typography: {
        // Tell MUI what"s the font-size on the html element is.
        htmlFontSize: 10,
        button: {
            textTransform: "none"
        },
        Roboto500XiLabel: {
            fontFamily: "Roboto",
            fontWeight: 500,
            lineHeight: "50px",
            letterSpacing: "-0.03em",
        },
        IBMPlexMono500XiLabelEnd: {
            fontFamily: "IBM Plex Mono",
            fontWeight: 500,
            lineHeight: "50px",
            letterSpacing: "-0.03em",
        },
        OpenSans700MainLabel: {
            fontFamily: "Open Sans",
            fontWeight: 700,
            lineHeight: "71px",
            letterSpacing: "0",
        },
        OpenSans500MainLabel: {
            fontFamily: "Open Sans",
            fontWeight: 500,
            lineHeight: "27px",
            letterSpacing: "0",
        },
        IBMPlexSans700WhyLabel: {
            fontFamily: "IBM Plex Sans",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "52px",
            letterSpacing: "0",
        },
        OpenSans600WhyLabel: {
            fontFamily: "Open Sans",
            fontWeight: 600,
            lineHeight: "27px",
            letterSpacing: "0",
        },
        OpenSans400WhyLabel: {
            fontFamily: "Open Sans",
            fontWeight: 400,
            lineHeight: "160%",
            letterSpacing: "0",
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
                    main: "#26282B",
                    secondary: "#353941",
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
                    main: "#26282B",
                    secondary: "#353941",
                }

            }),
    },
});

