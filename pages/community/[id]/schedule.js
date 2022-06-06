import { Grid, Paper, } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import Navigation from "components/OtherComponents/Navigation/Navigation";

import DayPicker from "components/PagesComponents/Community/Schedule/DayPicker.tsx";
import Events from "components/PagesComponents/Community/Schedule/Events.tsx";

const Community = inject("userSt")(observer(() =>
// const router = useRouter()
(
    <>
        <Head>
            <title>
                Ξffect
            </title>
            <meta name="robots" content="noindex" />
        </Head>
        <Navigation>
            <Grid sx={{ p: 4, width: '100%' }} container spacing={2}>
                <Grid item xs="auto">
                    <Paper sx={{ bgcolor: 'primary.dark', height: '100%', borderRadius: 4 }}>
                        <DayPicker />
                    </Paper>
                </Grid>
                <Grid sx={{ width: '100%' }} item xs="auto">
                    <Paper sx={{ bgcolor: 'primary.dark', p: 2, width: '100%', height: '100%', borderRadius: 4 }}>
                        <Events />
                    </Paper>
                </Grid>
                <Grid item xs="auto">
                    <Paper sx={{ bgcolor: 'primary.dark', p: 2, height: '100%', borderRadius: 4 }}>
                        2
                    </Paper>
                </Grid>
            </Grid>
        </Navigation>
    </>
)
));

export default Community;
