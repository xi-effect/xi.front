/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";
import DataList from "../../components/PagesComponents/Managment/Content/Modules/DataList";


const Yourmodules = inject()(observer(() => (
    <>
        <Head>
            <title>
                Ξffect | Ваши модули
            </title>
            <meta name="robots" content="noindex" />
        </Head>
        <NavigationAll haveRightToolbar>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    width: "100%",
                    zIndex: 1,
                    p: 2,
                }}
            >
                <DataList />
            </Grid>
        </NavigationAll>
    </>
)));

export default Yourmodules;