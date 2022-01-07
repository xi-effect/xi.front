/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    Divider,
    Paper,
    Skeleton,
    Box,
    useMediaQuery,
    Grid,
    Stack,
    FormControlLabel,
    Button,
    useTheme,
    Menu,
    Hidden,
    IconButton,
    InputBase,
    Switch,
    Typography,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import NavigationAll from "../../../../components/OtherComponents/Navigation/NavigationAll";
import Chat from '../../../../components/OtherComponents/Chat/Chat'
import socket from "../../../../utils/socket";


const ChatPage = inject(
    "rootStore",
    "messageStore"
)(
    observer(({ rootStore, messageStore }) => {
        const theme = useTheme();
        const router = useRouter();
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));
        const mobileSecond = useMediaQuery((theme) => theme.breakpoints.up("md"));

        // console.log("router.query", router.query.id);
        // if (socket !== null) {
        //     socket.on("send-message", (arg) => {
        //         if (messageStore.chat.hasNext) {
        //             let newArray = messageStore.chat.messages;
        //             newArray.pop();
        //             messageStore.setChat("messages", newArray);
        //         }
        //     });
        // }

        // if (socket !== null) {
        //     socket.on("edit-message", (arg) => {
        //         messageStore.editMessageInChat(arg["message-id"], arg["content"]);
        //     });
        // }

        // if (socket !== null) {
        //     socket.on("delete-message", (arg) => {

        //     });
        // }

        React.useEffect(() => {
            const id = window.location.href.split("/").pop();
            // socket.emit("open", { "chat-id": id });
            console.log("open socket");
            console.log("id", id);
            messageStore.loadMetaForChat(id);
            messageStore.loadUsersForChat(id);
            messageStore.uploadFirstMessages(id);
            return () => {
                // socket.emit("close", { "chat-id": id });
                console.log("close socket");
                messageStore.clearChat();
            };
        }, [router.query.typeId]);

        return (
            <>
                <Head>
                    <title>Ξffect</title>
                </Head>
                <NavigationAll>
                    <Chat/>
                </NavigationAll>
            </>
        );
    })
);

export default ChatPage;

