/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { inject, observer } from "mobx-react";

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";
import Chat from "../../../../components/OtherComponents/Chat/Chat"

const ChatPage = inject(
    "messageSt"
)(
    observer(({ messageSt }) => {
        const router = useRouter();

        // console.log("router.query", router.query.id);
        // if (socket !== null) {
        //     socket.on("send-message", (arg) => {
        //         if (messageSt.chat.hasNext) {
        //             let newArray = messageSt.chat.messages;
        //             newArray.pop();
        //             messageSt.setChat("messages", newArray);
        //         }
        //     });
        // }

        // if (socket !== null) {
        //     socket.on("edit-message", (arg) => {
        //         messageSt.editMessageInChat(arg["message-id"], arg["content"]);
        //     });
        // }

        // if (socket !== null) {
        //     socket.on("delete-message", (arg) => {

        //     });
        // }

        React.useEffect(() => {
            const id = window.location.href.split("/").pop();
            // socket.emit("open", { "chat-id": id });
            // console.log("open socket");
            // console.log("id", id);
            messageSt.loadMetaForChat(id);
            messageSt.loadUsersForChat(id);
            messageSt.uploadFirstMessages(id);
            return () => {
                // socket.emit("close", { "chat-id": id });
                console.log("close socket");
                messageSt.clearChat();
            };
        }, [router.query.typeId]);

        return (
            <>
                <Head>
                    <title>Ξffect</title>
                    <meta name="robots" content="noindex" />
                </Head>
                <NavigationAll>
                    <Chat />
                </NavigationAll>
            </>
        );
    })
);

export default ChatPage;

