/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
    Skeleton,
    Box,
    useMediaQuery,
    Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatBar from "./ChatBar";
import ChatItem from "./ChatItem";


function LoadingSkeleton() {
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
}


const Chat = inject(
    "rootStore",
    "messageSt"
)(
    observer(({ messageSt }) => {
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));

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
                {/* Put the scroll bar always on the bottom */}
                <InfiniteScroll
                    dataLength={messageSt.chat.messages.length}
                    next={() => messageSt.uploadMoreMessages(messageSt.chat.id)}
                    style={{ display: "flex", flexDirection: "column-reverse" }} // To put endMessage and loader to the top.
                    inverse
                    scrollThreshold={0.6}
                    hasMore={messageSt.chat.hasNext}
                    loader={<LoadingSkeleton />}
                    scrollableTarget="scrollableDiv"
                >
                    <Stack sx={{ height: mobile ? "96px" : "96px" }} />
                    {messageSt.chat.messages.length === 0 && <LoadingSkeleton />}
                    {messageSt.chat.messages.map((item, index) => (
                        <Stack
                            key={index.toString()}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                width: "calc(100% - 16px)",
                                pl: "8px",
                            }}
                        >
                            <ChatItem
                                item={item}
                                nextItem={
                                    messageSt.chat.messages.length !== index + 1
                                        ? messageSt.chat.messages[index + 1]
                                        : null
                                }
                            />
                        </Stack>
                    ))}
                </InfiniteScroll>
                <Stack sx={{ height: mobile ? "96px" : "96px" }} />
                <ChatBar />
            </div>
        );
    })
);

export default Chat;

