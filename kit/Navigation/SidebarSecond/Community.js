
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Typography, MenuItem, Stack, MenuList, ListItemIcon, ListItemText, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ForumIcon from "@mui/icons-material/Forum";
import TodayIcon from "@mui/icons-material/Today";
import ArticleIcon from '@mui/icons-material/Article';
import { Scrollbars } from "react-custom-scrollbars-2";
import { useLocalStorage } from 'react-use';
import { motion } from "framer-motion";



const arrowVariants = {
    open: {
        rotate: 90,
        x: -15,
    },
    closed: {
        rotate: 0,
    }
};

const Channel = inject("communityChannelsSt")(observer(({ communityChannelsSt, index }) => {
    const channel = communityChannelsSt.channels[index];

    const [hoverCategory, setHoverCategory] = React.useState(null);

    const router = useRouter();
    const splitPathname = router.pathname.split("/");
    const lastType = splitPathname[splitPathname.length - 2];
    const typeId = router.query.typeId ?? null;

    const iconSelect = (type) => {
        if (type === "schedule") return <TodayIcon fontSize="small" />;
        if (type === "chat") return <ForumIcon fontSize="small" />;
        if (type === "room") return <RecordVoiceOverIcon fontSize="small" />;
        if (type === "page") return <ArticleIcon fontSize="small" />;
        return null;
    };

    if (channel.type === "category") {
        return (
            <Stack
                key={index.toString()}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    mt: "10px",
                    mb: "2px",
                    pl: 1,
                    pr: 1,
                    width: "100%"
                }}
            >
                <Stack
                    onClick={() => communityChannelsSt.setChannel(index, "open", !channel.open)}
                    onMouseEnter={() => setHoverCategory(index)}
                    onMouseLeave={() => setHoverCategory(null)}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        width: "100%",
                        pl: 0,
                        pr: 1,
                        cursor: "pointer",
                        color: "text.secondary",
                        "&:hover": {
                            color: "text.primary",
                        },
                        zIndex: 1
                    }}
                >
                    <ArrowForwardIosIcon
                        component={motion.svg}
                        variants={arrowVariants}
                        animate={channel.open ? "open" : "closed"}
                        transition={{ type: "ease", duration: 0.2 }}
                        sx={{ fontSize: 8 }}
                    />
                    <Typography
                        variant="subtitle2"
                        sx={{
                            ml: 1,
                            fontSize: 14,
                        }}
                    >
                        {channel.name.toLowerCase()}
                    </Typography>
                    {hoverCategory === index && <AddIcon sx={{ ml: "auto", mr: 0, fontSize: 20 }} />}
                </Stack>
                {channel.open && <MenuList
                    sx={{ width: "100%", pl: 2, pr: 1, zIndex: 1 }}
                >
                    {channel.children.map((child, indexCh) => (
                        <MenuItem
                            onClick={() => router.push(`/community/${router.query.id}/${child.type}/${child.id}`)}
                            key={indexCh.toString()}
                            sx={{
                                width: "100%",
                                borderRadius: 1,
                                height: 36,
                                bgcolor: (lastType === child.type && typeId === child.id) ? "action.hover" : null,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    "&.MuiListItemIcon-root": {
                                        minWidth: "2px !important",
                                        fontSize: 26,
                                    }
                                }}
                            >
                                {iconSelect(child.type)}
                            </ListItemIcon>
                            <ListItemText
                                disableTypography
                                sx={{
                                    pl: 1,
                                    fontSize: 16,
                                }}
                            >
                                {child.name}
                            </ListItemText>
                        </MenuItem>
                    ))}
                </MenuList>
                }
            </Stack>
        );
    }
    if (channel.type !== "category") {
        return (
            <MenuItem
                onClick={() => router.push(`/community/${router.query.id}/${channel.type}/${channel.id}`)}
                sx={{
                    width: "calc(100% - 16px)",
                    borderRadius: 1,
                    height: 36,
                    ml: 1,
                    mr: 1,
                    bgcolor: (lastType === channel.type && typeId === channel.id) ? "action.hover" : null,
                }}
            >
                <ListItemIcon
                    sx={{
                        "&.MuiListItemIcon-root": {
                            minWidth: "2px !important",
                            fontSize: 26,
                        }
                    }}
                >
                    {iconSelect(channel.type)}
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    sx={{
                        pl: 1,
                        fontSize: 16,
                    }}
                >
                    {channel.name}
                </ListItemText>
            </MenuItem>
        );
    }
    return null;
}));

const MenuCommunity = inject("rootStore", "uiSt", "messageSt", "communityChannelsSt")(observer(({ uiSt, communityChannelsSt }) => {
    const [valueLS, setValueLS] = useLocalStorage('second-menu-c-upper-items-position-is-vert');

    useEffect(() => {
        if (valueLS === undefined) {
            setValueLS(true);
        }
    }, []);

    return (
        <MenuList
            sx={{
                width: "100%",
                height: "100%",
                pl: 0,
                pr: 0,
                zIndex: 1,
                overflow: "hidden",
            }}
        >
            <Scrollbars
                renderThumbHorizontal={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 4, }} />}
                renderThumbVertical={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 4, }} />}
                universal
                style={{ height: '100%', overflowY: "hidden !important", }}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
            >
                {communityChannelsSt.channels.map((channel, index) => (
                    <Channel index={index} key={index.toString()} />
                ))}
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        pt: 4,
                        pb: 12,
                    }}
                >
                    <Button onClick={() => uiSt.setDialogs('channelCreation', true)} variant="contained">
                        Создать канал
                    </Button>
                </Stack>
            </Scrollbars>
        </MenuList>
    );
}));

export default MenuCommunity;