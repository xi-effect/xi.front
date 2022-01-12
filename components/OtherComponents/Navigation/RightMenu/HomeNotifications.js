/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import Image from "next/image";

import { Button, Box, useMediaQuery, ClickAwayListener, Divider, MenuList, MenuItem, ListItemText, ListItemIcon, Tooltip, Popper, IconButton, Link, Paper, useTheme, Stack, Typography, Grow } from "@mui/material";

const HomeNotifications = inject(
    "knowledgeStore",
)(
    observer(({ knowledgeStore, goNext }) => {
        const theme = useTheme()
        const router = useRouter()
        return (
            <>
                <Typography variant="subtitle1" sx={{ ml: 2.5 }}>Уведомления:</Typography>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: 196,
                            height: 196,
                            mt: 4,
                        }}
                    >
                        <Image
                            alt="alt"
                            src={"/app/PushNotifications.svg"}
                            quality={100}
                            width={196}
                            height={196}
                        />
                    </Box>
                    <Typography variant="subtitle2">У вас нет новых уведомлений</Typography>
                </Stack>
            </>
        );
    })
);

export default HomeNotifications;