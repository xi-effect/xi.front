/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, useMediaQuery } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { motion, AnimatePresence } from "framer-motion"
import { useSwipeable } from "react-swipeable";
import Sidebar from "./Sidebar";
import SidebarSecond from "./SidebarSecond";
import RightMenu from "./RightMenu";
import Upbar from "./Upbar";

const NavigationAll = inject(
  "rootStore",
  "settingsStore",
  "uiStore",
  "messageStore"
)(
  observer(({ rootStore, settingsStore, uiStore, messageStore, haveRightToolbar = false, haveRightMenu = false, haveRightMenuMore = false, children }) => {
    const router = useRouter();

    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    React.useEffect(() => {
      if (uiStore.load.app) uiStore.setLoading("loading", true)
      // Главное подключение к сокету
      // socket = io("https://xieffect-socketio.herokuapp.com/", {
      //   withCredentials: true,
      // });
      // Каждый раз запрашиваются настройки, чтобы понимать,
      // актуален ли токен авторизации
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
            uiStore.setLoading("loading", false)
            uiStore.setLoading("app", false)
          }
        });
      rootStore
        .fetchDataScr(`${rootStore.url}/settings/`, "GET")
        .then((data) => {
          if (data) {
            console.log("settings", data);
            const emailArr = data.email.split("@", 2)
            settingsStore.setSettings("emailBefore", emailArr[0])
            settingsStore.setSettings("emailAfter", `@${emailArr[1]}`)
            settingsStore.setSettings("emailConfirmed", data["email-confirmed"])
            settingsStore.setSettings("avatar", data.avatar)
            settingsStore.setSettings("invite", data.code)
            uiStore.setLoading("loading", false)
            uiStore.setLoading("app", false)
          }
        });
    }, []);

    // Сокеты пролсушки для изменения информации в меню для чатов
    // if (socket != null) {
    //   socket.on("add-chat", (arg) => {
    //     console.log(arg);
    //   });
    //   socket.on("edit-chat", (arg) => {
    //     console.log(arg);
    //   });
    //   socket.on("delete-chat", (arg) => {
    //     console.log(arg);
    //   });
    // }

    const [hoverLeftName, setHoverLeftName] = React.useState("")



    React.useEffect(() => {
      if (router.pathname.includes("/home")) setHoverLeftName("/home")
      if (router.pathname.includes("/knowledge")) setHoverLeftName("/knowledge")
      if (router.pathname.includes("/messages")) setHoverLeftName("/messages")
      if (router.pathname.includes("/settings")) setHoverLeftName("/settings")
    }, [router.pathname]);

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
        if (uiStore.navigation.swipe === "center") uiStore.setNavigation("swipe", "left")
        if (uiStore.navigation.swipe === "right") uiStore.setNavigation("swipe", "center")
      },
      onSwipedRight: () => {
        if (uiStore.navigation.swipe === "center") uiStore.setNavigation("swipe", "right")
        if (uiStore.navigation.swipe === "left") uiStore.setNavigation("swipe", "center")
      },
      ...config,
    });

    if (!mobile) {
      return (
        <Box
          sx={{
            zIndex: 0,
            // display: "flex",
            backgroundColor: "background.main",
            minHeight: "100vh",
            overflow: "hidden",
            width: "100%",
          }}
        >
          <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} />
          <SidebarSecond hoverLeftName={hoverLeftName} />
          <RightMenu />
          <Box
            sx={{
              zIndex: 0,
              // display: "flex",
              backgroundColor: "background.main",
              height: "100vh",
              overflow: "hidden",
              width: `calc(100% - 592px)`,
              ml: "336px",
              mr: "256px",
            }}
          >
            {/* && !(router.pathname.includes("/page/")) */}
            <Upbar swipe={uiStore.navigation.swipe} setSwipe={uiStore.setNavigation} haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} haveRightMenuMore={haveRightMenuMore} />
            {!(router.pathname.includes("/message") && !(router.pathname.includes("chat"))) && <Scrollbars
              renderThumbHorizontal={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 4, }} />}
              renderThumbVertical={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 4, }} />}
              universal
              style={{ width: "100%", height: "100%", }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              {children}
            </Scrollbars>}
            {/* || router.pathname.includes("/page/") */}
            {router.pathname.includes("message") || router.pathname.includes("chat") && children}
            {/* <ChatDialog /> */}
          </Box>
        </Box>
      );
    }

    const dragVariants = {
      left: {
        x: -256,
        y: 0,
      },
      center: {
        x: 0,
        y: 0,
      },
      right: {
        x: 336,
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
        <Box
          sx={{
            zIndex: 0,
            // display: "flex",
            backgroundColor: "background.main",
            minHeight: "100vh",
            overflow: "hidden",
            // width: "100%",
          }}
          {...handlers}
        >
          <AnimatePresence initial={false}>
            {uiStore.navigation.swipe === "right" && <Box
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
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0,
                  duration: 0.5,
                }}
              >
                <Sidebar hoverLeftName={hoverLeftName} setHoverLeftName={setHoverLeftName} />
                <SidebarSecond hoverLeftName={hoverLeftName} />
              </Box>
            </Box>}
          </AnimatePresence>
          <AnimatePresence initial={false}>
            {uiStore.navigation.swipe === "left" && <Box
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
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0,
                  duration: 0.5,
                }}
              >
                <RightMenu />
              </Box>
            </Box>}
          </AnimatePresence>
          <Box
            sx={{
              zIndex: 0,
              // display: "flex",
              backgroundColor: "background.main",
              filter: uiStore.navigation.swipe === "right" || uiStore.navigation.swipe === "left" ? "brightness(40%)" : "none",
              height: "100vh",
              overflow: "hidden",
              width: `100vw`,
              ml: 0,
              mr: 0,
            }}
            component={motion.div}
            variants={dragVariants}
            initial={{ x: uiStore.navigation.swipe === "right" ? 200 : 0 }}
            animate={() => {
              console.log("animate", uiStore.navigation.swipe)
              if (uiStore.navigation.swipe === "left") return "left"
              if (uiStore.navigation.swipe === "center") return "center"
              if (uiStore.navigation.swipe === "right") return "right"
              if (uiStore.navigation.swipe === "bottom") return "bottom"
              return null
            }}
            transition={{
              delay: 0,
              duration: 0.5,
            }}
          >
            <Upbar swipe={uiStore.navigation.swipe} setSwipe={uiStore.setNavigation} haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} haveRightMenuMore={haveRightMenuMore} />
            {!(router.pathname.includes("/message")) && !(router.pathname.includes("/page/")) && <Scrollbars
              renderThumbHorizontal={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 4, }} />}
              renderThumbVertical={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 4, }} />}
              universal
              style={{ width: "100vw", height: "100%", overflowY: "hidden !important", }}
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              {children}
            </Scrollbars>}
            {router.pathname.includes("/message") || router.pathname.includes("/page/") && children}
            {/* <ChatDialog /> */}
          </Box>
        </Box>
      );
    }
    return null
  })
);

export default NavigationAll;
