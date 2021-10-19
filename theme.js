
export const getDesignTokens = (mode) => ({
    palette: {
        ...(mode
            ? {
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
                green: {
                    light: "#6fbf73",
                    main: "#4caf50",
                    dark: "#81ac8d",
                },
                background: {
                    1: "#eceff1",
                    2: "#cfd8dc",
                    3: "#b0bec5",
                },
                primary: {
                    light: '#2196f3',
                    main: '#1976d2',
                    dark: '#0d47a1',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#8bc34a',
                    main: '#689f38',
                    dark: '#33691e',
                    contrastText: '#111',
                },
                blueGrey: {
                    "0": "#eceff1",
                    "1": "#cfd8dc",
                    "2": "#b0bec5",
                    "3": "#90a4ae",
                    "4": "#78909c",
                    "5": "#607d8b",
                    "6": "#546e7a",
                    "7": "#455a64",
                    "8": "#37474f",
                    "9": "#263238",
                },
            }
            : {
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
                green: {
                    light: "#6fbf73",
                    main: "#4caf50",
                    dark: "#81ac8d",
                },
                background: {
                    0: "#263238",
                    1: "#37474f",
                    2: "#455a64",
                },
                // старая палитра 
                primary: {
                    light: '#accef5',
                    main: '#1976d2',
                    dark: '#0d47a1',
                    contrastText: '#fff',
                },
                secondary: {
                    light: '#8bc34a',
                    main: '#689f38',
                    dark: '#33691e',
                    contrastText: '#111',
                },
                blueGrey: {
                    "0": "#263238",
                    "1": "#37474f",
                    "2": "#455a64",
                    "3": "#546e7a",
                    "4": "#607d8b",
                    "5": "#78909c",
                    "6": "#90a4ae",
                    "7": "#b0bec5",
                    "8": "#cfd8dc",
                    "9": "#eceff1",
                },
            }),


    },
});

