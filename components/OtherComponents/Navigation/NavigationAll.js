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
import { motion, useMotionValue, useTransform, useDragControls, useAnimation } from "framer-motion"
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

    const mobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
    const [hoverLeftName, setHoverLeftName] = React.useState(null)

    const getWidth = () => {
      let w = 70
      if (haveRightToolbar) w = w + 48
      if (haveRightMenu) w = w + 156
      if (hoverLeftName !== null) w = w + 156
      return w
    }

    const getBorderTopRightRadius = () => {
      let btrr = (haveRightMenu || haveRightToolbar) ? 32 : 2
      return btrr
    }

    const getMarginLeft = () => {
      let ml = "70px"
      if (hoverLeftName !== null) ml = "226px"
      return ml
    }

    const getWidthMobile = () => {
      let w = 32
      return w
    }

    const x = useMotionValue(0)
    const containerX = useMotionValue(0)
    const opacity = useTransform(x, [-100, 0, 100], [0.4, 1, 0.4])
    const controls = useAnimation()

    const [drag, setDrag] = React.useState('center')

    // const dragControls = useDragControls()

    // function startDrag(event) {
    //   dragControls.start(event, { snapToCursor: true })
    // }
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
        if (drag === 'center') setDrag('left')
        if (drag === 'right') setDrag('center')
      },
      onSwipedRight: () => {
        if (drag === 'center') setDrag('right')
        if (drag === 'left') setDrag('center')
      },
      ...config,
    });

    if (!mobile) {
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
              <Upbar haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} />
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
                  borderTopLeftRadius: 32,
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
    }

    const dragVariants = {
      left: {
        x: -200,
        y: 0,
      },
      center: {
        x: 0,
        y: 0,
      },
      right: {
        x: 200,
        y: 0,
      },
      bottom: {
        x: 0,
        y: 200,
      }
    }

    if (mobile) {
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
                width: "100%",
              }}
              component={motion.div}
            >
              <Upbar haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} />
              {/* <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} /> */}
              {/* <SidebarSecond hoverLeftName={hoverLeftName} /> */}
              {/* {haveRightToolbar && <RightToolbar />} */}
              {/* {haveRightMenu && <RightMenu />} */}
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
              <Button sx={{ position: 'fixed', top: 8, left: 124, bgcolor: 'text.main' }} onClick={() => setDrag('right')}>
                Изменить
              </Button>
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
                // drag="x"
                // dragDirectionLock
                // dragPropagation
                // dragSnapToOrigin
                // onDirectionLock={axis => console.log(axis)}
                // style={{ opacity }}
                // onPan={(e, info) => containerX.set(info.offset.x)}
                // dragConstraints={{ top: 0, left: -200, right: 200, bottom: 200 }}
                // dragElastic={{ left: 0.5, top: 0, bottom: 0, right: 0.5 }}
                // dragMomentum
                // dragElastic={2}
                variants={dragVariants}
                // dragTransition={{ bounceStiffness: 10000, bounceDamping: 10 }}
                // animate={controls}
                animate={() => {
                  console.log("animate", drag)
                  if (drag === "left") return "left"
                  if (drag === "center") return "center"
                  if (drag === "right") return "right"
                  if (drag === "bottom") return "bottom"
                }}
                // style={{ x: containerX }}
                // onPan={(e, info) => containerX.set(info.offset.x)}
                // onDrag={(e, info) => {
                //   console.log('beforeDrag', info, info.offset.x, controls)
                //   if (info.offset.x > 5) {
                //     console.log('goRight', controls)
                //     controls.stop("center")
                //     controls.start("right")
                //   }
                //   if (info.offset.x < -5) {
                //     console.log('goCenterFromRight')
                //     controls.stop("right")
                //     controls.start("center")
                //   }
                // }}
                // onDragEnd={() => {
                //   console.log('onDragEnd', containerX)
                //   if (containerX.current > 2) {
                //     console.log('goRight')
                //     // setDrag('right')
                //     containerX.set(700)
                //   }
                // }}
                // style={{ x: containerX }}
                component={motion.div}
                // onPan={(e, info) => {
                //   console.log("info", info)
                //   if (info.offset.x > 4 && drag === 'center') {
                //     console.log('goRight')
                //     setDrag('right')
                //   }
                //   if (info.offset.x < -4 && drag === 'right') {
                //     console.log('goCenterFromRight')
                //     setDrag('center')
                //   }
                //   if (info.offset.x < -4 && drag === 'center') {
                //     console.log('goLeft')
                //     setDrag('left')
                //   }
                //   if (info.offset.x > 4 && drag === 'left') {
                //     console.log('goCenterFromLeft')
                //     setDrag('center')
                //   }
                //   if (info.offset.y > 4 && drag === 'center') {
                //     console.log('goBottom')
                //     setDrag('bottom')
                //   }
                //   if (info.offset.y < -4 && drag === 'bottom') {
                //     console.log('goCenterFromBottom')
                //     setDrag('center')
                //   }
                // }}
                // onPan={onPan}
                // onDragStart={
                //   (event, info) => {
                //     console.log("onDragStart", info, info.point.x, info.point.y)
                //     if (info.delta.x > 3 && drag === 'center') {
                //       console.log('goRight')
                //       setDrag('right')
                //     }
                //   } 
                // }
                {...handlers}

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
          )
          }
        </>
      );
    }

  })
);

export default NavigationAll;
