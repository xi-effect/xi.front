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
import { motion, useMotionValue, useTransform, useDragControls, AnimatePresence, useAnimation } from "framer-motion"
import { useSwipeable } from 'react-swipeable';

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
      if (uiStore.load.app) uiStore.setLoading("loading", true)
      setTimeout(() => {
        uiStore.setLoading("loading", false)
        uiStore.setLoading("app", false)
      }, 3000);
      rootStore
        .fetchDataScr(`${rootStore.url}/settings/main/`, "GET")
        .then((data) => {
          console.log("data1", data)
          if (data) {
            console.log("settings/main", data);
            messageStore.loadChatsInMenu();
            settingsStore.setSettings("darkTheme", data["dark-theme"]);
            settingsStore.setSettings("id", data.id);
            settingsStore.setSettings("username", data.username);

          } else {
            
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
            settingsStore.setSettings("avatar", data["avatar"])
            settingsStore.setSettings("invite", data.code)
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
    const [hoverLeftName, setHoverLeftName] = React.useState('')

    React.useEffect(() => {
      if (router.pathname.includes('/home')) setHoverLeftName('/home')
      if (router.pathname.includes('/knowledge')) setHoverLeftName('/knowledge')
      if (router.pathname.includes('/messages')) setHoverLeftName('/messages')
      if (router.pathname.includes('/settings')) setHoverLeftName('/settings')
    }, [router.pathname]);

    const getWidth = () => {
      let w = 240
      if (haveRightToolbar) w = w + 64
      if (haveRightMenu) w = w + 156
      return w
    }

    const getMarginLeft = () => {
      let ml = "226px"
      return ml
    }

    const getWidthMobile = () => {
      let w = 32
      return w
    }

    const config = {
      delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
      preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
      trackTouch: true,                     // track touch input
      trackMouse: false,                    // track mouse input
      rotationAngle: 0,                     // set a rotation angle
    }

    const handlers = useSwipeable({
      onSwiped: (eventData) => console.log("User Swiped!", eventData),
      onSwipedLeft: () => {
        if (uiStore.navigation.swipe === 'center' && (haveRightMenu || haveRightToolbar)) uiStore.setNavigation('swipe', 'left')
        if (uiStore.navigation.swipe === 'right') uiStore.setNavigation('swipe', 'center')
      },
      onSwipedRight: () => {
        if (uiStore.navigation.swipe === 'center') uiStore.setNavigation('swipe', 'right')
        if (uiStore.navigation.swipe === 'left') uiStore.setNavigation('swipe', 'center')
      },
      ...config,
    });

    if (!mobile) {
      return (
        <>
          <Box
            sx={{
              zIndex: 0,
              // display: "flex",
              backgroundColor: "primary.main",
              minHeight: "100vh",
              overflow: 'hidden',
              width: "100%",
            }}
          >
            <Box
              sx={{ zIndex: 100 }}
            >
              <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} />
              <SidebarSecond hoverLeftName={hoverLeftName} />
            </Box>
            {haveRightToolbar && <RightToolbar />}
            {haveRightMenu && <RightMenu />}
            <Box
              sx={{
                zIndex: 0,
                // display: "flex",
                backgroundColor: "primary.main",
                minHeight: "100vh",
                overflow: 'hidden',
                width: `calc(100% - ${getWidth()}px)`,
                ml: 32,
              }}
            >
              <Upbar swipe={uiStore.navigation.swipe} setSwipe={uiStore.setNavigation} haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} />
              <Paper
                onMouseEnter={() => setHoverLeftName(null)}
                elevation={2}
                sx={{
                  transition: '0.8s',
                  zIndex: 1,
                  margin: 0,
                  overflow: 'auto',
                  width: `calc(100% - 32px)`,
                  // width: `100%`,
                  height: "calc(100vh - 48px)",
                  // marginLeft: getMarginLeftMobile(),
                  ml: 2,
                  // mr: 1,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
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
          </Box>
        </>
      );
    }

    const getLeftDV = () => {
      // if (router.pathname === '/home' || router.pathname === '/settings') return 64
      if (haveRightToolbar) return -64
      if (haveRightMenu) return -156
      return 0
    }

    const dragVariants = {
      left: {
        x: getLeftDV(),
        y: 0,
      },
      center: {
        x: 0,
        y: 0,
      },
      right: {
        x: 256,
        y: 0,
      },
      bottom: {
        x: 0,
        y: 200,
      }
    }

    const SidebarVariantsLeft = {
      visible: {
        x: 0,
      },
      hidden: {
        x: 200
      }
    }

    const SidebarVariantsRight = {
      visible: {
        x: 0,
      },
      hidden: {
        x: -200
      }
    }

    if (mobile) {
      return (
        <>
          <Box
            sx={{
              zIndex: 0,
              // display: "flex",
              backgroundColor: "primary.main",
              minHeight: "100vh",
              overflow: 'hidden',
              // width: "100%",
            }}
            {...handlers}
          >
            <AnimatePresence initial={false}>
              {uiStore.navigation.swipe === 'right' && <Box
                component={motion.div}
                variants={SidebarVariantsRight}
                // initial={{ x: -200 }}
                animate="visible"
                transition={{
                  delay: 0,
                  duration: 0.5,
                }}
                exit={{ x: -200, opacity: 0 }}
                sx={{ zIndex: 100 }}
              >
                <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} />
                <SidebarSecond hoverLeftName={hoverLeftName} />
              </Box>}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {uiStore.navigation.swipe === 'left' && haveRightToolbar && <Box
                component={motion.div}
                variants={SidebarVariantsLeft}
                // initial={{ x: 200 }}
                animate="visible"
                transition={{
                  delay: 0,
                  duration: 0.5,
                }}
                exit={{ x: 200, opacity: 0 }}
                sx={{ zIndex: 100 }}
              >
                <RightToolbar />
              </Box>}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {uiStore.navigation.swipe === 'left' && haveRightMenu && <Box
                component={motion.div}
                variants={SidebarVariantsLeft}
                // initial={{ x: 200 }}
                animate="visible"
                transition={{
                  delay: 0,
                  duration: 0.5,
                }}
                exit={{ x: 200, opacity: 0 }}
                sx={{ zIndex: 100 }}
              >
                <RightMenu />
              </Box>}
            </AnimatePresence>
            <Box
              sx={{
                zIndex: 0,
                // display: "flex",
                backgroundColor: "primary.main",
                minHeight: "100vh",
                overflow: 'hidden',
                width: "100%",
              }}
              component={motion.div}
              variants={dragVariants}
              initial={{ x: uiStore.navigation.swipe === 'right' ? 200 : 0 }}
              animate={() => {
                console.log("animate", uiStore.navigation.swipe)
                if (uiStore.navigation.swipe === "left") return "left"
                if (uiStore.navigation.swipe === "center") return "center"
                if (uiStore.navigation.swipe === "right") return "right"
                if (uiStore.navigation.swipe === "bottom") return "bottom"
              }}
              transition={{
                delay: 0,
                duration: 0.5,
              }}
            >
              <Upbar swipe={uiStore.navigation.swipe} setSwipe={uiStore.setNavigation} haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} />
              <Paper
                onMouseEnter={() => setHoverLeftName(null)}
                elevation={2}
                sx={{
                  transition: '0.8s',
                  zIndex: 1,
                  margin: 0,
                  overflow: 'auto',
                  width: `calc(100% - ${getWidthMobile()}px)`,
                  // width: `100%`,
                  height: "calc(100vh - 48px)",
                  // marginLeft: getMarginLeftMobile(),
                  ml: 2,
                  // mr: 1,
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
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
          </Box>
        </>
      );
    }

  })
);

export default NavigationAll;
