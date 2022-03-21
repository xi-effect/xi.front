import React from "react"
import { Stack, Grid, Divider, Typography, Box, IconButton } from "@mui/material"
import { inject, observer } from "mobx-react"

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CheckIcon from "@mui/icons-material/Check";
import CustomAvatar from "../../OtherComponents/Avatar/CustomAvatar";

const bgcolor = [
    "#78909c",
    "#9c27b0",
    "#673ab7",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
]

const UserAvatar = inject("settingsSt")(observer(({ settingsSt }) => (
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
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "body", settingsSt.settings.avatar.body === 0 ? 27 : settingsSt.settings.avatar.body - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Тело № ${settingsSt.settings.avatar.body + 1}`}
                </Typography>
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "body", settingsSt.settings.avatar.body === 27 ? 0 : settingsSt.settings.avatar.body + 1)}>
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
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "hair", settingsSt.settings.avatar.hair === 0 ? 46 : settingsSt.settings.avatar.hair - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Волосы № ${settingsSt.settings.avatar.hair + 1}`}
                </Typography>
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "hair", settingsSt.settings.avatar.hair === 46 ? 0 : settingsSt.settings.avatar.hair + 1)}>
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
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "face", settingsSt.settings.avatar.face === 0 ? 32 : settingsSt.settings.avatar.face - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Лицо № ${settingsSt.settings.avatar.face + 1}`}
                </Typography>
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "face", settingsSt.settings.avatar.face === 32 ? 0 : settingsSt.settings.avatar.face + 1)}>
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
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "accessory", settingsSt.settings.avatar.accessory === 0 ? 8 : settingsSt.settings.avatar.accessory - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Очки № ${settingsSt.settings.avatar.accessory + 1}`}
                </Typography>
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "accessory", settingsSt.settings.avatar.accessory === 8 ? 0 : settingsSt.settings.avatar.accessory + 1)}>
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
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "facialHair", settingsSt.settings.avatar.facialHair === 0 ? 16 : settingsSt.settings.avatar.facialHair - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Борода № ${settingsSt.settings.avatar.facialHair + 1}`}
                </Typography>
                <IconButton onClick={() => settingsSt.setSettingsSecond("avatar", "facialHair", settingsSt.settings.avatar.facialHair === 16 ? 0 : settingsSt.settings.avatar.facialHair + 1)}>
                    <NavigateNextIcon />
                </IconButton>
            </Grid>
        </Grid>
        <Divider sx={{ height: 1, bgcolor: "text.dark", width: "100%" }} />
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
                        <Box onClick={() => settingsSt.setSettingsSecond("avatar", "bgcolor", index)} sx={{ height: 64, width: 64, m: 1, cursor: "pointer" }}>
                            <CustomAvatar avatar={{ ...settingsSt.settings.avatar, bgcolor: index }} viewBox={{ x: "50", y: "-100", width: "732", height: "732" }} />
                        </Box>
                        {/* <Box sx={{ height: 32, width: 64, m: 1, }}> */}
                        {settingsSt.settings.avatar.bgcolor === index && <CheckIcon />}
                        {/* </Box> */}
                    </Stack>
                ))}
            </Grid>
        </Grid>
    </Grid>

)))

export default UserAvatar