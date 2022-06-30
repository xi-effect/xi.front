/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Stack, Paper, Button, Tooltip, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import CustomAvatar from "components/OtherComponents/Avatar/CustomAvatar";

const UserBar = inject("userSt")(observer(({ userSt }) => {
    const router = useRouter();
    console.log("router", router);

    return (
        <Paper
            elevation={6}
            sx={{
                zIndex: 40,
                m: 0,
                p: 0,
                width: 256,
                height: 80,
            }}
        >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    pl: 1.5,
                    width: 256,
                    height: 80,
                }}
            >
                <CustomAvatar avatar={{ ...userSt.settings.avatar }} height="48px" width="48px" />
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        pl: 1
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            height: 24,
                        }}
                    >
                        <Typography sx={{ fontWeight: 700 }}>{userSt.settings.username}</Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography sx={{ color: 'text.secondary', mr: 3 }}>#2456</Typography>
                        <Tooltip title="Звук" placement="top">
                            <Button color="inherit" sx={{
                                width: 36,
                                minWidth: 36,
                            }}>
                                <VolumeUpIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Микрофон" placement="top">
                            <Button color="inherit" sx={{
                                width: 36,
                                minWidth: 36,
                            }}>
                                <KeyboardVoiceIcon />
                            </Button>
                        </Tooltip>

                        <Tooltip title="Настройки" placement="top">
                            <Button color="inherit"
                            onClick={() => router.push('/settings')}
                            sx={{
                                width: 36,
                                minWidth: 36,
                            }}>
                                <SettingsIcon />
                            </Button>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>
        </Paper >
    );
}));

export default UserBar;
