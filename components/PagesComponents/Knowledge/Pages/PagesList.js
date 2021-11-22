/* eslint-disable react/display-name */
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

const Views = React.memo(({ views }) => {
  const theme = useTheme();

  if (views < 1000) {
    return (
      <>
        <VisibilityIcon />
        <Typography sx={{ color: "white" }}> {`${views}`} </Typography>
      </>
    );
  }
  if (views >= 1000 && views < 1000000) {
    return (
      <>
        <VisibilityIcon />
        <Typography sx={{ color: "white" }}>
          {" "}
          {`${Math.round(views / 1000)}к`}{" "}
        </Typography>
      </>
    );
  }
  if (views > 1000000) {
    return (
      <>
        <VisibilityIcon />
        <Typography sx={{ color: "white" }}>
          {" "}
          {`${Math.round(views / 1000000)} млн`}{" "}
        </Typography>
      </>
    );
  }
});

const PagesList = inject(
  "knowledgeStore",
  "uiStore"
)(
  observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();
    const router = useRouter()
    const knowledgeUI = uiStore.knowledgeUI;
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
        {knowledgeStore.pageList.pages.map((page, index) => (
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
            key={page.id.toString()}
          >
            <AnimatePresence initial={false}>
            {!(expanded === index) &&
              <Box
               sx={{width: "100%", height: "auto"}}
               component={motion.div}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
              >
              <SVGbackground width={1920} height={1080}/>
              </Box>}
            </AnimatePresence>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid sx={{width: 'calc(100% - 32px)'}} container wrap="nowrap" spacing={2}>
                <Grid item xs zeroMinWidth>
                  <Typography onClick={() => router.push(`/knowledge/page/${page.id}`)} sx={{ cursor: 'pointer', "&:hover": {textDecoration: 'underline'}}} variant="h6" noWrap>
                    {page.name}
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
            <AnimatePresence initial={false}>
            {(expanded === index) &&
              <Box
               sx={{width: "100%", height: "auto"}}
               component={motion.div}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ delay: 11300, opacity: 0 }}
              >
              <Typography>{`${page.theme}`}</Typography>
              <Typography sx={{ mt: 0.4 }}>{kindSelect(page.kind)}</Typography>
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
        ))}
      </Grid>
    );
  })
);

export default PagesList;

// {page.name}

// {page.theme}  {kindSelect(page.kind)
//                     <Views views={page.views} />
