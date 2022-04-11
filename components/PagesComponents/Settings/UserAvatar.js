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

const UserAvatar = inject("userSt")(observer(({ userSt }) => (
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
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "body", userSt.settings.avatar.body === 0 ? 27 : userSt.settings.avatar.body - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Тело № ${userSt.settings.avatar.body + 1}`}
                </Typography>
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "body", userSt.settings.avatar.body === 27 ? 0 : userSt.settings.avatar.body + 1)}>
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
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "hair", userSt.settings.avatar.hair === 0 ? 46 : userSt.settings.avatar.hair - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Волосы № ${userSt.settings.avatar.hair + 1}`}
                </Typography>
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "hair", userSt.settings.avatar.hair === 46 ? 0 : userSt.settings.avatar.hair + 1)}>
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
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "face", userSt.settings.avatar.face === 0 ? 32 : userSt.settings.avatar.face - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Лицо № ${userSt.settings.avatar.face + 1}`}
                </Typography>
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "face", userSt.settings.avatar.face === 32 ? 0 : userSt.settings.avatar.face + 1)}>
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
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "accessory", userSt.settings.avatar.accessory === 0 ? 8 : userSt.settings.avatar.accessory - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Очки № ${userSt.settings.avatar.accessory + 1}`}
                </Typography>
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "accessory", userSt.settings.avatar.accessory === 8 ? 0 : userSt.settings.avatar.accessory + 1)}>
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
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "facialHair", userSt.settings.avatar.facialHair === 0 ? 16 : userSt.settings.avatar.facialHair - 1)}>
                    <NavigateBeforeIcon />
                </IconButton>
                <Typography>
                    {`Борода № ${userSt.settings.avatar.facialHair + 1}`}
                </Typography>
                <IconButton onClick={() => userSt.setSettingsSecond("avatar", "facialHair", userSt.settings.avatar.facialHair === 16 ? 0 : userSt.settings.avatar.facialHair + 1)}>
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
                    >
                        <Box onClick={() => userSt.setSettingsSecond("avatar", "bgcolor", index)} sx={{ height: 64, width: 64, m: 1, cursor: "pointer" }}>
                            <CustomAvatar avatar={{ ...userSt.settings.avatar, bgcolor: index }} viewBox={{ x: "50", y: "-100", width: "732", height: "732" }} />
                        </Box>
                        {userSt.settings.avatar.bgcolor === index && <CheckIcon />}
                    </Stack>
                ))}
            </Grid>
        </Grid>
    </Grid>

)))

export default UserAvatar