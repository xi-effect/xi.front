import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router"

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";
// import ContentEditor from "../../../../components/OtherComponents/Content/ContentEditor";


const PagePage = inject("rootStore", "settingsStore", "profileStore")(observer(() => {
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
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <NavigationAll>
                {/* <ContentEditor /> */}
            </NavigationAll>
        </>
    );
}))

export default PagePage;
