/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, useMediaQuery } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars-2";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useSessionStorage } from 'react-use';
import Sidebar from "./Sidebar";
import SidebarSecond from "./SidebarSecond";
import RightMenu from "./RightMenu";
import Upbar from "./Upbar";

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
};

const SidebarVariantsLeft = {
  visible: {
    x: 0,
  },
  hidden: {
    x: 200
  }
};

const SidebarVariantsRight = {
  visible: {
    x: 0,
  },
  hidden: {
    x: -200
  }
};

const NavigationAll = inject(
  "rootStore",
  "userSt",
  "uiSt",
  "messageSt"
)(
  observer(({ userSt, uiSt, haveRightToolbar = false, haveRightMenu = false, haveRightMenuMore = false, children }) => {
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    // eslint-disable-next-line no-unused-vars
    const [prevPathname, setPrevPathname] = useSessionStorage('prevPathname');

    React.useEffect(() => {
      setPrevPathname(router.pathname);
    }, [router.pathname]);

    React.useEffect(() => {
      // Каждый раз запрашиваются настройки, чтобы понимать,
      // актуален ли токен авторизации
      if (userSt.settings.id === null) {
        uiSt.setLoading('loading', true);
        userSt.getMainSettings('login');
        userSt.getAllSettings();
      };
    }, []);

    const [hoverLeftName, setHoverLeftName] = React.useState("");

    React.useEffect(() => {
      if (router.pathname.includes("/home")) setHoverLeftName("/home");
      if (router.pathname.includes("/knowledge")) setHoverLeftName("/knowledge");
      if (router.pathname.includes("/messages")) setHoverLeftName("/messages");
      if (router.pathname.includes("/settings")) setHoverLeftName("/settings");
    }, [router.pathname]);

    const config = {
      delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
      preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
      trackTouch: true,                     // track touch input
      trackMouse: false,                    // track mouse input
      rotationAngle: 0,                     // set a rotation angle
    };

    const handlers = useSwipeable({
      onSwiped: (eventData) => console.log("User Swiped!", eventData),
      onSwipedLeft: () => {
        if (uiSt.navigation.swipe === "center") uiSt.setNavigation("swipe", "left");
        if (uiSt.navigation.swipe === "right") uiSt.setNavigation("swipe", "center");
      },
      onSwipedRight: () => {
        if (uiSt.navigation.swipe === "center") uiSt.setNavigation("swipe", "right");
        if (uiSt.navigation.swipe === "left") uiSt.setNavigation("swipe", "center");
      },
      ...config,
    });

    if (!mobile) {
      return (
        <Box
          sx={{
            zIndex: 0,
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
              backgroundColor: "background.main",
              height: "100vh",
              overflow: "hidden",
              width: `calc(100% - 592px)`,
              ml: "336px",
              mr: "256px",
            }}
          >
            <Upbar swipe={uiSt.navigation.swipe} setSwipe={uiSt.setNavigation} haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} haveRightMenuMore={haveRightMenuMore} />
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
            {router.pathname.includes("message") || router.pathname.includes("chat") && children}
          </Box>
        </Box>
      );
    }

    if (mobile) {
      return (
        <Box
          sx={{
            zIndex: 0,
            backgroundColor: "background.main",
            minHeight: "100vh",
            overflow: "hidden",
          }}
          {...handlers}
        >
          <AnimatePresence initial={false}>
            {uiSt.navigation.swipe === "right" && <Box
              component={motion.div}
              variants={SidebarVariantsRight}
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
            {uiSt.navigation.swipe === "left" && <Box
              component={motion.div}
              variants={SidebarVariantsLeft}
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
              backgroundColor: "background.main",
              filter: uiSt.navigation.swipe === "right" || uiSt.navigation.swipe === "left" ? "brightness(40%)" : "none",
              height: "100vh",
              overflow: "hidden",
              width: `100vw`,
              ml: 0,
              mr: 0,
            }}
            component={motion.div}
            variants={dragVariants}
            initial={{ x: uiSt.navigation.swipe === "right" ? 200 : 0 }}
            animate={() => {
              console.log("animate", uiSt.navigation.swipe);
              if (uiSt.navigation.swipe === "left") return "left";
              if (uiSt.navigation.swipe === "center") return "center";
              if (uiSt.navigation.swipe === "right") return "right";
              if (uiSt.navigation.swipe === "bottom") return "bottom";
              return null;
            }}
            transition={{
              delay: 0,
              duration: 0.5,
            }}
          >
            <Upbar swipe={uiSt.navigation.swipe} setSwipe={uiSt.setNavigation} haveRightMenu={haveRightMenu} haveRightToolbar={haveRightToolbar} haveRightMenuMore={haveRightMenuMore} />
            {!(router.pathname.includes("/message")) && <Scrollbars
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
            {router.pathname.includes("/message") && children}
          </Box>
        </Box>
      );
    }
    return null;
  })
);

export default NavigationAll;
