/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { inject, observer } from "mobx-react";

import Navigation from "kit/Navigation/Navigation";
import Chat from "kit/Chat/Chat";

const ChatPage = inject(
    "messageSt"
)(
    observer(({ messageSt }) => {
        const router = useRouter();

        React.useEffect(() => {
            const id = window.location.href.split("/").pop();
            messageSt.loadMetaForChat(id);
            messageSt.loadUsersForChat(id);
            messageSt.uploadFirstMessages(id);
            return () => {
                messageSt.clearChat();
            };
        }, [router.query.typeId]);

        return (
            <>
                <Head>
                    <title>Ξffect</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <Navigation>
                    <Chat />
                </Navigation>
            </>
        );
    })
);

export default ChatPage;

