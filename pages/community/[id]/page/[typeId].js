/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { Box, } from "@mui/material"; // useMediaQuery
import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";

const ContentEditor = dynamic(() => import("../../../../components/OtherComponents/Editor/ContentEditor/ContentEditor.tsx"), {
    ssr: false,
})

const PagePage = inject("rootStore", "settingsSt", "profileSt")(observer(() => {
    // const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));
    const router = useRouter()

    React.useEffect(() => {
        if (router.query.id !== undefined) {
            // do smth 
        }
    }, [router.query.id]);

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>
                <Box
                >
                    <ContentEditor
                    />
                </Box>
            </NavigationAll>
        </>
    );
}))

export default PagePage;
