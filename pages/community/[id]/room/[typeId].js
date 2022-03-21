import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router"

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";


const RoomPage = inject("rootStore", "settingsSt", "profileSt")(observer(() => {
    // console.log("router.query", router.query.id);

    const router = useRouter()

    React.useEffect(() => {
        if (router.query.id !== undefined) {
            // do smth 
        }
    }, [router.query.id]);
    // console.log("router.query", router.query)

    return (
        <>
            <Head>
                <title>
                    Ξffect | Комната
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>
                rjvgjytyns nen
            </NavigationAll>
        </>
    );
}))

export default RoomPage
