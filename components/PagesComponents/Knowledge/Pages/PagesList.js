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
  Stack,
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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
        {knowledgeStore.pageList.pages.map((page, index) => {
          const [hover, setHover] = React.useState(false)
          return (
            <Grid
              xs={12}
              sm={12}
              md={6}
              lg={4}
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
              key={page.id.toString()}
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
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                  }}
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={2}
                  sx={{
                    // width: '100%',
                    // height: '100%',
                    p: 1.5,
                  }}
                >
                  <Tooltip title={page.name}>
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
                      {page.name}
                    </Typography>
                  </Tooltip>
                  <Box
                    component={"p"}
                    sx={{
                      maxHeight: 290,
                      width: '100%',
                      lineHeight: "26px",
                      cursor: 'default',
                      fontSize: 16,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}

                  >
                    {page.description}
                  </Box>

                </Stack>
                <Tooltip title={`${kindSelect(page.kind)} / ${page.theme}`}>
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
                    {`${kindSelect(page.kind)} / ${page.theme}`}
                  </Typography>
                </Tooltip>
                <Button
                  component={motion.button}
                  animate={{ width: hover ? 232 : 36 }}
                  transition={{ delay: 0.4, duration: 0.4, }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  onClick={() => router.push(`/knowledge/page/${page.id}`)}
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
                    {hover &&
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
                          Перейти к странице
                        </Typography>
                        <ArrowForwardIcon />
                      </Stack>
                    }
                    {!hover &&
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
            </Grid>
          )
        })}
      </Grid>
    );
  })
);

export default PagesList;
