/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { inject, observer } from "mobx-react";

import { Box, Paper, Button, useMediaQuery, useTheme } from "@mui/material";

import Sidebar from "./Sidebar";
import SidebarSecond from "./SidebarSecond";
import RightToolbar from "./RightToolbar";
import Loading from "../Loading/Loading";
import RightMenu from "./RightMenu";
import Upbar from "./Upbar";
import ChatDialog from "../../PagesComponents/Messages/ChatDialog";

import { io } from "socket.io-client";

import socket from "../../../utils/socket";

import { Scrollbars } from 'react-custom-scrollbars-2';

const NavigationAll = inject(
  "rootStore",
  "settingsStore",
  "uiStore",
  "messageStore"
)(
  observer(({ rootStore, settingsStore, uiStore, messageStore, haveSecondMenu = false, haveRightToolbar = false, haveRightMenu = false, children }) => {
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
            // uiStore.setLoading("navigation", false);
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
            let emailArr = data.email.split("@", 2)
            settingsStore.setSettings("emailBefore", emailArr[0])
            settingsStore.setSettings("emailAfter", "@" + emailArr[1])
            settingsStore.setSettings("emailConfirmed", data["email-confirmed"])
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


    const [hoverRight, setHoverRight] = React.useState(false)
    const [hoverLeftName, setHoverLeftName] = React.useState(null)

    const getWidth = () => {
      let w = 70
      if (haveRightToolbar) w = w + 48
      if (haveRightMenu) w = w + 156
      if (hoverLeftName !== null) w = w + 156
      if (mobile) w = 32
      return w
    }

    const getBorderTopRightRadius = () => {
      let btrr = (haveRightMenu || haveRightToolbar) ? 32 : 2
      if (mobile) btrr = 24
      return btrr
    }

    const getMarginLeft = () => {
      let ml = "70px"
      if (mobile) ml = 2
      if (hoverLeftName !== null) ml = "226px"
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
              minHeight: "100vh",
              overflow: 'hidden',
              // width: "calc(100% + 16px)",
            }}
          >
            <Upbar haveRightToolbar={haveRightToolbar} />
            <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} />
            <SidebarSecond hoverLeftName={hoverLeftName} />
            {haveRightToolbar && <RightToolbar />}
            {haveRightMenu && <RightMenu />}
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
            <Paper
              onMouseEnter={() => setHoverLeftName(null)}
              elevation={2}
              sx={{
                transition: '0.8s',
                zIndex: 1,
                margin: 0,
                overflow: 'auto',
                width: `calc(100% - ${getWidth()}px)`,
                height: "calc(100vh - 48px)",
                marginLeft: getMarginLeft(),
                borderTopLeftRadius: mobile ? 24 : 32,
                borderTopRightRadius: getBorderTopRightRadius(),
                backgroundColor: "background.main",

              }}
            >
              {!(router.pathname.includes('/message')) && <Scrollbars
                universal={true}
                style={{ width: "100%", height: "100%" }}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
              >
                {children}
              </Scrollbars>}
              {router.pathname.includes('/message') && children}
            </Paper>
            {/* <ChatDialog /> */}
          </Box>
        )}
      </>
    );
  })
);

export default NavigationAll;
