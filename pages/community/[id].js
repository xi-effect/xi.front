import { Grid, Paper } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import Navigation from "components/OtherComponents/Navigation/Navigation";
import Description from "components/PagesComponents/Community/Overview/Description";
import Administration from "components/PagesComponents/Community/Overview/Administration";

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
            <Grid sx={{ p: 2 }} container spacing={2}>
                <Grid item xs={12} gx={6} xl={8} lp={10}>
                    <Paper sx={{ bgcolor: 'primary.dark', p: 2, height: '100%', borderRadius: 4 }}>
                        <Description />
                    </Paper>
                </Grid>
                <Grid item xs={12} gx={6} xl={4} lp={2}>
                    <Paper sx={{ bgcolor: 'primary.dark', p: 2, height: '100%', borderRadius: 4 }}><Administration /></Paper>
                </Grid>
            </Grid>
        </Navigation>
    </>
)
));

export default Community;
