/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, Button, Link, useTheme, IconButton, Tooltip, Drawer, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';
import TaskIcon from '@mui/icons-material/Task';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { motion } from "framer-motion"
import { Scrollbars } from 'react-custom-scrollbars-2';


const KnowledgeModuleToolsWithMap = inject(
  "knowledgeStore",
)(
  observer(({knowledgeStore }) => {
    const theme = useTheme();
    const router = useRouter()

    return (
    <>
      <Typography variant="subtitle1" sx={{ml: 0.5}}>карта модуля:</Typography>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0}
        sx={{
          height: "100%",
        }}
      >
        <Scrollbars
            universal={true}
            style={{ width: 156, height: "100%" }}
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
        >
            {knowledgeStore.module["map"].map((name, index) => (
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  key={index.toString()}
                >
                  {knowledgeStore.module.activeIdInMap ===
                    index && (
                    <ArrowRightIcon />
                  )}
                  {/* {knowledgeStore.module.activeIdInMap !== (index + (paginationCounter - 1) * 10) && <CircleIcon sx={{fontSize: "8px", m: 1}} />} */}
                  <Link
                    sx={{
                      cursor:
                        knowledgeStore.module.activeIdInMap ===
                        index
                          ? "default"
                          : "pointer",
                      ml:
                        knowledgeStore.module.activeIdInMap ===
                        index
                          ? 0
                          : 3,
                    }}
                    onClick={() =>
                      knowledgeStore.loadPageInModule(
                        index
                      )
                    }
                    color="inherit"
                    underline={
                      knowledgeStore.module.activeIdInMap ===
                      index
                        ? "none"
                        : "hover"
                    }
                  >
                    {name}
                  </Link>
                  {/* <Typography>
                                        {item.name}
                                    </Typography> */}
                </Stack>
              ))}
        </Scrollbars>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={{
          width: "100%",
        }}
      >
        {knowledgeStore.module.type === 'test' && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={null} size="large"
        >
           Завершить <TaskIcon sx={{ml: 'auto', mr: 0}} />
        </Button>}
        <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={null} size="large"
        >
           Инфо <InfoIcon sx={{ml: 'auto', mr: 0}} />
        </Button>
          <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={() =>
              knowledgeStore.loadPageInModule(
                knowledgeStore.module.activeIdInMap + 1
              )
            }
            size="large"
          >
            Вперёд <DoubleArrowIcon sx={{ml: 'auto', mr: 0}}/>
          </Button>
      </Stack>
    </>
    );
  })
);

const KnowledgeModuleTools = inject(
  "knowledgeStore",
)(
  observer(({ knowledgeStore }) => {
    const theme = useTheme();
    const router = useRouter()

    return (
    <>
    <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={0}
        sx={{
          height: "100%",
        }}
      >

      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0}
        sx={{
          width: "100%",
        }}
      >
        {knowledgeStore.module.type === 'test' && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={null} size="large"
        >
           Завершить <TaskIcon sx={{ml: 'auto', mr: 0}} />
        </Button>}
        <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={null} size="large"
        >
           Инфо <InfoIcon sx={{ml: 'auto', mr: 0}} />
        </Button>
        <Button
          sx={{
            color: 'text.main',
            width: 142,
            alignItems: 'space-between',
          }}
          onClick={() =>
            knowledgeStore.loadPageInModule(
              knowledgeStore.module.activeIdInMap + 1
            )
          }
          size="large"
        >
          Вперёд <DoubleArrowIcon sx={{ml: 'auto', mr: 0}}/>
        </Button>
      </Stack>
    </>
    );
  })
);


const RightMenu = inject(
  "rootStore",
  "knowledgeStore",
)(
  observer(({ rootStore, knowledgeStore }) => {
    const router = useRouter();

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          height: '100vh',
          width: '156px',
          pb: 2,
          pt: 8,
      }}
      >
        
        {!(knowledgeStore.module["map"] != undefined) && router.pathname.includes('/knowledge/module/') && <KnowledgeModuleTools/>}
        {knowledgeStore.module["map"] != undefined && router.pathname.includes('/knowledge/module/') && <KnowledgeModuleToolsWithMap/>}
      </Stack>
    );
  })
);

export default RightMenu;
