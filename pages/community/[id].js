import { Stack } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import Navigation from "components/OtherComponents/Navigation/Navigation";


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
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
                sx={{
                    p: 2,
                }}
            />
        </Navigation>
    </>
)
));

export default Community;
