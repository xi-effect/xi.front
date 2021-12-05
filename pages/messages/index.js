/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";

import InfiniteScroll from "react-infinite-scroll-component";

import socket from "../../utils/socket";

const Messages = inject(
  "rootStore",
  "messageStore"
)(
  observer(({ rootStore, messageStore }) => {
    const theme = useTheme();
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"));
    const mobileSecond = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        <NavigationAll haveRightMenu>
          
        </NavigationAll>
      </>
    );
  })
);

export default Messages;
