import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router"

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";


const Dashboard = inject("rootStore", "userSt", "profileSt")(observer(() => {
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
            <NavigationAll />
        </>
    );
}))

export default Dashboard
