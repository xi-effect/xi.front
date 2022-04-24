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

import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import { motion } from "framer-motion";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dynamic from "next/dynamic"
import SidebarCommunityIcon from "./SidebarCommunityIcon";


const DialogCreateCommunity = dynamic(
  () => import("./DialogCreateCommunity"),
  { ssr: false }
);

const Sidebar = inject("communitiesMenuSt")(
  observer(({ communitiesMenuSt }) => {
    const [openDialogCC, setOpenDialogCC] = React.useState(false);
    const router = useRouter();
    const menuList = [
      {
        id: 0,
        icon: <HomeIcon />,
        label: "Главная",
        href: "/home",
      },
      {
        id: 1,
        icon: <AddBoxIcon />,
        label: "Создать сообщество",
        href: "createcommunity",
      },
    ];

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const communities = reorder(
        communitiesMenuSt.userCommunities,
        result.source.index,
        result.destination.index
      );

      communitiesMenuSt.setUserCommunities(communities);
    }

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
          overflow: "hidden",
        }}
      >
        {menuList.map((item, index) => (
          <Tooltip key={index.toString()} placement="right" title={item.label}>
            <IconButton
              component={motion.li}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (item.href === "createcommunity") {
                  setOpenDialogCC(true);
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="communitiesList">
            {(provided) => (
              <Scrollbars
                renderThumbHorizontal={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 2, }} />}
                renderThumbVertical={props => <div {...props} style={{ backgroundColor: "#cccccc", borderRadius: 8, width: 2, }} />}
                universal
                style={{ height: "100%", overflowY: "hidden !important", }}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
              >
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {communitiesMenuSt.userCommunities.map((item, index) => (
                    <SidebarCommunityIcon item={item} index={index} key={item.id} />
                  ))}
                  {provided.placeholder}
                </Box>
              </Scrollbars>
            )}
          </Droppable>
          <Box sx={{ height: 12 }} />
        </DragDropContext>
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
