/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

import { Menu, MenuItem, Stack, Link, Grid, Box, Typography } from "@mui/material";

import { inject, observer } from "mobx-react";
import moment from "moment";

import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomAvatar from "kit/Avatar/CustomAvatar";

moment.locale("ru", {
    calendar: {
        lastDay: "[Yesterday, at] HH:mm",
        sameDay: "[Today, at] HH:mm",
        nextDay: "[Tomorrow at] LT",
        lastWeek: "HH:mm, DD/MM",
        nextWeek: "dddd [at] LT",
        sameElse: "L"
    }
});

const ChatItem = inject("rootStore", "uiSt", "messageSt", "userSt")(observer(({ messageSt, userSt, item, nextItem }) => {
    const [contextMenu, setContextMenu] = React.useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };


    if (nextItem !== null) {
        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    position: "relative",
                    mt: nextItem["sender-name"] === item["sender-name"] ? 0 : 3,
                    borderRadius: 1,
                    width: "100%",
                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
            >
                {nextItem["sender-name"] !== item["sender-name"] &&
                    <Box
                        sx={{
                            position: "absolute",
                            top: "2px",
                            left: "8px",
                            height: 52,
                            width: 52,
                        }}>
                        <CustomAvatar avatar={item["sender-avatar"]} viewBox={{ x: "50", y: "-100", width: "732", height: "732" }} />
                    </Box>}
                <Stack
                    onContextMenu={handleContextMenu}
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        position: "relative",
                        pl: 1,
                        pr: 6,
                        ml: 8,
                        width: "calc(100% - 56px)",
                        "&:hover": {
                            bgcolor: "background.1",
                        }
                    }}
                >
                    {nextItem["sender-name"] !== item["sender-name"] && <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={2}
                    >
                        <Link
                            sx={{
                                fontSize: 22,
                                cursor: "pointer",
                                color: "text.primary",
                            }}
                            underline="hover"
                        >
                            {item["sender-name"]}
                        </Link>
                        <Typography sx={{ color: "text.secondary", pt: "8px" }} variant="subtitle2"> {moment(item.sent).calendar()} </Typography>
                    </Stack>}
                    <Grid container wrap="nowrap">
                        <Grid item xs>
                            <Typography> {item.content} </Typography>
                        </Grid>
                    </Grid>
                    {messageSt.chat.role !== "muted" && <Menu
                        open={contextMenu !== null}
                        onClose={handleClose}
                        anchorReference="anchorPosition"
                        anchorPosition={
                            contextMenu !== null
                                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                : undefined
                        }
                    >
                        <Typography align="center" sx={{ color: "text.dark", width: "100%", }} variant="subtitle2"> {moment(item.sent).calendar()} </Typography>
                        {item["sender-id"] !== userSt.settings.id && <MenuItem onClick={handleClose}> <ReplyIcon sx={{ mr: 1 }} /> Ответить </MenuItem>}
                        {item["sender-id"] === userSt.settings.id && <MenuItem onClick={handleClose}> <EditIcon sx={{ mr: 1 }} /> Редактировать</MenuItem>}
                        {(item["sender-id"] === userSt.settings.id || messageSt.chat.role === "moder" || messageSt.chat.role === "admin" || messageSt.chat.role === "owner") && <MenuItem onClick={handleClose}> <DeleteForeverIcon sx={{ mr: 1 }} />Удалить</MenuItem>}
                    </Menu>}
                </Stack >
            </Stack >
        );
    }

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
                position: "relative",
                mt: 2,
                borderRadius: 1,
                width: "100%",
                "&:hover": {
                    bgcolor: "action.hover",
                },
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "2px",
                    left: "8px",
                    height: 52,
                    width: 52,
                }}>
                <CustomAvatar avatar={item["sender-avatar"]} />
            </Box>
            <Stack
                onContextMenu={handleContextMenu}
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    position: "relative",
                    pl: 1,
                    pr: 6,
                    ml: 8,
                    width: "calc(100% - 54px)",
                    "&:hover": {
                        bgcolor: "background.1",
                    }
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Link
                        sx={{
                            fontSize: 22,
                            cursor: "pointer",
                            color: "text.primary",
                        }}
                        underline="hover"
                    >
                        {item["sender-name"]}
                    </Link>
                    <Typography sx={{ color: "text.secondary", pt: "8px" }} variant="subtitle2"> {moment(item.sent).calendar()} </Typography>
                </Stack>
                <Grid container wrap="nowrap">
                    <Grid item xs>
                        <Typography> {item.content} </Typography>
                    </Grid>
                </Grid>
                {messageSt.chat.role !== "muted" && <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <Typography align="center" sx={{ color: "text.dark", width: "100%", }} variant="subtitle2"> {moment(item.sent).calendar()} </Typography>
                    {item["sender-id"] !== userSt.settings.id && <MenuItem onClick={handleClose}> <ReplyIcon sx={{ mr: 1 }} /> Ответить </MenuItem>}
                    {item["sender-id"] === userSt.settings.id && <MenuItem onClick={handleClose}> <EditIcon sx={{ mr: 1 }} /> Редактировать</MenuItem>}
                    {(item["sender-id"] === userSt.settings.id || messageSt.chat.role === "moder" || messageSt.chat.role === "admin" || messageSt.chat.role === "owner") && <MenuItem onClick={handleClose}> <DeleteForeverIcon sx={{ mr: 1 }} />Удалить</MenuItem>}
                </Menu>}
            </Stack >
        </Stack >
    );

}));

export default ChatItem;
