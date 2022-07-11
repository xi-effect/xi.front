import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import Navigation from "kit/Navigation/Navigation";


const RoomPage = inject("rootStore", "userSt", "userSt")(observer(() => {
    const router = useRouter();

    React.useEffect(() => {
        if (router.query.id !== undefined) {
            // do smth 
        }
    }, [router.query.id]);

    return (
        <>
            <Head>
                <title>
                    Ξffect | Комната
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <Navigation>
                rjvgjytyns nen
            </Navigation>
        </>
    );
}));

export default RoomPage;
