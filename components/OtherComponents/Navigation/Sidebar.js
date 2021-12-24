/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";

import {
  Stack,
  useTheme,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import { useSnackbar } from 'notistack';

import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SettingsIcon from "@mui/icons-material/Settings";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxIcon from '@mui/icons-material/AddBox';

import { motion } from "framer-motion";
import DialogCreateCommunity from "./DialogCreateCommunity";

const Sidebar = inject(
  "rootStore",
  "uiStore",
  "messageStore"
)(
  observer(
    ({
      rootStore,
      uiStore,
      messageStore,
      hoverLeft,
      setHoverLeft,
      hoverLeftName,
      setHoverLeftName,
    }) => {
      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const [openDialogCC, setOpenDialogCC] = React.useState(false)
      const theme = useTheme();
      const router = useRouter();
      // console.log("rerenderSidebar")
      const menuList = [
        {
          id: 0,
          icon: <HomeIcon sx={{ fontSize: 28 }} />,
          label: "Главная",
          href: "/home",
        },
        {
          id: 1,
          icon: <MenuBookIcon sx={{ fontSize: 28 }} />,
          label: "Знания",
          href: "/knowledge",
        },
        // {
        //   id: 2,
        //   icon: <MessageIcon sx={{ fontSize: 28 }} />,
        //   label: "Общение",
        //   href: "/messages",
        // },
        {
          id: 3,
          icon: <AddBoxIcon sx={{ fontSize: 28 }} />,
          label: "Создать сообщество",
          href: "createcommunity",
        },
        // {
        //   id: 4,
        //   icon: <SettingsIcon sx={{ fontSize: 28 }} />,
        //   label: "Настройки",
        //   href: "/settings",
        // },

      ];

      const communityList = [
        {
          id: 0,
          label: "Тестовое сообщество",
          cId: 1,
        },
      ];

      return (
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{
            position: "absolute",
            pt: 2,
            width: 80,
            height: "100vh",
            // bgcolor: 'grey.800',
          }}
        >
          {menuList.map((item, index) => (
            <Tooltip key={index.toString()} placement="right" title={item.label}>
              <IconButton
                component={motion.li}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (item.href === "/knowledge") {
                    router.push(`${item.href}/pages`);
                  }
                  else if (item.href === "createcommunity") {
                    setOpenDialogCC(true)
                    enqueueSnackbar('Эту функцию мы ещё только разрабатываем', {
                      variant: 'info',
                    })
                  }
                  else router.push(item.href);
                }}
                sx={{
                  bgcolor: router.pathname.includes(item.href) ? "primary.main" : "",
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: router.pathname.includes(item.href) ? "primary.main" : "",
                  },
                }}
              >
                {item.icon}
              </IconButton>
            </Tooltip>
          ))}
          {communityList.map((item, index) => (
            <Tooltip key={index.toString()} placement="right" title={item.label}>
              <IconButton
                component={motion.li}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  router.push(`/community/${item.cId}`);
                }}
                sx={{
                  bgcolor: router.pathname.includes(`/community/${item.cId}`) ? "primary.main" : "primary.dark",
                  borderRadius: router.pathname.includes(`/community/${item.cId}`) ? '8px' : '21px',
                  height: '42px',
                  width: '42px',
                  "&:hover": {
                    bgcolor: router.pathname.includes(`/community/${item.cId}`) ? "primary.main" : "primary.dark",
                  },
                }}
              >
                {item.label[0].toUpperCase()}
              </IconButton>
            </Tooltip>
          ))}
          <Box sx={{
            height: '100%',
          }}>

          </Box>
          <Tooltip placement="right" title={'Настройки'}>
            <IconButton
              component={motion.li}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                router.push('/settings');
              }}
              sx={{
                bgcolor: router.pathname.includes('/settings') ? "primary.main" : "",
                borderRadius: 2,
                "&:hover": {
                  bgcolor: router.pathname.includes('/settings') ? "primary.main" : "",
                },
              }}
            >
              <SettingsIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Tooltip>
          <Box sx={{
            height: '4px',
          }}>

          </Box>
          <DialogCreateCommunity openDialogCC={openDialogCC} setOpenDialogCC={setOpenDialogCC} />
        </Stack >
      );
    }
  )
);

export default Sidebar;
