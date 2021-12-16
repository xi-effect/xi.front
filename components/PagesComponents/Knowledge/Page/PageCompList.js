import React from "react";

import {
  CircularProgress,
  Skeleton,
  Grid,
  Typography,
  useTheme,
  Box,
  Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import Text from "./Components/Text";
import AlertComp from "./Components/AlertComp";
import Header from "./Components/Header";
import DividerComp from "./Components/DividerComp";
import ImageComp from "./Components/ImageComp";
import Quiz from "./Components/Quiz";
import Markdown from "./Components/Markdown";
import List from "./Components/List";
import NumberAnswer from "./Components/NumberAnswer";
import Code from "./Components/Code";

const PageCompList = inject("knowledgeStore")(
  observer(({ knowledgeStore }) => {
    const theme = useTheme();

    const componentsSelect = (value, index) => {
      if (value.type === "h")
        return (
          <>
            <Header value={value} index={index} />
          </>
        );
      if (value.type === "text")
        return (
          <>
            <Text value={value} index={index} />
          </>
        );
      if (value.type === "divider")
        return (
          <>
            <DividerComp value={value} index={index} />
          </>
        );
      if (value.type === "alert")
        return (
          <>
            <AlertComp value={value} index={index} />
          </>
        );
      if (value.type === "quiz")
        return (
          <>
            <Quiz value={value} index={index} />
          </>
        );
      if (value.type === "img")
        return (
          <>
            <ImageComp value={value} index={index} />
          </>
        );
      if (value.type === "markdown")
        return (
          <>
            <Markdown value={value} index={index} />
          </>
        );
      if (value.type === "list")
        return (
          <>
            <List value={value} index={index} />
          </>
        );
      if (value.type === "numanswer")
        return (
          <>
            <NumberAnswer value={value} index={index} />
          </>
        );
      if (value.type === "code")
        return (
          <>
            <Code value={value} index={index} />
          </>
        );
    };

    return (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          marginTop: 2,
          ml: 1,
          mr: 1,
          mb: 1,
          maxWidth: "800px",
          zIndex: 1,
          width: "calc(100% - 16px)",
        }}
      >
        {!knowledgeStore.page.loading &&
          knowledgeStore.page.components.map((value, index) => (
            <Box
              sx={{
                border: 0,
                width: "calc(100% - 4px)",
                margin: "1px",
                padding: "0px",
              }}
              key={index}
            >
              {componentsSelect(value, index)}
            </Box>
          ))}
        {knowledgeStore.page.loading &&
          [...Array(20)].map((value, index) => (
            <Box
              sx={{
                border: 0,
                maxWidth: "800px",
                width: "100%",
                height: 48,
                // margin: "1px",
                // padding: "1px",
              }}
              key={index.toString()}
            >
              <Skeleton
                animation="wave"
                sx={{
                  height: 48,
                  ml: 1,
                  mr: 1,
                  width: "calc(100% - 16px)",
                  borderRadius: 4,
                }}
              />
            </Box>
          ))}
      </Stack>
    );
  })
);

export default PageCompList;
