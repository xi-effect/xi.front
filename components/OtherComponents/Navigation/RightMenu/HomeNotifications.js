/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";
import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";

const HomeNotifications = inject(
    "knowledgeStore",
)(
    observer(() => (
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
                        src="/assets/app/PushNotifications.svg"
                        quality={100}
                        width={196}
                        height={196}
                    />
                </Box>
                <Typography variant="subtitle2">У вас нет новых уведомлений</Typography>
            </Stack>
        </>
    ))
);

export default HomeNotifications;