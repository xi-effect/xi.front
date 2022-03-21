/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { Grid, Box, Skeleton, useMediaQuery, InputBase, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import InfoIcon from "@mui/icons-material/Info";
import ReportDialog from "./RightMenu/ReportDialog";

const KnowledgePagesTools = inject(
  "knowledgeSt"
)(
  observer(({ knowledgeSt }) => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("xl"));
    return (
      <>
        {!mobile && <InputBase
          value={knowledgeSt.pageList.search}
          onChange={(event) => knowledgeSt.setPageListData("search", event.target.value)}
          sx={{
            color: "text.main",
            flex: 1,
            maxWidth: "500px",
            minWidth: "300px",
            marginLeft: "auto",
          }}
          placeholder="Поиск страниц"
          inputProps={{ "aria-label": "Поиск страниц" }}
        />}
        {!mobile && <Tooltip title="Очистить поиск">
          <span>
            <IconButton
              onClick={() => knowledgeSt.clearSearchInPages()}
              disabled={knowledgeSt.pageList.search.length === 0}
              type="submit"
              aria-label="search"
              size="large">
              <ClearIcon />
            </IconButton>
          </span>
        </Tooltip>}
        {!mobile && <Tooltip title="Найти">
          <span>
            <IconButton
              onClick={() => knowledgeSt.goSearchInPages()}
              disabled={knowledgeSt.pageList.search.length < 3}
              aria-label="search"
              size="large">
              <SearchIcon />
            </IconButton>
          </span>
        </Tooltip>}
      </>
    );
  })
);

const KnowledgeModulesTools = inject(
  "knowledgeSt"
)(
  observer(({ knowledgeSt }) => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("xl"));

    return (
      <>
        {/* Поиск в десктоп */}
        {!mobile && <InputBase
          value={knowledgeSt.moduleList.search}
          onChange={(event) => knowledgeSt.setModuleListData("search", event.target.value)}
          sx={{
            color: "text.main",
            flex: 1,
            maxWidth: "500px",
            minWidth: "300px",
            marginLeft: "auto",
          }}
          placeholder="Поиск модулей"
          inputProps={{ "aria-label": "Поиск страниц" }}
        />}
        {!mobile && <Tooltip title="Очистить поиск">
          <span>
            <IconButton
              onClick={() => knowledgeSt.clearSearchInModules()}
              disabled={knowledgeSt.moduleList.search.length === 0}
              type="submit"
              aria-label="search"
              size="large">
              <ClearIcon />
            </IconButton>
          </span>
        </Tooltip>}
        {!mobile && <Tooltip title="Найти">
          <span>
            <IconButton
              onClick={() => knowledgeSt.goSearchInModules()}
              disabled={knowledgeSt.moduleList.search.length < 3}
              aria-label="search"
              size="large">
              <SearchIcon />
            </IconButton>
          </span>
        </Tooltip>}
      </>
    );
  })
);

const KnowledgePageTools = inject(
  "knowledgeSt"
)(
  observer(({ knowledgeSt }) => (
    <Grid item xs zeroMinWidth>
      {knowledgeSt.page.loading ? <Skeleton animation="wave" sx={{ ml: 2, mr: 1, height: 42, borderRadius: 4, maxWidth: 500 }} variant="text" /> :
        <Typography variant="h5" sx={{ fontWeight: "bolder", ml: 2, mr: 1, cursor: "default" }} noWrap>{knowledgeSt.page.name}</Typography>}
    </Grid>
  ))
);

const KnowledgeModuleTools = inject(
  "knowledgeSt"
)(
  observer(({ knowledgeSt }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
      <>
        {!mobile && (
          <Typography variant="h6" sx={{ ml: 1, cursor: "default" }}>
            {knowledgeSt.module.name}
          </Typography>
        )}
        {!mobile && knowledgeSt.page.name !== "" && (
          <Typography variant="h5" sx={{ ml: 1, cursor: "default" }}>
            /
          </Typography>
        )}
        {!mobile && (
          <Typography variant="h6" sx={{ ml: 1, cursor: "default" }}>
            {knowledgeSt.page.name}
          </Typography>
        )}
      </>
    );
  })
);



const Upbar = inject()(
  observer(({ swipe, setSwipe }) => {
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    const [openDialog, setOpenDialog] = React.useState(false);


    // const getWidth = () => {
    //   if (haveRightMenu) return "calc(100% - 196px)"
    //   if (haveRightToolbar) return "calc(100% - 18px)"
    //   return "100%"
    // }

    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        // spacing={2}
        sx={{
          height: "48px",
          // width: getWidth(),
          width: "100%",
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {mobile && <IconButton onClick={() => {
            if (swipe === "right") setSwipe("swipe", "center")
            if (swipe === "center") setSwipe("swipe", "right")
          }} sx={{ ml: 0.4, mr: 0.4, cursor: "pointer" }}>
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>}
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="baseline"
            sx={{
              ml: mobile ? 1 : 4,
              mr: 1,
            }}
          >
            <Typography
              component="h1"
              onClick={() => {
                router.push({
                  pathname: "/",
                })
              }}

              variant="Roboto500XiLabel"
              sx={{
                mt: "1px",
                cursor: "pointer",
                color: "secondary.main",
                fontSize: {
                  sm: "22px",
                  md: "26px",
                  lg: "30px",
                },
              }}
            >
              Ξ
            </Typography>
            <Typography
              component="h1"
              onClick={() => {
                router.push({
                  pathname: "/",
                })
              }}

              variant="IBMPlexMono500XiLabelEnd"
              sx={{
                "&.MuiTypography-root": {
                  cursor: "pointer",
                  color: "secondary.main",
                },
                fontSize: {
                  sm: "22px",
                  md: "26px",
                  lg: "30px",
                },
              }}
            >
              ffect
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{
            // width: "100%",
          }}>
          {router.pathname === "/knowledge/pages" && <KnowledgePagesTools />}
          {router.pathname === "/knowledge/modules" && <KnowledgeModulesTools />}
          {router.pathname.includes("/knowledge/page/") && <KnowledgePageTools />}
          {router.pathname.includes("/knowledge/module/") && <KnowledgeModuleTools />}
        </Stack>
        <Box>
          {mobile && <IconButton onClick={() => {
            if (swipe === "left") setSwipe("swipe", "center")
            if (swipe === "center") setSwipe("swipe", "left")
          }} sx={{ ml: "auto", mr: 0.4, cursor: "pointer" }}>
            <InfoIcon sx={{ fontSize: 32 }} />
          </IconButton>}
          <ReportDialog open={openDialog} setOpen={setOpenDialog} />
        </Box>
      </Stack >
    );
  })
);

export default Upbar;
