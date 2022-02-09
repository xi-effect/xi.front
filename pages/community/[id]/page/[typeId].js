/* eslint-disable import/no-unresolved */
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";

const TextEditor = dynamic(() => import("../../../../components/OtherComponents/Editor/TextEditor/TextEditor.tsx"), {
    ssr: false,
})

const InlineToolPanel = dynamic(() => import("../../../../components/OtherComponents/Editor/InlineToolPanel/InlineToolPanel.tsx"), {
    ssr: false,
})

const DragDrop = dynamic(() => import("../../../../components/OtherComponents/Editor/DragDrop/DragDrop.tsx"), {
    ssr: false,
})

const quotesIn = [
    {
        id: "0",
        value: "Irure ex officia laborum qui mollit fugiat cupidatat occaecat do. Eiusmod aliqua cupidatat dolore commodo laboris ex sunt ea. Sint ea velit enim ut nulla pariatur sint commodo duis proident excepteur.",
    },
    {
        id: "1",
        value: "In in ut officia qui dolore anim ea excepteur. Pariatur fugiat ipsum cillum Lorem officia deserunt sint esse culpa deserunt enim consequat voluptate labore. Labore cillum duis nulla laborum commodo labore irure fugiat duis magna. Velit eu labore amet cillum incididunt sint. Lorem exercitation officia laboris ad proident irure laboris reprehenderit.",
    },
    {
        id: "2",
        value: "Consequat esse minim anim duis elit exercitation fugiat nostrud ut officia eu tempor fugiat mollit.",
    },
    {
        id: "3",
        value: "Cupidatat incididunt velit pariatur occaecat aliqua consectetur adipisicing occaecat cupidatat aliqua nostrud in proident magna. Qui reprehenderit nisi amet mollit eu veniam non magna mollit aute reprehenderit consectetur occaecat id. Aute nulla ut et eu. Pariatur ad irure qui aliqua non ullamco ut ad enim excepteur proident id.",
    },
]

const PagePage = inject("rootStore", "settingsStore", "profileStore")(observer(() => {
    // console.log("router.query", router.query.id);
    const [quotes, setQuotes] = React.useState(quotesIn)
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
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={6}
                    sx={{
                        p: 6,
                    }}
                >
                    <TextEditor />
                    <InlineToolPanel />
                    <DragDrop quotes={quotes} setQuotes={setQuotes} />
                </Stack>
            </NavigationAll>
        </>
    );
}))

export default PagePage;
