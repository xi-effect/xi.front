/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import {
  Stack,
  Tooltip,
  IconButton,
  Box,
} from "@mui/material";
import { useSnackbar } from "notistack";

import { motion } from "framer-motion";
import dynamic from "next/dynamic"

const HomeIcon = dynamic(() => import('@mui/icons-material/Home'));
const MenuBookIcon = dynamic(() => import('@mui/icons-material/MenuBook'));
const SettingsIcon = dynamic(() => import('@mui/icons-material/Settings'));
const AddBoxIcon = dynamic(() => import('@mui/icons-material/AddBox'));

const DialogCreateCommunity = dynamic(
  () => import("./DialogCreateCommunity"),
  { ssr: false }
)



const Sidebar = inject()(
  observer(() => {
    const { enqueueSnackbar } = useSnackbar();
    const [openDialogCC, setOpenDialogCC] = React.useState(false)
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
          // bgcolor: "grey.800",
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
                  enqueueSnackbar("Эту функцию мы ещё только разрабатываем", {
                    variant: "info",
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
                borderRadius: router.pathname.includes(`/community/${item.cId}`) ? "8px" : "21px",
                height: "42px",
                width: "42px",
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
          height: "100%",
        }} />
        <Tooltip placement="right" title="Настройки">
          <IconButton
            component={motion.li}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              router.push("/settings");
            }}
            sx={{
              bgcolor: router.pathname.includes("/settings") ? "primary.main" : "",
              borderRadius: 2,
              "&:hover": {
                bgcolor: router.pathname.includes("/settings") ? "primary.main" : "",
              },
            }}
          >
            <SettingsIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
        <Box sx={{
          height: "4px",
        }} />
        <DialogCreateCommunity openDialogCC={openDialogCC} setOpenDialogCC={setOpenDialogCC} />
      </Stack >
    );
  }
  )
);

export default Sidebar;
