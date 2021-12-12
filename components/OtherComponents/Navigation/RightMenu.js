/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, Box, useMediaQuery, ClickAwayListener, Divider, MenuList, MenuItem, ListItemText, ListItemIcon, Tooltip, Popper, IconButton, Link, Paper, useTheme, Stack, Typography, Grow } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from '@mui/icons-material/Info';
import TaskIcon from '@mui/icons-material/Task';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportIcon from '@mui/icons-material/Report';
import CustomAvatar from '../Avatar/CustomAvatar'

import { Scrollbars } from 'react-custom-scrollbars-2';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TitleIcon from '@mui/icons-material/Title';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import ImageIcon from '@mui/icons-material/Image';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import QuizIcon from '@mui/icons-material/Quiz';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CodeIcon from '@mui/icons-material/Code';

import { motion, AnimatePresence } from "framer-motion"


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

const KnowledgeСreatePage = inject(
  "knowledgeStore",
  "managmentStore",
  "uiStore",
)(
  observer(({ knowledgeStore, uiStore, managmentStore }) => {
    const theme = useTheme();
    const router = useRouter()

    const components = [
      { name: "Текст", icon: <TextFieldsIcon />, type: "text" },
      { name: "Заголовок", icon: <TitleIcon />, type: "h" },
      { name: "Markdown", icon: <LineStyleIcon />, type: "markdown" },
      { name: "Изображение", icon: <ImageIcon />, type: "img" },
      { name: "Опрос", icon: <QuestionAnswerIcon />, type: "quiz" },
      { name: "Замечание", icon: <NotificationsIcon />, type: "alert" },
      { name: "Разделитель", icon: <VerticalAlignCenterIcon />, type: "divider" },
      { name: "Список", icon: <ListAltIcon />, type: "list" },
      { name: "Численный ответ", icon: <QuizIcon />, type: "numanswer" },
      { name: "Код", icon: <CodeIcon />, type: "code" }
    ]

    return (
      <>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={0}
          sx={{
            height: "100%",
            width: '100%'
          }}
        >
          {uiStore.knowledge.activeStep === 1 && <>
            <Typography sx={{ ml: 1 }}>компоненты:</Typography>
            {components.map((component, index) => {

              return (
                <Stack
                  key={index.toString()}
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  // spacing={1}
                  component={motion.div}
                  sx={{
                    width: '100%',
                    cursor: 'default',
                    "&:hover": {
                      bgcolor: 'primary.light',
                    }
                  }}
                >
                  <IconButton sx={{ cursor: 'default', ml: 1 }}>
                    {component.icon}
                  </IconButton>
                  <Typography sx={{ mr: 'auto' }}>
                    {component.name}
                  </Typography>
                  <Tooltip placement="left" title="добавить">
                    <IconButton onClick={() => managmentStore.pushNewComponent(component.type)} sx={{ ml: 'auto', mr: 1, cursor: 'pointer' }}>
                      <PlusOneIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              )
            }
            )}
          </>}
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
          <Button
            sx={{
              color: 'text.main',
              width: 142,
              alignItems: 'space-between',
            }}
            onClick={null} size="large"
          >
            Сохранить <SaveAltIcon sx={{ ml: 'auto', mr: 0 }} />
          </Button>
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
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Tooltip title="Назад">
              <span>
                <IconButton
                  disabled={uiStore.knowledge.activeStep === 0}
                  sx={{
                    color: 'text.main',
                  }}
                  onClick={() => uiStore.setKnowledge("activeStep", uiStore.knowledge.activeStep - 1)}
                  size="large"
                >
                  <ArrowBackIcon sx={{ ml: 'auto', mr: 0 }} />
                </IconButton>
              </span>
            </Tooltip>
            <Typography variant="subtitle2">{`${uiStore.knowledge.activeStep + 1} / 3`}</Typography>
            <Tooltip title="Вперёд">
              <span>
                <IconButton
                  disabled={uiStore.knowledge.activeStep === 2}
                  sx={{
                    color: 'text.main',
                  }}
                  onClick={() => uiStore.setKnowledge("activeStep", uiStore.knowledge.activeStep + 1)}
                  size="large"
                >
                  <ArrowForwardIcon sx={{ ml: 'auto', mr: 0 }} />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </Stack>
      </>
    );
  })
);

