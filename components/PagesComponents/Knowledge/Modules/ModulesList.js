import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Divider,
  CardContent,
  MenuItem,
  Popper,
  MenuList,
  Avatar,
  Paper,
  Accordion,
  IconButton,
  Chip,
  AccordionSummary,
  AccordionDetails,
  CardHeader,
  Button,
  Card,
  CardActions,
  Grid,
  Stack,
  Box,
  Typography,
  useTheme,
  Tooltip,
  Switch,
  Container,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { inject, observer } from "mobx-react";

import SVGbackground from "../../../OtherComponents/SVGbackground/SVGbackground";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const moduleThemeList = {
  "math": "Математика",
  "algebra": "Алгебра",
  "geometry": "Геометрия",
  "languages": "Языки",
  "physics": "Физика",
  "chemistry": "Химия",
  "biology": "Биология",
  "geography": "География",
  "history": "История",
  "social-science": "Обществознание",
  "philosophy": "Философия",
  "literature": "Литература",
  "arts": "Искусства",
  "informatics": "Информатика",
}

const modulesImgList = {
  "Робототехника": "/knowledge/robotechnik.jpg",
  "Безопасность в интернете": "/knowledge/secureInInternet.jpg",
  "Математика ЕГЭ": "/knowledge/mathEGE.jpg",
  "English ABCs": "/knowledge/EnglishABC.jpg",
  "Веб Дизайн": "/knowledge/webdesign.jpg",
  "Классическая Музыка": "/knowledge/musicClassic.jpg",
  "География": "/knowledge/geography.jpg",
  "Геодезия": "/knowledge/geodesia.jpg",
  "Океанология": "/knowledge/oceanology.jpg",
  "Социология": "/knowledge/sociology.jpg",
  "Информатика 7 класс": "/knowledge/informatica.jpg",
  "Литература Европы XX века": "/knowledge/literatureXX.jpg",
  "Python": "/knowledge/python.jpg",
  "Ораторское искусство": "/knowledge/publicSpeaking.jpg",
  "История ЕГЭ": "/knowledge/historyEGE.jpg",
  "Немецкий язык": "/knowledge/deutsch.jpg",
  "Классическая философия": "/knowledge/classicPhilosophy.jpg",
  "Литература": "/knowledge/literature.jpg",
  "История России": "/knowledge/historyRussia.jpg",
  "Арифметика": "/knowledge/arifmetic.jpg",
  "Архитектура XIX века": "/knowledge/architecture.jpg",
  "Матан": "/knowledge/math.jpg",
  "Физика: термодинамика": "/knowledge/phi.jpeg",
}

const variantsIcon = {
  open: {
    rotate: 180,
  },
  close: {
    rotate: 0,
  }
}

const Views = React.memo(({ views }) => {
  const theme = useTheme();

  if (views < 1000) {
    return (
      <>
        <VisibilityIcon sx={{ ml: 1 }} />
        <Typography sx={{ ml: 1, color: "white" }}> {`${views}`} </Typography>
      </>
    );
  }
  if (views >= 1000 && views < 1000000) {
    return (
      <>
        <VisibilityIcon sx={{ ml: 1 }} />
        <Typography sx={{ ml: 1, color: "white" }}>
          {" "}
          {`${Math.round(views / 1000)}к`}{" "}
        </Typography>
      </>
    );
  }
  if (views > 1000000) {
    return (
      <>
        <VisibilityIcon sx={{ ml: 1 }} />
        <Typography sx={{ ml: 1, color: "white" }}>
          {" "}
          {`${Math.round(views / 1000000)} млн`}{" "}
        </Typography>
      </>
    );
  }
});

