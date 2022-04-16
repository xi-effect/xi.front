/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";
import { Box, useMediaQuery, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import ReportDialog from "./RightMenu/ReportDialog";
import XiLogo from "../../../kit/XiLogo.tsx";

const Upbar = inject()(
  observer(({ swipe, setSwipe }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    const [openDialog, setOpenDialog] = React.useState(false);

    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "48px",
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {mobile && <IconButton onClick={() => {
            if (swipe === "right") setSwipe("swipe", "center")
            if (swipe === "center") setSwipe("swipe", "right")
          }} sx={{ ml: 0.4, mr: 0.4, cursor: "pointer" }}>
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>}
          <XiLogo />
        </Stack>
        <Box>
          {mobile && <IconButton onClick={() => {
            if (swipe === "left") setSwipe("swipe", "center")
            if (swipe === "center") setSwipe("swipe", "left")
          }} sx={{ ml: "auto", mr: 0.4, cursor: "pointer" }}>
            <InfoIcon sx={{ fontSize: 32 }} />
          </IconButton>}
          <ReportDialog open={openDialog} setOpen={setOpenDialog} />
        </Box>
      </Stack >
    );
  })
);

export default Upbar;
