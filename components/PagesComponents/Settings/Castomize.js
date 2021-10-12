import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, FormControl, useTheme, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button } from '@mui/material'
import { inject, observer } from 'mobx-react'
import DarkModeToggle from "react-dark-mode-toggle"
//import { SnackbarProvider, useSnackbar } from 'notistack';

const useStylesProfile = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'auto',
        //backgroundColor: theme => theme.main.palette.content.background,
    },
    rootProfile: {
        // paddingLeft: 8,
        // paddingTop: 8,
    },
    gridDarkModeToggle: {
        marginLeft: 8,
        marginTop: 8,
    },
    gridTypography: {
        marginTop: 4,
        marginLeft: 8,
    },
    Typography: {
        color: theme => theme.palette.primary.contrastText,
    }
}));

const Castomize = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore }) => {
    const theme = useTheme()
    const classes = useStylesProfile(theme);
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
        <>
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
        </>
    );
}))

export default Castomize