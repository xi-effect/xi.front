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
import ChatBar from "./ChatBar";
import ChatItem from "./ChatItem";

import InfiniteScroll from "react-infinite-scroll-component";

// import socket from "../../../../utils/socket";

const LoadingSkeleton = () => {
    return (
        <>
            {[...Array(30)].map((item, index) => (
                <Stack
                    key={index.toString()}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        width: "calc(100% - 20px)",
                        marginLeft: "20px",
                        height: 64,
                    }}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            position: "relative",
                            pt: 1,
                            pr: 2,
                            mt: 1,
                            borderRadius: 1,
                            // width: "100%",
                            // maxWidth: 1200,
                            width: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "12px",
                                left: "2px",
                                height: 64,
                                width: 64,
                            }}
                        >
                            <Skeleton
                                sx={{
                                    ml: 1,
                                    height: 64,
                                    width: 64,
                                    borderRadius: 1,
                                }}
                            />
                        </Box>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                position: "relative",
                                pl: 1,
                                pr: 6,
                                ml: 10,
                                width: "calc(100% - 72px)",
                            }}
                        >
                            <Skeleton
                                sx={{
                                    height: 64,
                                    ml: 1,
                                    width: "100%",
                                    borderRadius: 1,
                                }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            ))}
        </>
    );
};

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { ... } } // See the "paths" section below
//         ],
//         fallback: "blocking" // See the "fallback" section below
//     };
// }

const Chat = inject(
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

        // React.useEffect(() => {
        //     const id = window.location.href.split("/").pop();
        //     // socket.emit("open", { "chat-id": id });
        //     console.log("open socket");
        //     console.log("id", id);
        //     messageStore.loadMetaForChat(id);
        //     messageStore.loadUsersForChat(id);
        //     messageStore.uploadFirstMessages(id);
        //     return () => {
        //         // socket.emit("close", { "chat-id": id });
        //         console.log("close socket");
        //         messageStore.clearChat();
        //     };
        // }, [router.query.typeId]);

        return (
            <div
                id="scrollableDiv"
                style={{
                    height: "calc(100vh - 48px)",
                    width: "100%",
                    overflowY: "auto",
                    overFlowX: "hidden",
                    display: "flex",
                    position: "relative",
                    flexDirection: "column-reverse",
                }}
            >
                {/*Put the scroll bar always on the bottom*/}
                <InfiniteScroll
                    dataLength={messageStore.chat.messages.length}
                    next={() => messageStore.uploadMoreMessages(messageStore.chat.id)}
                    style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                    inverse={true} //
                    scrollThreshold={0.6}
                    hasMore={messageStore.chat.hasNext}
                    //endMessage={<Typography align="center" sx={{ color: "text.main", width: "100%", m: 4 }} variant="subtitle2"> Это всё </Typography>}
                    loader={<LoadingSkeleton />}
                    scrollableTarget="scrollableDiv"
                >
                    <Stack sx={{ height: mobile ? "96px" : "96px" }}></Stack>
                    {messageStore.chat.messages.length === 0 && <LoadingSkeleton />}
                    {messageStore.chat.messages.map((item, index) => (
                        <Stack
                            key={index.toString()}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            // spacing={4}
                            sx={{
                                width: "calc(100% - 16px)",
                                pl: "8px",
                                // mt: 2,
                                // marginRight: 2,
                            }}
                        >
                            <ChatItem
                                item={item}
                                nextItem={
                                    messageStore.chat.messages.length != index + 1
                                        ? messageStore.chat.messages[index + 1]
                                        : null
                                }
                            />
                        </Stack>
                    ))}
                </InfiniteScroll>
                <Stack sx={{ height: mobile ? "96px" : "96px" }}></Stack>
                <ChatBar />
            </div>
        );
    })
);

export default Chat;

