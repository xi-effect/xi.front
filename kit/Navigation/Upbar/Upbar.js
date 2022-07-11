/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";
import { useMediaQuery, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import XiLogo from "kit/XiLogo";
import DialogCategoryCreation from "kit/CommunityMenu/DialogCategoryCreation";
import DialogChannelCreation from "kit/CommunityMenu/DialogChannelCreation";
import DialogInvite from "kit/CommunityMenu/DialogInvite";
import DialogPrivacy from "kit/CommunityMenu/DialogPrivacy";
import DialogSettings from "kit/CommunityMenu/DialogSettings";

const Upbar = inject()(
  observer(({ swipe, setSwipe }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
      <>
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
            sx={{
              pl: 1
            }}
          >
            {mobile && <IconButton onClick={() => {
              if (swipe === "right") setSwipe("swipe", "center");
              if (swipe === "center") setSwipe("swipe", "right");
            }} sx={{ ml: 0.4, mr: 0.4, cursor: "pointer" }}>
              <MenuIcon sx={{ fontSize: 32 }} />
            </IconButton>}
            <XiLogo size='s' />
          </Stack>
        </Stack >
        <DialogCategoryCreation />
        <DialogChannelCreation />
        <DialogInvite />
        <DialogPrivacy />
        <DialogSettings />
      </>

    );
  })
);

export default Upbar;