const sidebar = {
  open: {
    height: '200px',
    transition: {
      type: "tween",
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    height: '72px',
    transition: {
      delay: 0.5,
      type: "tween",
      stiffness: 400,
      damping: 40
    }
  }
};

const variantsCont = {
  open: {
    transition: {
      staggerChildren: 0.07, delayChildren: 0.2
    }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const variantsChild = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: -10,
    opacity: 0,
    transition: {
      duration: 0.2,
      y: { stiffness: 1000 }
    }
  }
};


const RightMenu = inject(
  "rootStore",
  "knowledgeStore",
  "settingsStore",
)(
  observer(({ rootStore, knowledgeStore, settingsStore }) => {
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


    const [open, setOpen] = React.useState(false);

    return (
      <Paper
        elevation={12}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          height: '100vh',
          width: '256px',
          pb: mobile ? 10 : 2,
          pt: 0,
          bgcolor: 'primary.dark',
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        // component={motion.div}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 0.5, duration: 0.5 }}
        // sx={{

        // }}
        >
          <Paper
            elevation={6}
            sx={{
              width: '232px',
              mt: 1.5,
              bgcolor: 'secondary.dark',
              borderRadius: 2,
            }}
            component={motion.div}
            initial={false}
            animate={open ? "open" : "closed"}
            variants={sidebar}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={0}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
                onClick={() => setOpen(!open)}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <Box
                  sx={{ height: 64, width: 64, m: 1, mt: "-2px", mr: 1, cursor: 'pointer' }}
                >
                  <CustomAvatar avatar={{ ...settingsStore.settings.avatar, bgcolor: 'rgba(0,0,0,0)' }} viewBox={{ x: '50', y: '-110', width: '690', height: '790' }} reverse={true} />
                </Box>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={0}
                  sx={{
                    pt: 1
                  }}
                >
                  <Typography variant="h6" sx={{ mt: 0, ml: 0, mr: 0 }}>
                    {settingsStore.settings.username}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 0, ml: 0, mr: 0 }}>
                    {'Иванов Иван'}
                  </Typography>
                </Stack>
              </Stack>
              <Divider
                component={motion.hr}
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0, }}
                transition={{ duration: 1 }}
                sx={{
                  bgcolor: 'primary.dark',
                  height: '4px',
                  borderRadius: '2px',
                  width: 'calc(100% - 8px)',
                  mt: "2px",
                  ml: 0.5,
                  mr: 0.5,
                }}
              />
              <MenuList
                variants={variantsCont}
                component={motion.ui}
                // initial="hidden"
                // animate="show"
                // exit={{ opacity: 0, }}
                // transition={{ duration: 1, delayChildren: 0.5 }}
                sx={{
                  width: '100%',
                }}
              >
                <MenuItem component={motion.li} variants={variantsChild} sx={{ cursor: 'pointer' }} onClick={() => {
                  router.push(`/profile/${settingsStore.settings.id}/`)
                  handleClose()
                }}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Профиль
                  </ListItemText>
                </MenuItem>
                <MenuItem component={motion.li} variants={variantsChild} sx={{ cursor: 'pointer' }} onClick={() => {
                  setOpenDialog(true)
                  handleClose()
                }}>
                  <ListItemIcon>
                    <ReportIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Оставить отзыв
                  </ListItemText>
                </MenuItem>
                <MenuItem component={motion.li} variants={variantsChild} sx={{ '& .MuiMenuItem-root': { cursor: 'pointer' } }} onClick={() => {
                  settingsStore.logout()
                }}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: 'error.main' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Выйти
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Stack>

          </Paper>
          {(knowledgeStore.moduleCompleted.isFinished || !(knowledgeStore.module["map"] != undefined) || knowledgeStore.module["map"].length === 0) && router.pathname.includes('/knowledge/module/') && <KnowledgeModuleTools goNext={goNext} />}
          {!knowledgeStore.moduleCompleted.isFinished && knowledgeStore.module["map"] != undefined && knowledgeStore.module["map"].length != 0 && router.pathname.includes('/knowledge/module/') && <KnowledgeModuleToolsWithMap goNext={goNext} />}
          {router.pathname.includes('/knowledge/createpage') && <KnowledgeСreatePage />}
          {/* {router.pathname.includes('/knowledge/createmodule') && <KnowledgeСreateModule />} */}
        </Stack >
      </Paper >
    );
  })
);

export default RightMenu;


{/* <Paper>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem sx={{ cursor: 'pointer' }} onClick={() => {
                    router.push(`/profile/${settingsStore.settings.id}/`)
                    handleClose()
                  }}>
                    <ListItemIcon>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      Профиль
                    </ListItemText>
                  </MenuItem>
                  <MenuItem sx={{ cursor: 'pointer' }} onClick={() => {
                    setOpenDialog(true)
                    handleClose()
                  }}>
                    <ListItemIcon>
                      <ReportIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      Оставить отзыв
                    </ListItemText>
                  </MenuItem>
                  <MenuItem sx={{ '& .MuiMenuItem-root': { cursor: 'pointer' } }} onClick={() => {
                    settingsStore.logout()
                  }}>
                    <ListItemIcon>
                      <LogoutIcon sx={{ color: 'error.main' }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                      Выйти
                    </ListItemText>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
          </Paper> */}