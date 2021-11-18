/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { inject, observer } from "mobx-react";

import { Box, Paper, Button, useMediaQuery, useTheme } from "@mui/material";

import Sidebar from "./Sidebar";
import Helpbar from "./Helpbar";
import Loading from "../Loading/Loading";
import SideDownbar from "./SideDownbar";
import Upbar from "./Upbar";
import ChatDialog from "../../PagesComponents/Messages/ChatDialog";

import { io } from "socket.io-client";

import socket from "../../../utils/socket";

const NavigationAll = inject(
  "rootStore",
  "settingsStore",
  "uiStore",
  "messageStore"
)(
  observer(({ rootStore, settingsStore, uiStore, messageStore, hasSecondMenu = false, hasRightToolbar = false, hasRightlist = false, children }) => {
    const theme = useTheme();
    const router = useRouter();

    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    React.useEffect(() => {
      // Главное подключение к сокету
      socket = io("https://xieffect-socketio.herokuapp.com/", {
        withCredentials: true,
      });
      // Каждый раз запрашиваются настройки, чтобы понимать,
      // актуален ли токен авторизации
      rootStore
        .fetchDataScr(`${rootStore.url}/settings/main/`, "GET")
        .then((data) => {
          if (data) {
            console.log("settings/main", data);

            messageStore.loadChatsInMenu();
            uiStore.setLoading("navigation", false);
            settingsStore.setSettings("darkTheme", data["dark-theme"]);
            settingsStore.setSettings("id", data.id);
            settingsStore.setSettings("username", data.username);
          }
        });
      rootStore
        .fetchDataScr(`${rootStore.url}/settings/`, "GET")
        .then((data) => {
          if (data) {
            console.log("settings", data);
            settingsStore.setSettings("avatar", data["avatar"]);
          }
        });
    }, []);

    // Сокеты пролсушки для изменения информации в меню для чатов
    if (socket != null) {
      socket.on("add-chat", (arg) => {
        console.log(arg);
      });
      socket.on("edit-chat", (arg) => {
        console.log(arg);
      });
      socket.on("delete-chat", (arg) => {
        console.log(arg);
      });
    }

    const [hoverLeft, setHoverLeft] = React.useState(false)
    const [hoverRight, setHoverRight] = React.useState(false)

    const getWidth = () => {
      let w = 70
      if (hasRightToolbar) w = w + 32
      if (hasRightlist) w = w + 256
      if (hoverLeft) w = w + 256
      if (mobile) w = 32
      return w
    }

    const getBorderTopRightRadius = () => {
      let btrr = (hasRightlist || hasRightToolbar) ? 32 : 2
      if (mobile) btrr = 24
      return btrr
    }

    const getMarginLeft = () => {
      let ml = "70px"
      if (mobile) ml = 2
      if (hoverLeft) ml = "326px" 
      return ml
    }


    return (
      <>
        {uiStore.loading["navigation"] && <Loading />}
        {!uiStore.loading["navigation"] && (
          <Box
            sx={{
              zIndex: 0,
              // display: "flex",
              backgroundColor: "primary.main",
              height: "100%",
              width: "100%",
            }}
          >
            <Upbar/>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "block",
                  lg: "block",
                  xl: "block",
                },
              }}
            >
              <Sidebar hoverLeft={hoverLeft} setHoverLeft={setHoverLeft}/>
            </Box>
            {/* <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                  lg: "none",
                  xl: "none",
                },
              }}
            >
              <SideDownbar />
            </Box> */}
            {/* <Helpbar openHelpMenu={openHelpMenu} setOpenHelpMenu={setOpenHelpMenu} /> */}
            <Paper
                    onMouseEnter={() => setHoverLeft(false)}
              elevation={1}
              sx={{
                transition: '0.8s',
                zIndex: 0,
                margin: 0,
                height: "calc(100vh - 48px)",
                width: `calc(100% - ${getWidth()}px)`,
                marginLeft: getMarginLeft(),
                borderTopLeftRadius:  mobile ? 24 : 32,
                borderTopRightRadius: getBorderTopRightRadius(),
                backgroundColor: "background.main",
              }}
            >
              {children}
            </Paper>
            {/* <ChatDialog /> */}
          </Box>
        )}
      </>
    );
  })
);

export default NavigationAll;
