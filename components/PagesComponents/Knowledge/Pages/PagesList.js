/* eslint-disable react/display-name */
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
  Skeleton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { inject, observer } from "mobx-react";

import SVGbackground from "../../../OtherComponents/SVGbackground/SVGbackground";
import { motion, AnimatePresence } from "framer-motion";

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

const PagesList = inject(
  "knowledgeStore",
  "uiStore"
)(
  observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();
    const router = useRouter()

    const [open, setOpen] = React.useState(null)
    const [hover, setHover] = React.useState(null)

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
                              {page["author-name"][0].toUpperCase()}
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
                                {page["author-name"]}
                              </Typography>
                            </Stack>
                          </Stack>
                        </MenuItem>
                        <Tooltip title={"Просмотры"}>
                          <MenuItem>
                            <Views views={page.views} />
                          </MenuItem>
                        </Tooltip>
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
                      {page.description && <Box
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
                        {page.description}
                      </Box>}
                      {!page.description && <Stack
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
                  animate={{ width: hover === index ? 252 : 36 }}
                  transition={{ delay: 0.4, duration: 0.4, }}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => router.push(`/knowledge/page/${page.id}/start`)}
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
                          Перейти к странице
                        </Typography>
                        <ArrowForwardIcon />
                      </Stack>
                    }
                    {hover != index &&
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
  })
);

export default PagesList;
