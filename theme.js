
export const getDesignTokens = (mode) => ({
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
                    main: '#B2EBF2',
                    light: '#B2EBF2',
                    dark: '#B2EBF2',
                },
                secondary: {
                    main: '#00BCD4',
                    light: '#00BCD4',
                    dark: '#00BCD4',
                },
                tertiary: {
                    main: '#005086',
                }, 
                background: {
                    main: '#DDF4FF',
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
                    main: '#1D3461',
                    light: '#1D3461',
                    dark: '#1D3461',
                },
                secondary: {
                    main: '#376996',
                    light: '#376996',
                    dark: '#376996',
                },
                tertiary: {
                    main: '#6290C8',
                }, 
                background: {
                    main: '#1F487E',
                },

            }),
    },
});

