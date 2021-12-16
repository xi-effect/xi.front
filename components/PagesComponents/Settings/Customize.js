import React, { useState } from 'react'

import { Grid, FormControl, useTheme, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button } from '@mui/material'
import { inject, observer } from 'mobx-react'
import DarkModeToggle from "react-dark-mode-toggle"

const Customize = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore }) => {
    const theme = useTheme()

    // const [isDarkMode, setIsDarkMode] = useState(() => false);
    // const { enqueueSnackbar } = useSnackbar();

    const saveNewTheme = () => {
        rootStore.fetchDataScr(`${rootStore.url}/settings/`, "POST", {
            "changed": { "dark-theme": !settingsStore.settings.darkTheme }
        })
            .then((data) => {
                console.log(data)
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
        <Grid spacing={1} container sx={{
            width: '100%',
            height: 'auto',
        }}>
            <Grid item container direction="row" sx={{ m: 1, }}>
                <Grid>
                    <DarkModeToggle
                        onChange={saveNewTheme}
                        checked={settingsStore.settings.darkTheme}
                        size={80}
                    />
                </Grid>
                <Grid sx={{ m: 1 }}>
                    <Typography variant="h6"> Тёмная тема </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}))

export default Customize