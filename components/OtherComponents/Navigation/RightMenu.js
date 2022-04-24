/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, useMediaQuery, Divider, MenuList, MenuItem, ListItemText, ListItemIcon, Paper, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReportIcon from "@mui/icons-material/Report";
import { motion } from "framer-motion";
import CustomAvatar from "../Avatar/CustomAvatar";
import HomeNotifications from "./RightMenu/HomeNotifications";

import ReportDialog from "./RightMenu/ReportDialog";

const RightMenu = inject(
  "userSt",
)(
  observer(({ userSt }) => {
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    const sidebar = {
      open: {
        height: mobile ? "300px" : "200px",
        transition: {
          type: "tween",
          stiffness: 20,
          restDelta: 2
        }
      },
      closed: {
        height: "72px",
        transition: {
          delay: 0.5,
          type: "tween",
          stiffness: 400,
          damping: 40
        }
      }
    };

    const variantsCont = {
      open: {
        transition: {
          staggerChildren: 0.07, delayChildren: 0.2
        }
      },
      closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
      }
    };

    const variantsChild = {
      open: {
        y: 0,
        opacity: 1,
        transition: {

        }
      },
      closed: {
        y: -10,
        opacity: 0,
        transition: {
          duration: 0.2,
          y: { stiffness: 1000 }
        }
      }
    };

    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
      <Paper
        elevation={12}
        sx={{
          position: "absolute",
          zIndex: 20,
          top: 0,
          right: 0,
          height: "100vh",
          width: "256px",
          pb: mobile ? 10 : 2,
          pt: 0,
          bgcolor: "primary.dark",
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          sx={{
            height: "100%",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              width: "232px",
              mt: 1.5,
              bgcolor: "secondary.dark",
              borderRadius: 2,
            }}
            component={motion.div}
            initial={false}
            animate={open ? "open" : "closed"}
            variants={sidebar}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={0}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
                onClick={() => setOpen(!open)}
                sx={{
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <Box
                  sx={{ height: 64, width: 64, m: 1, mt: "-2px", mr: 0, cursor: "pointer" }}
                >
                  <CustomAvatar avatar={{ ...userSt.settings.avatar, bgcolor: "rgba(0,0,0,0)" }} viewBox={{ x: "50", y: "-110", width: "690", height: "790" }} reverse />
                </Box>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  sx={{
                    pt: 1,
                    width: "calc(100% - 80px)"
                  }}
                >
                  <Typography variant="h6" sx={{ mt: 0, ml: 0, mr: 0, width: "calc(100% - 0px)" }} noWrap>
                    {userSt.settings.username}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 0, ml: 0, mr: 0, width: "calc(100% - 0px)" }}>
                    {`${userSt.settings.username} ${userSt.settings.username}`}
                  </Typography>
                </Stack>
              </Stack>
              <Divider
                component={motion.hr}
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0, }}
                transition={{ duration: 1 }}
                sx={{
                  bgcolor: "primary.dark",
                  height: "4px",
                  borderRadius: "2px",
                  width: "calc(100% - 8px)",
                  mt: "2px",
                  ml: 0.5,
                  mr: 0.5,
                }}
              />
              <MenuList
                variants={variantsCont}
                component={motion.ul}
                sx={{
                  width: "100%",
                }}
              >
                <MenuItem disabled={!open} component={motion.li} variants={variantsChild} sx={{ cursor: "pointer" }} onClick={() => {
                  router.push(`/profile/${userSt.settings.id}/`);
                }}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Профиль
                  </ListItemText>
                </MenuItem>
                <MenuItem disabled={!open} component={motion.li} variants={variantsChild} sx={{ cursor: "pointer" }} onClick={() => {
                  setOpenDialog(true);
                }}>
                  <ListItemIcon>
                    <ReportIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Оставить отзыв
                  </ListItemText>
                </MenuItem>
                <MenuItem disabled={!open} component={motion.li} variants={variantsChild} sx={{ "& .MuiMenuItem-root": { cursor: "pointer" } }} onClick={() => {
                  userSt.logout();
                }}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "error.main" }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Выйти
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Stack>
          </Paper>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "100%", width: "100%", zIndex: 100, }}
          >
            <Stack sx={{ height: "100%", width: "100%", mt: 1, mb: "auto" }}>
              {router.pathname.includes("/home") && <HomeNotifications />}
            </Stack>
          </Stack>
          <ReportDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Stack >
      </Paper >
    );
  })
);

export default RightMenu;
