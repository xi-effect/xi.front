/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";
import { useMediaQuery, IconButton, Stack, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import XiLogo from "kit/XiLogo";
import Menu from "./Menu";

const Upbar = inject("userSt")(
  observer(({ userSt, swipe, setSwipe }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "48px",
          width: "100%",
          boxShadow: 12,
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {mobile && <IconButton onClick={() => {
            if (swipe === "right") setSwipe("swipe", "center");
            if (swipe === "center") setSwipe("swipe", "right");
          }} sx={{ ml: 0.4, mr: 0.4, cursor: "pointer" }}>
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>}
          <XiLogo size='s' />
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ pr: 2 }}
        >
          {!mobile && <Typography sx={{ p: 1 }}> {userSt.settings.username} </Typography>}
          <Menu />
        </Stack>
      </Stack >
    );
  })
);

export default Upbar;
