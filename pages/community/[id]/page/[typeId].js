/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-unresolved */
import { inject, observer } from "mobx-react";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { Stack, useMediaQuery } from "@mui/material";
import { EditorState } from 'draft-js';
import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";


// const TextEditor = dynamic(() => import("../../../../components/OtherComponents/Editor/TextEditor/TextEditor.tsx"), {
//     ssr: false,
// })

// const InlineToolPanel = dynamic(() => import("../../../../components/OtherComponents/Editor/InlineToolPanel/InlineToolPanel.tsx"), {
//     ssr: false,
// })

const ContentEditor = dynamic(() => import("../../../../components/OtherComponents/Editor/ContentEditor/ContentEditor.tsx"), {
    ssr: false,
})

const PagePage = inject("rootStore", "settingsStore", "profileStore")(observer(() => {
    // console.log("router.query", router.query.id);
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));
    const router = useRouter()

    React.useEffect(() => {
        if (router.query.id !== undefined) {
            // do smth 
        }
    }, [router.query.id]);
    // console.log("router.query", router.query)

    const initialContent = EditorState.createEmpty();
    const editorRef = React.useRef(null);
    const [editorState, setEditorState] = React.useState(initialContent);

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
                        pl: mobile ? 1 : 2,
                        pr: mobile ? 1 : 8,
                    }}
                >
                    <ContentEditor
                        editorRef={editorRef}
                        editorState={editorState}
                        setEditorState={setEditorState}
                    />
                </Stack>
            </NavigationAll>
        </>
    );
}))

export default PagePage;