const ModulesList = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
  const theme = useTheme();
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const [hover, setHover] = React.useState(false)

  const kindSelect = (value) => {
    if (value === "standard") return "Стандартный";
    if (value === "theory-block") return "Теория";
    if (value === "practice-block") return "Практика";
    if (value === "test") return "Проверочная работа";
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        m: 0,
        p: 1,
        width: "100%",
      }}
    >
      {knowledgeStore.moduleList.modules.map((module, index) => {
        return (
          <Grid
            ax={12}
            xs={12}
            sm={12}
            md={6}
            dl={12}
            lg={6}
            gx={4}
            xl={3}
            item
            sx={{
              p: 1,
              transition: "0.8s",
              width: "100%",
              height: 400,
              maxHeight: "100%"
            }}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            key={module.id.toString()}
          >
            <Paper
              elevation={12}
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: 'primary.main',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                // spacing={2}
                sx={{
                  width: '100%',
                  // height: '100%',
                  p: 1.5,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                  }}
                >
                  <Tooltip title={module.name}>
                    <Typography
                      variant="OpenSans700MainLabel"
                      noWrap
                      sx={{
                        width: 'calc(100% - 32px)',
                        lineHeight: "26px",
                        cursor: 'default',
                        fontSize: 20,
                      }}
                    >
                      {module.name}
                    </Typography>
                  </Tooltip>
                  <IconButton
                    component={motion.button}
                    variants={variantsIcon}
                    animate={open === index ? "open" : "close"}
                    transition={{ duration: 0.4 }}
                    sx={{
                      width: 36,
                      height: 36,
                    }}
                    onClick={() => {
                      if (open === index) return setOpen(null)
                      if (!(open === index)) return setOpen(index)
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Stack>
                <AnimatePresence initial={false} exitBeforeEnter>
                  {open === index && <Stack
                    key="menu"
                    component={motion.div}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                    }}
                  >
                    <MenuList
                      sx={{
                        width: '100%',
                      }}
                    >
                      <MenuItem>
                        <Stack
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={2}
                          sx={{
                            ml: 1,
                          }}
                        >
                          <Avatar sx={{ borderRadius: 2, bgcolor: 'grey.400' }}>
                            {module["author-name"][0].toUpperCase()}
                          </Avatar>
                          <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                          // spacing={1}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{
                                // fontSize: 8,
                                // textTransform: 'uppercase',
                                // letterSpacing: 1,
                                color: 'text.secondary',
                              }}>
                              Создатель
                            </Typography>
                            <Typography
                              variant="subtitle2"
                            >
                              {module["author-name"]}
                            </Typography>
                          </Stack>
                        </Stack>
                      </MenuItem>
                      <Tooltip title={"Просмотры"}>
                        <MenuItem>
                          <Views views={module.views} />
                        </MenuItem>
                      </Tooltip>
                      <MenuItem>
                        <Switch
                          onClick={() => knowledgeStore.setPreferenceInModules(index, "starred", module.id, module.starred ? "unstar" : "star", !module.starred)}
                          checked={module.starred}
                          color="default"
                        />
                        Избранное
                      </MenuItem>
                      <MenuItem>
                        <Switch
                          onClick={() => knowledgeStore.setPreferenceInModules(index, "pinned", module.id, module.pinned ? "unpin" : "pin", !module.pinned)}
                          checked={module.pinned}
                          color="default"
                        />
                        Смотреть позже
                      </MenuItem>
                    </MenuList>
                  </Stack>}
                  {!(open === index) && <Stack
                    key="desc"
                    component={motion.div}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      pl: 1,
                      pr: 1,
                    }}
                  >
                    {module.description && <Box
                      component={motion.p}
                      sx={{
                        maxHeight: 290,
                        minWidth: 220,
                        width: '100%',
                        lineHeight: "26px",
                        cursor: 'default',
                        fontSize: 16,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}

                    >
                      {module.description}
                    </Box>}
                    {!module.description && <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        width: '100%',
                        maxHeight: 290,
                      }}

                    >
                      <Image
                        alt="alt"
                        src={"/app/NoData.svg"}
                        quality={100}
                        width={290}
                        height={290}
                      />
                      <Typography sx={{ mt: -6, }}>
                        Автор не оставил описания
                      </Typography>
                    </Stack>}
                  </Stack>}
                </AnimatePresence>
              </Stack>
              <Tooltip title={`${kindSelect(module.type)} / ${moduleThemeList[module.theme]}`}>
                <Typography
                  variant="OpenSans700MainLabel"
                  noWrap
                  sx={{
                    position: 'absolute',
                    color: 'text.secondary',
                    borderRadius: 8,
                    bottom: 8,
                    left: 8,
                    width: 'calc(100% - 64px)',
                    lineHeight: "26px",
                    cursor: 'default',
                    fontSize: 14,
                  }}
                >
                  {`${kindSelect(module.type)} / ${moduleThemeList[module.theme]}`}
                </Typography>
              </Tooltip>
              <Button
                component={motion.button}
                animate={{ width: hover === index ? 232 : 36 }}
                transition={{ delay: 0.4, duration: 0.4, }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                onClick={() => router.push(`/knowledge/module/${module.id}/start`)}
                sx={{
                  '&.MuiButtonBase-root': {
                    height: 36,
                    width: 36,
                    minWidth: 36,
                  },
                  position: 'absolute',
                  color: 'text.primary',
                  borderRadius: 8,
                  bottom: 8,
                  right: 8,
                  boxShadow: 4,
                  bgcolor: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'secondary.main',
                  }
                }}
              >
                <AnimatePresence initial={false} exitBeforeEnter>
                  {hover === index &&
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                      sx={{
                        width: '100%',
                        height: '100%',
                      }}
                      key="textButton1"
                      component={motion.div}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, }}
                    >
                      <Typography
                        variant="IBMPlexMono500XiLabelEnd"
                        sx={{
                          lineHeight: "20px",
                          cursor: 'pointer',
                          fontSize: 16,
                        }}
                      >
                        Перейти к модулю
                      </Typography>
                      <ArrowForwardIcon />
                    </Stack>
                  }
                  {!(hover === index) &&
                    <Stack
                      direction="row"
                      key="textButton2"
                      component={motion.div}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, }}
                    >
                      <ArrowForwardIcon />
                    </Stack>}
                </AnimatePresence>
              </Button>
            </Paper>
          </Grid >
        )
      })
      }
    </Grid >
  );
}));



export default ModulesList;