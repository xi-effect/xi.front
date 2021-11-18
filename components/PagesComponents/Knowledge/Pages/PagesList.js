/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import cx from "clsx";
import clsx from "clsx";
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

    const buttonLabelSelect = (value) => {
      if (value === "theory") return "теории";
      if (value === "practice") return "практике";
      if (value === "task") return "проверочной";
    };

    return (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          margin: 0,
          pt: 1,
          pl: 1,
          width: "100%",
          //backgroundColor: 'background.1',
        }}
      >
        {knowledgeStore.pageList.pages.map((page, index) => (
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={4}
            item
            sx={{ p: 1, transition: "0.8s", width: "100%", height: "100%" }}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            key={index.toString()}
          >
            <Collapse
              sx={{
                width: "100%",
                height: "100%"
              }}
    in={!(expanded === index)}
  >
              {/* <Box sx={{width: "100%", height: "auto"}}> */}
              <SVGbackground width={1920} height={1080}/>
              {/* </Box> */}
            </Collapse>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" noWrap>
                {page.name}
              </Typography>
              <IconButton onClick={() => handleChange(expanded, index)} size="large">
                <ExpandMoreIcon
                  sx={{
                    transform:
                      expanded === index ? "rotate(0deg)" : "rotate(-180deg)",
                    transition: "0.2s",
                  }}
                />
              </IconButton>
            </Grid>
            {/* </Grid> */}
            <Collapse
    in={expanded === index}
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
            </Collapse>
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
