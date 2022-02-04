import React from "react";

import {
  Skeleton,
  Box,
  Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import ComponentsSelect from "./Components/ComponentsSelect"


const PageCompList = inject("knowledgeStore")(
  observer(({ knowledgeStore }) => (
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
            key={index.toString()}
          >
            <ComponentsSelect value={value} index={index} />
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
  ))
);

export default PageCompList;
