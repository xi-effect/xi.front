/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, useMediaQuery, Link, useTheme, Stack, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from '@mui/icons-material/Info';
import TaskIcon from '@mui/icons-material/Task';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { motion } from "framer-motion"
import { Scrollbars } from 'react-custom-scrollbars-2';


const KnowledgeModuleToolsWithMap = inject(
  "knowledgeStore",
)(
  observer(({ knowledgeStore, goNext }) => {
    const theme = useTheme()
    const router = useRouter()
    return (
      <>
        <Typography variant="subtitle1" sx={{ ml: 0.5 }}>карта модуля:</Typography>
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
          {knowledgeStore.moduleCompleted.isFinished && router.pathname.includes('/knowledge/module/results') && router.pathname === '/knowledge/module/results' && <Button
            sx={{
              color: 'text.main',
              width: 152,
              alignItems: 'space-between',
            }}
            onClick={() => router.push('/knowledge/module/results')} size="large"
          >
            К результатам
          </Button>}
          {router.pathname === '/knowledge/module/results' && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={() => router.push('/knowledge/modules/')} size="large"
          >
            Закрыть тест
          </Button>}
          {knowledgeStore.module.type === 'test' && !(router.pathname.includes('/knowledge/module/results')) && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={() => knowledgeStore.getTestModuleResults()} size="large"
          >
            Завершить <TaskIcon sx={{ ml: 'auto', mr: 0 }} />
          </Button>}
          <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={null} size="large"
          >
            Инфо <InfoIcon sx={{ ml: 'auto', mr: 0 }} />
          </Button>
          {!(router.pathname === '/knowledge/module/results') && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={goNext}
            size="large"
          >
            Вперёд <DoubleArrowIcon sx={{ ml: 'auto', mr: 0 }} />
          </Button>}
        </Stack>
      </>
    );
  })
);

const KnowledgeModuleTools = inject(
  "knowledgeStore",
)(
  observer(({ knowledgeStore, goNext }) => {
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
          {knowledgeStore.moduleCompleted.isFinished && router.pathname.includes('/knowledge/module/results') && !(router.pathname === '/knowledge/module/results') && <Button
            sx={{
              color: 'text.main',
              width: 152,
              alignItems: 'space-between',
            }}
            onClick={() => router.push('/knowledge/module/results')} size="large"
          >
            К результатам
          </Button>}
          {router.pathname === '/knowledge/module/results' && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={() => router.push('/knowledge/modules/')} size="large"
          >
            Закрыть тест
          </Button>}
          {knowledgeStore.module.type === 'test' && !(router.pathname.includes('/knowledge/module/results')) && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={() => knowledgeStore.getTestModuleResults()} size="large"
          >
            Завершить <TaskIcon sx={{ ml: 'auto', mr: 0 }} />
          </Button>}
          <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={null} size="large"
          >
            Инфо <InfoIcon sx={{ ml: 'auto', mr: 0 }} />
          </Button>
          {!(router.pathname === '/knowledge/module/results') && <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={goNext}
            size="large"
          >
            Вперёд <DoubleArrowIcon sx={{ ml: 'auto', mr: 0 }} />
          </Button>}
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
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"))

    const goNext = () => {
      if (!router.pathname.includes('/knowledge/module/results')) {
        knowledgeStore.loadPageInModule(
          knowledgeStore.module.activeIdInMap + 1
        )
      }
      if (router.pathname.includes('/knowledge/module/results')) {
        console.log("r", knowledgeStore.moduleCompleted.results)
        let indx = knowledgeStore.moduleCompleted.results.findIndex((item, index) => {
          console.log(item, knowledgeStore.page.id)
          if (item["page-id"] == knowledgeStore.page.id) return true
        })
        console.log("indx", indx)
        if (indx + 1 === knowledgeStore.moduleCompleted.results.length) return knowledgeStore.uploadPageForResults(knowledgeStore.moduleCompleted.results[0]["page-id"], 0)
        indx += 1
        return knowledgeStore.uploadPageForResults(knowledgeStore.moduleCompleted.results[indx]["page-id"], indx)
      }
    }

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={1}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        sx={{
          position: "absolute",
          top: 72,
          right: 0,
          height: 'calc(100vh - 72px)',
          width: '156px',
          pb: mobile ? 10 : 2,
          pt: 0,
        }}
      >

        {(knowledgeStore.moduleCompleted.isFinished || !(knowledgeStore.module["map"] != undefined) || knowledgeStore.module["map"].length === 0) && router.pathname.includes('/knowledge/module/') && <KnowledgeModuleTools goNext={goNext} />}
        {!knowledgeStore.moduleCompleted.isFinished && knowledgeStore.module["map"] != undefined && knowledgeStore.module["map"].length != 0 && router.pathname.includes('/knowledge/module/') && <KnowledgeModuleToolsWithMap goNext={goNext} />}
      </Stack>
    );
  })
);

export default RightMenu;
