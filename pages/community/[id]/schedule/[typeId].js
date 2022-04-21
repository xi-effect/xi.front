import { Stack, Box, } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import NavigationAll from "components/OtherComponents/Navigation/NavigationAll";
import Toolbar from "components/PagesComponents/Community/Schedule/Toolbar";
import DateLine from "components/PagesComponents/Community/Schedule/DateLine";
import LessonsList from "components/PagesComponents/Community/Schedule/LessonsList";

const SchedulePage = inject()(observer(() => {
    const router = useRouter();

    React.useEffect(() => {
        if (router.query.id !== undefined) {
            // do smth 
        }
    }, [router.query.id]);

    return (
        <>
            <Head>
                <title>
                    Ξffect | Расписание
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    // spacing={2}
                    sx={{
                        width: "100%",
                        // maxHeight: "calc(100vh - 120px)",
                        // height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            position: "fixed",
                            left: "336px",
                            right: "256px",
                            bgcolor: "background.main",
                            zIndex: 100,
                            top: 48,
                        }}
                    >
                        <Toolbar />
                        <DateLine />
                    </Box>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        // spacing={2}
                        sx={{
                            mt: 12,
                            width: "100%",
                            maxHeight: "calc(100vh - 120px)",
                            height: "100%",
                        }}
                    >
                        <LessonsList />
                    </Stack>
                </Stack>
            </NavigationAll>
        </>
    );
}));

export default SchedulePage;
