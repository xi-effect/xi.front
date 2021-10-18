import React, { useState } from 'react'
import { styled } from '@mui/material/styles';

import { Grid, FormControl, useTheme, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button } from '@mui/material'
import { inject, observer } from 'mobx-react'
import DarkModeToggle from "react-dark-mode-toggle"
const PREFIX = 'Castomize';

const classes = {
    root: `${PREFIX}-root`,
    rootProfile: `${PREFIX}-rootProfile`,
    gridDarkModeToggle: `${PREFIX}-gridDarkModeToggle`,
    gridTypography: `${PREFIX}-gridTypography`,
    Typography: `${PREFIX}-Typography`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        width: '100%',
        height: 'auto',
        //backgroundColor: theme => theme.main.palette.content.background,
    },

    [`& .${classes.rootProfile}`]: {
        // paddingLeft: 8,
        // paddingTop: 8,
    },

    [`& .${classes.gridDarkModeToggle}`]: {
        marginLeft: 8,
        marginTop: 8,
    },

    [`& .${classes.gridTypography}`]: {
        marginTop: 4,
        marginLeft: 8,
    },

    [`& .${classes.Typography}`]: {
        color: theme => theme.palette.primary.contrastText,
    }
}));

//import { SnackbarProvider, useSnackbar } from 'notistack';


{
    theme
}
) => ({
    [`& .${classes.root}`]: {
        width: '100%',
        height: 'auto',
        //backgroundColor: theme => theme.main.palette.content.background,
    },

    [`& .${classes.rootProfile}`]: {
        // paddingLeft: 8,
        // paddingTop: 8,
    },

    [`& .${classes.gridDarkModeToggle}`]: {
        marginLeft: 8,
        marginTop: 8,
    },

    [`& .${classes.gridTypography}`]: {
        marginTop: 4,
        marginLeft: 8,
    },

    [`& .${classes.Typography}`]: {
        color: theme => theme.palette.primary.contrastText,
    }
}));

const Castomize = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore }) => {
    const theme = useTheme()

    // const [isDarkMode, setIsDarkMode] = useState(() => false);
    // const { enqueueSnackbar } = useSnackbar();

    const saveNewTheme = () => {
        rootStore.fetchDataScr(`${rootStore.url}/settings/`, "POST", {
            "changed": { "dark-theme": !settingsStore.settings.darkTheme }
        })
            .then((data) => {
                if (data.a) {
                    settingsStore.setSettings("darkTheme", !settingsStore.settings.darkTheme)
                    // enqueueSnackbar('Успешно', {
                    //     variant: 'success',

                    // });
                } else {
                    // enqueueSnackbar('Ошибка', {
                    //     variant: 'error',
                    // });
                }
            })
    }

    return (
        (<Root>
            <Grid spacing={1} container className={classes.root}>
                {/* <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container direction="column" className={classes.rootProfile}> */}
                <Grid item container direction="row" className={classes.gridDarkModeToggle}>
                    <Grid>
                        <DarkModeToggle
                            onChange={saveNewTheme}
                            checked={settingsStore.settings.darkTheme}
                            size={80}
                        />
                    </Grid>
                    <Grid className={classes.gridTypography}>
                        <Typography variant="h6" className={classes.Typography}> Тёмная тема </Typography>
                    </Grid>
                </Grid>
                {/* </Grid> */}
                {/* <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>

                </Grid> */}
            </Grid>
        </Root>)
    );
}))

export default Castomize