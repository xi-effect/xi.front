import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Collapse,
  Box,
  Typography,
  useTheme,
  Tooltip,
  Grow,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { inject, observer } from "mobx-react";

import SVGbackground from "../../../OtherComponents/SVGbackground/SVGbackground";
import { motion, AnimatePresence } from "framer-motion";

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

const ModulesList = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
  const theme = useTheme();
  const router = useRouter()

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (e, i) => {
    setExpanded(e === i ? false : i);
  };

  const kindSelect = (value) => {
    if (value === "theory") return "Теория";
    if (value === "practice") return "Практика";
    if (value === "task") return "Проверочная работа";
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
        //backgroundColor: 'background.1',
      }}
    >
      {knowledgeStore.moduleList.modules.map((module, index) => (
        <Grid
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={3}
          item
          sx={{ p: 1, transition: "0.8s", width: "100%", height: "100%" }}
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          key={index.toString()}
        >
          <AnimatePresence exitBeforeEnter initial={false}>
            {!(expanded === index) &&
              <Box
                sx={{ width: "100%", height: "auto" }}
                component={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <SVGbackground width={1920} height={1080} />
              </Box>}
            {/* </AnimatePresence> */}
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid sx={{ width: 'calc(100% - 32px)' }} container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                  <Typography onClick={() => router.push(`/knowledge/module/${module.id}/start`)} sx={{ cursor: 'pointer', "&:hover": { textDecoration: 'underline' } }} variant="h6" noWrap>
                    {module.name}
                  </Typography>
                </Grid>
              </Grid>
              <IconButton onClick={() => handleChange(expanded, index)} size="large">
                <ExpandMoreIcon
                  sx={{
                    position: '',
                    transform:
                      expanded === index ? "rotate(0deg)" : "rotate(-180deg)",
                    transition: "0.4s",
                  }}
                />
              </IconButton>
            </Grid>
            {/* </Grid> */}
            {/* <AnimatePresence initial={false}> */}
            {(expanded === index) &&
              <Box
                sx={{ width: "100%", height: "auto" }}
                component={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.6 }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Typography>{`${module.theme}`}</Typography>
                <Typography sx={{ mt: 0.4 }}>{kindSelect(module.kind)}</Typography>
                <Grid
                  container
                  direction="row"
                  sx={{
                    paddingTop: theme.spacing(1.5),
                    width: "auto",
                    marginRight: "auto",
                  }}
                >
                  {/* {course.createrAvatar} */}
                  <Grid>
                    <Avatar
                      sx={{
                        borderRadius: 1,
                        color: "text.main",
                        backgroundColor: "tertiary.main",
                      }}
                    >
                      Ξ
                    </Avatar>
                  </Grid>
                  <Grid sx={{ paddingLeft: 1.5 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Создатель
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                      }}
                    >
                      Ξ Effect
                    </Typography>
                  </Grid>
                </Grid>
              </Box>}
          </AnimatePresence>
        </Grid>
      ))
      }
    </Grid>
  );
}));



export default ModulesList;