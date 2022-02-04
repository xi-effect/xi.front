/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";
import { Button, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

const KnowledgePagesTools = inject(
  "knowledgeStore"
)(
  observer(({ knowledgeStore }) => (
      <>
        <Button
          onClick={knowledgeStore.prevPageInModules}
          disabled={knowledgeStore.pageList.counter === 0}
          sx={{
            color: "text.primary",
            width: 142,
            alignItems: "space-between",
          }}
          size="large"
        >
          Назад <NavigateBeforeIcon sx={{ ml: "auto", mr: 0 }} />
        </Button>
        <Typography sx={{ cursor: "default" }}> {`Страница ${knowledgeStore.pageList.counter + 1}`} </Typography>
        <Button
          onClick={knowledgeStore.nextPageInModules}
          disabled={knowledgeStore.pageList.pages.length < 50}
          sx={{
            color: "text.primary",
            width: 142,
            alignItems: "space-between",
          }}
          size="large"
        >
          Вперёд <NavigateNextIcon sx={{ ml: "auto", mr: 0 }} />
        </Button>
      </>
    ))
);

export default KnowledgePagesTools;