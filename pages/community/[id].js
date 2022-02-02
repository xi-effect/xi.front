import { Stack } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router"
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";


const Community = inject("profileStore")(observer(({ profileStore }) => {
    // console.log("router.query", router.query.id);
    const router = useRouter()
    React.useEffect(() => {
        if (router.query.id !== undefined) {
            profileStore.loadUserInfo(router.query.id)
        }
    }, [profileStore, router.query.id]);

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
