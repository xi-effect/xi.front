import { Stack } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";


const Community = inject("userSt")(observer(({ userSt }) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{
                        p: 2,
                    }}
                />
            </NavigationAll>
        </>
    );
}))

export default Community
