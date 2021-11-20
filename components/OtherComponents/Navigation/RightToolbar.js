/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, Button, useTheme, IconButton, Tooltip, Drawer, Stack, Typography } from "@mui/material";
import CustomAvatar from '../Avatar/CustomAvatar'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

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
            <Typography sx={{cursor: 'default'}}> {`${knowledgeStore.pageList.counter + 1}`} </Typography>
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
  
const KnowledgeModulesTools = inject(
    "knowledgeStore"
  )(
    observer(({knowledgeStore }) => {
      const theme = useTheme();
  
      return (
        <>
        <Tooltip placement="left" title="Назад">
            <span>
                <IconButton
                    onClick={knowledgeStore.prevPageInModules}
                    disabled={knowledgeStore.moduleList.counter === 0 ? true : false}
                    size="large">
                    <NavigateBeforeIcon />
                </IconButton>
            </span>
        </Tooltip>
        <Tooltip placement="left" title="Страница">
            <Typography sx={{cursor: 'default'}}> {`${knowledgeStore.moduleList.counter + 1}`} </Typography>
        </Tooltip>
        <Tooltip placement="left" title="Вперёд">
            <span>
                <IconButton
                    // sx={{p: "2px"}}
                    onClick={knowledgeStore.nextPageInModules}
                    disabled={knowledgeStore.moduleList.modules.length < 12 ? true : false}
                    size="large">
                    <NavigateNextIcon />
                </IconButton>
            </span>
        </Tooltip>
        </>
      );
    })
);

const RightToolbar = inject(
  "rootStore",
)(
  observer(({ rootStore }) => {
    const router = useRouter();

    return (
    <Stack
    direction="column"
    justifyContent="flex-end"
    alignItems="center"
    spacing={2}
    sx={{
        position: "absolute",
        top: 0,
        right: 0,
        height: '100vh',
        width: '48px',
        pb: 2,
    }}
    >
      {router.pathname === '/knowledge/pages' && <KnowledgePagesTools/>}
      {router.pathname === '/knowledge/modules' && <KnowledgeModulesTools/>}
    </Stack>
    );
  })
);

export default RightToolbar;
