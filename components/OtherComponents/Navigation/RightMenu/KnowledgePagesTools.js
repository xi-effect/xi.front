/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { useTheme, useMediaQuery, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';



const KnowledgePagesTools = inject(
    "knowledgeStore"
  )(
    observer(({ knowledgeStore }) => {
  
      return (
        <>
          <Tooltip placement="left" title="Назад">
            <span>
              <IconButton
                onClick={knowledgeStore.prevPageInModules}
                disabled={knowledgeStore.pageList.counter === 0 ? true : false}
                size="large">
                <NavigateBeforeIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip placement="left" title="Страница">
            <Typography sx={{ cursor: 'default' }}> {`${knowledgeStore.pageList.counter + 1}`} </Typography>
          </Tooltip>
          <Tooltip placement="left" title="Вперёд">
            <span>
              <IconButton
                onClick={knowledgeStore.nextPageInModules}
                disabled={knowledgeStore.pageList.pages.length < 50 ? true : false}
                size="large">
                <NavigateNextIcon />
              </IconButton>
            </span>
          </Tooltip>
        </>
      );
    })
  );

  export default KnowledgePagesTools;