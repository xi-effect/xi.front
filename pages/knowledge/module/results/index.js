/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import Head from "next/head"
import { Grid } from "@mui/material"

import { inject, observer } from "mobx-react"

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";
import Results from "../../../../components/PagesComponents/Knowledge/Module/Results";


const ModuleId = inject()(observer(() => (
    <>
        <Head>
            <title>
                Ξffect
            </title>
            <meta name="robots" content="noindex" />
        </Head>
        {/* <Background/> */}
        <NavigationAll haveRightMenu>
            <Grid
                sx={{
                    width: "100%",
                    zIndex: 1,
                }}
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                container
            >
                <Results />
            </Grid>
        </NavigationAll>
    </>
)))


export default ModuleId