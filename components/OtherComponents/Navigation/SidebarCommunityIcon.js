import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Box, IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const SidebarCommunityIcon = ({ item, index }) => {
  const router = useRouter();
  return (
    <Draggable draggableId={`community-id-${item.id}`} index={index}>
      {provided => (
        <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Tooltip enterDelay={500} leaveDelay={0} placement="right" title={item.label}>
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
                mt: 1.5,
                ml: 2.4,
                "&:hover": {
                  bgcolor: router.pathname.includes(`/community/${item.cId}`) ? "primary.main" : "primary.dark",
                },
              }}
            >
              {item.label[0].toUpperCase()}
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Draggable>
  );
};

export default SidebarCommunityIcon;