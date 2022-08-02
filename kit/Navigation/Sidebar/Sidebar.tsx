/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Stack, Tooltip, IconButton, Box } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import { motion } from "framer-motion";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import useListen from "utils/useListen";
import { grey } from "@mui/material/colors";
import CommunityItem from "./CommunityItem";

const DialogCreateCommunity = dynamic(() => import("./DialogCreateCommunity"), {
  ssr: false,
});

type SidebarType = {
  rootStore?: any;
  communitiesMenuSt?: any;
  userSt?: any;
};

const menuListDividers = ["home", "none"];

const Sidebar: React.FC<SidebarType> = inject(
  "rootStore",
  "communitiesMenuSt",
  "userSt"
)(
  observer(({ rootStore, communitiesMenuSt, userSt }) => {
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

    const logoutButton = {
      id: 0,
      icon: <LogoutIcon />,
      label: "Выход",
    };

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const reorderFn = (source, destination) => {
      const communities = reorder(
        communitiesMenuSt.userCommunities,
        source,
        destination
      );
      // @ts-ignore
      rootStore.socket.emit(
        "reorder-community",
        {
          // @ts-ignore
          "source-id": communities[destination].id,
          "target-index": destination,
        },
        ({ code, message, data }) => {
          console.info(code, message, data);
        }
      );
      communitiesMenuSt.setUserCommunities(communities);
    };

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      reorderFn(result.source.index, result.destination.index);
    };

    type Communty = {
      id: number;
      name: string;
    };

    const subReorder = (data) => {
      const newArray = Array.from(communitiesMenuSt.userCommunities);
      const item = newArray.find((i: Communty) => i.id === data["source-id"]);
      const itemIndex = newArray.findIndex(
        (i: Communty) => i.id === data["source-id"]
      );
      newArray.splice(itemIndex, 1);
      newArray.splice(data["target-index"], 0, item);
      console.log("on reorder-community", newArray);
      communitiesMenuSt.setUserCommunities(newArray);
    };

    useListen(
      rootStore.socket,
      "reorder-community",
      subReorder,
      communitiesMenuSt.userCommunities
    );

    const addItemtoMenu = (data) => {
      console.log("on new-community", data);
      const array = communitiesMenuSt.userCommunities;
      communitiesMenuSt.setUserCommunities([
        {
          name: data.name,
          id: data.id,
        },
        ...array,
      ]);
    };

    useListen(
      rootStore.socket,
      "new-community",
      addItemtoMenu,
      communitiesMenuSt.userCommunities
    );

    const removeItem = (data) => {
      console.log("on leave-community");
      communitiesMenuSt.removeCommunity(data.id);
    };

    useListen(
      rootStore.socket,
      "leave-community",
      removeItem,
      communitiesMenuSt
    );

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{
          position: "absolute",
          pt: 2,
          pb: 2,
          width: 80,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          sx={{ position: "relative" }}
          alignItems="flex-start"
        >
          <Stack
            sx={{ width: 4, position: "absolute" }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            {menuListDividers.map((item, index) => (
              <Box
                key={index.toString()}
                sx={{
                  display: router.pathname.includes(item) ? "flex" : "none",
                  height: 40,
                  width: 4,
                  bgcolor: grey[200],
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            ))}
          </Stack>
          <Stack
            sx={{ width: 80 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {menuList.map((item, index) => (
              <Tooltip
                key={index.toString()}
                placement="right"
                title={item.label}
              >
                <IconButton
                  component={motion.li}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (item.href === "createcommunity") {
                      setOpenDialogCC(true);
                    } else router.push(item.href);
                  }}
                  sx={{
                    bgcolor: router.pathname.includes(item.href)
                      ? "primary.main"
                      : "",
                    borderRadius: 2,
                    "&:hover": {
                      bgcolor: router.pathname.includes(item.href)
                        ? "primary.main"
                        : "",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sidebar-communities-list">
            {(provided) => (
              <Scrollbars
                renderThumbHorizontal={(props) => (
                  <div
                    {...props}
                    style={{
                      backgroundColor: "#cccccc",
                      borderRadius: 8,
                      width: 2,
                    }}
                  />
                )}
                renderThumbVertical={(props) => (
                  <div
                    {...props}
                    style={{
                      backgroundColor: "#cccccc",
                      borderRadius: 8,
                      width: 2,
                    }}
                  />
                )}
                universal
                // @ts-ignore
                style={{ height: "100%", overflowY: "hidden !important" }}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  sx={{ position: "relative", pt: 2 }}
                  alignItems="flex-start"
                >
                  <Stack
                    sx={{ width: 4, position: "absolute", height: "100%" }}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                  >
                    {communitiesMenuSt.userCommunities.map((item, index) => (
                      <Box
                        key={index.toString()}
                        sx={{
                          height: 50,
                          width: 4,
                          bgcolor:
                            Number(router.query.id) === item.id
                              ? grey[200]
                              : "transparent",
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                        }}
                      />
                    ))}
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      width: 80,
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {communitiesMenuSt.userCommunities.map((item, index) => (
                      <CommunityItem item={item} index={index} key={item.id} />
                    ))}
                    {provided.placeholder}
                  </Stack>
                </Stack>
              </Scrollbars>
            )}
          </Droppable>
        </DragDropContext>
        <Tooltip placement="right" title={logoutButton.label}>
          <IconButton
            component={motion.button}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              userSt.logout();
            }}
            sx={{
              bgcolor: "error.main",
              borderRadius: 2,
              "&:hover": {
                bgcolor: "error.light",
              },
            }}
          >
            {logoutButton.icon}
          </IconButton>
        </Tooltip>
        <DialogCreateCommunity
          openDialogCC={openDialogCC}
          setOpenDialogCC={setOpenDialogCC}
        />
      </Stack>
    );
  })
);

export default Sidebar;
