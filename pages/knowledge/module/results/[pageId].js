/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import Head from "next/head"
import { Grid } from "@mui/material"
import { inject, observer } from "mobx-react"
import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";
import PageCompList from "../../../../components/PagesComponents/Knowledge/Page/PageCompList";


const ResultId = inject()(observer(() => (
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
                <PageCompList />
            </Grid>
        </NavigationAll>
    </>
)))


export default ResultId