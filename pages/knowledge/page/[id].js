/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import Head from "next/head"
import { Grid, } from "@mui/material"


import { inject, observer } from "mobx-react"

import NavigationAll from "../../../components/OtherComponents/Navigation/NavigationAll";
import PageCompList from "../../../components/PagesComponents/Knowledge/Page/PageCompList";

const Page = inject("knowledgeSt")(observer(({ knowledgeSt }) => {

    React.useEffect(() => {
        // LoadComponents()
        console.log("knowledgeSt.loadPage()")
        knowledgeSt.loadPage()
    }, []);



    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>
                <Grid
                    sx={{
                        margin: "4px",
                        width: "calc(100% - 16px)",
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
    );
}))


export default Page