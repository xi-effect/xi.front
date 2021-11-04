import React, { useState } from 'react'

import { FormControl, Stack, Grid, useTheme, Divider, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, IconButton } from '@mui/material'
import { inject, observer } from 'mobx-react'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CustomAvatar from '../../OtherComponents/Avatar/CustomAvatar';
import CheckIcon from '@mui/icons-material/Check';

const styles = {
    peepStyle: {
        width: 390,
        height: 390,
        padding: 32,
        borderRadius: 16,
        justifyContent: 'bottom',
        alignSelf: 'bottom'
    },
};

const bgcolor = [
    "#78909c",
    "#9c27b0",
    "#673ab7",
    "#2196f3",
    "#03a9f4",
    '#00bcd4',
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
]

const UserAvatar = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore }) => {
    const theme = useTheme()

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                sx={{}}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ maxWidth: 200, m: 1, }}
                >
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "body", settingsStore.settings.avatar.body == 0 ? 27 : settingsStore.settings.avatar.body - 1)}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography>
                        {`Тело № ${settingsStore.settings.avatar.body + 1}`}
                    </Typography>
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "body", settingsStore.settings.avatar.body == 27 ? 0 : settingsStore.settings.avatar.body + 1)}>
                        <NavigateNextIcon />
                    </IconButton>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ maxWidth: 200, m: 1, }}
                >
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "hair", settingsStore.settings.avatar.hair == 0 ? 46 : settingsStore.settings.avatar.hair - 1)}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography>
                        {`Волосы № ${settingsStore.settings.avatar.hair + 1}`}
                    </Typography>
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "hair", settingsStore.settings.avatar.hair == 46 ? 0 : settingsStore.settings.avatar.hair + 1)}>
                        <NavigateNextIcon />
                    </IconButton>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ maxWidth: 200, m: 1, }}
                >
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "face", settingsStore.settings.avatar.face == 0 ? 32 : settingsStore.settings.avatar.face - 1)}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography>
                        {`Лицо № ${settingsStore.settings.avatar.face + 1}`}
                    </Typography>
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "face", settingsStore.settings.avatar.face == 32 ? 0 : settingsStore.settings.avatar.face + 1)}>
                        <NavigateNextIcon />
                    </IconButton>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ maxWidth: 200, m: 1, }}
                >
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "accessory", settingsStore.settings.avatar.accessory == 0 ? 8 : settingsStore.settings.avatar.accessory - 1)}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography>
                        {`Очки № ${settingsStore.settings.avatar.accessory + 1}`}
                    </Typography>
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "accessory", settingsStore.settings.avatar.accessory == 8 ? 0 : settingsStore.settings.avatar.accessory + 1)}>
                        <NavigateNextIcon />
                    </IconButton>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    sx={{ maxWidth: 200, m: 1, }}
                >
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "facialHair", settingsStore.settings.avatar.facialHair == 0 ? 16 : settingsStore.settings.avatar.facialHair - 1)}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <Typography>
                        {`Борода № ${settingsStore.settings.avatar.facialHair + 1}`}
                    </Typography>
                    <IconButton onClick={() => settingsStore.setSettingsSecond("avatar", "facialHair", settingsStore.settings.avatar.facialHair == 16 ? 0 : settingsStore.settings.avatar.facialHair + 1)}>
                        <NavigateNextIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider sx={{ height: 1, bgcolor: 'text.dark', width: '100%' }} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
                sx={{ mt: 2, ml: 2 }}
            >
                <Typography> Компактный вариант: </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    {bgcolor.map((item, index) => (
                        <Stack
                            key={index.toString()}
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        // spacing={2}
                        >
                            <Box onClick={() => settingsStore.setSettingsSecond("avatar", "bgcolor", index)} sx={{ height: 64, width: 64, m: 1, cursor: 'pointer' }}>
                                <CustomAvatar avatar={{ ...settingsStore.settings.avatar, bgcolor: index }} viewBox={{ x: '50', y: '-100', width: '732', height: '732' }} />
                            </Box>
                            {/* <Box sx={{ height: 32, width: 64, m: 1, }}> */}
                            {settingsStore.settings.avatar.bgcolor === index && <CheckIcon />}
                            {/* </Box> */}
                        </Stack>
                    ))}
                </Grid>
            </Grid>
        </Grid>

    );
}))

export default UserAvatar