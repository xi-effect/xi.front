import React, { useState } from 'react'

import { Grid, FormControl, Stack, useTheme, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button, IconButton } from '@mui/material'
import { inject, observer } from 'mobx-react'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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


const UserAvatar = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore }) => {
    const theme = useTheme()

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ minWidth: 232 }}
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
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ minWidth: 232 }}
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
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ minWidth: 232 }}
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
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ minWidth: 232 }}
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
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{ minWidth: 232 }}
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
            </Stack>
        </Stack>
    );
}))

export default UserAvatar