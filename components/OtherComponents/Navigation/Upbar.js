/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Grid, Box, Popper, Skeleton, useTheme, Paper, ListItemIcon, ListItemText, ClickAwayListener, MenuList, Grow, MenuItem, useMediaQuery, InputBase, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import CustomAvatar from '../Avatar/CustomAvatar'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportIcon from '@mui/icons-material/Report';
import ReportDialog from "./ReportDialog";
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';

const KnowledgePagesTools = inject(
  "knowledgeStore"
)(
  observer(({ knowledgeStore }) => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));
    return (
      <>
        {!mobile && <InputBase
          value={knowledgeStore.pageList.search}
          onChange={(event) => knowledgeStore.setPageListData("search", event.target.value)}
          sx={{
            color: 'text.main',
            flex: 1,
            maxWidth: "500px",
            marginLeft: "auto",
          }}
          placeholder="Поиск страниц"
          inputProps={{ 'aria-label': 'Поиск страниц' }}
        />}
        {!mobile && <Tooltip title="Очистить поиск">
          <span>
            <IconButton
              onClick={() => knowledgeStore.clearSearchInPages()}
              disabled={knowledgeStore.pageList.search.length === 0}
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
              onClick={() => knowledgeStore.goSearchInPages()}
              disabled={knowledgeStore.pageList.search.length < 3}
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
  "knowledgeStore"
)(
  observer(({ knowledgeStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));
    return (
      <>
        {/* Поиск в десктоп */}
        {!mobile && <InputBase
          value={knowledgeStore.moduleList.search}
          onChange={(event) => knowledgeStore.setModuleListData("search", event.target.value)}
          sx={{
            color: 'text.main',
            flex: 1,
            maxWidth: "500px",
            marginLeft: "auto",
          }}
          placeholder="Поиск модулей"
          inputProps={{ 'aria-label': 'Поиск страниц' }}
        />}
        {!mobile && <Tooltip title="Очистить поиск">
          <span>
            <IconButton
              onClick={() => knowledgeStore.clearSearchInModules()}
              disabled={knowledgeStore.moduleList.search.length === 0}
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
              onClick={() => knowledgeStore.goSearchInModules()}
              disabled={knowledgeStore.moduleList.search.length < 3}
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
  "knowledgeStore"
)(
  observer(({ knowledgeStore }) => {
    return (
      <>
        <Grid item xs zeroMinWidth>
          {knowledgeStore.page.loading ? <Skeleton animation="wave" sx={{ ml: 2, mr: 1, height: 42, borderRadius: 4, maxWidth: 500 }} variant="text" /> :
            <Typography variant="h5" sx={{ fontWeight: "bolder", ml: 2, mr: 1, cursor: "default" }} noWrap>{knowledgeStore.page.name}</Typography>}
        </Grid>
      </>
    );
  })
);

const KnowledgeModuleTools = inject(
  "knowledgeStore"
)(
  observer(({ knowledgeStore }) => {
    const theme = useTheme();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    return (
      <>
        {!mobile && (
          <Typography variant="h6" sx={{ ml: 1, cursor: "default" }}>
            {knowledgeStore.module.name}
          </Typography>
        )}
        {!mobile && knowledgeStore.page.name != "" && (
          <Typography variant="h5" sx={{ ml: 1, cursor: "default" }}>
            {"/"}
          </Typography>
        )}
        {!mobile && (
          <Typography variant="h6" sx={{ ml: 1, cursor: "default" }}>
            {knowledgeStore.page.name}
          </Typography>
        )}
      </>
    );
  })
);



const Upbar = inject(
  "rootStore",
  "settingsStore",
  "uiStore",
  "messageStore"
)(
  observer(({ rootStore, settingsStore, uiStore, messageStore, children, swipe, setSwipe, haveRightMenu, haveRightToolbar, haveRightMenuMore }) => {
    const theme = useTheme();
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const [openDialog, setOpenDialog] = React.useState(false);


    // const getWidth = () => {
    //   if (haveRightMenu) return 'calc(100% - 196px)'
    //   if (haveRightToolbar) return 'calc(100% - 18px)'
    //   return '100%'
    // }

    return (
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        // spacing={2}
        sx={{
          height: '48px',
          // width: getWidth(),
          width: '100%',
        }}
      >
        {mobile && <IconButton onClick={() => {
          if (swipe === 'right') setSwipe('swipe', 'center')
          if (swipe === 'center') setSwipe('swipe', 'right')
        }} sx={{ ml: 0.4, mr: 0.4, cursor: 'pointer' }}>
          <MenuIcon sx={{ fontSize: 32 }} />
        </IconButton>}
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="baseline"
          sx={{
            ml: mobile ? 1 : 4,
            mr: 'auto',
          }}
        >
          <Typography
            component={"h1"}
            onClick={() => {
              router.push({
                pathname: '/',
              })
            }}

            variant="Roboto500XiLabel"
            sx={{
              mt: '1px',
              cursor: 'pointer',
              color: 'secondary.main',
              fontSize: {
                sm: '22px',
                md: '26px',
                lg: '30px',
              },
            }}
          >
            Ξ
          </Typography>
          <Typography
            component={"h1"}
            onClick={() => {
              router.push({
                pathname: '/',
              })
            }}

            variant="IBMPlexMono500XiLabelEnd"
            sx={{
              '&.MuiTypography-root': {
                cursor: 'pointer',
                color: 'secondary.main',
              },
              fontSize: {
                sm: '22px',
                md: '26px',
                lg: '30px',
              },
            }}
          >
            ffect
          </Typography>
        </Stack>
        {router.pathname === '/knowledge/pages' && <KnowledgePagesTools />}
        {router.pathname === '/knowledge/modules' && <KnowledgeModulesTools />}
        {router.pathname.includes('/knowledge/page/') && <KnowledgePageTools />}
        {router.pathname.includes('/knowledge/module/') && <KnowledgeModuleTools />}

        {mobile && (haveRightMenu || haveRightToolbar) && <IconButton onClick={() => {
          if (swipe === 'left') setSwipe('swipe', 'center')
          if (swipe === 'center') setSwipe('swipe', 'left')
        }} sx={{ ml: 0.4, mr: 0.4, cursor: 'pointer' }}>
          <InfoIcon sx={{ fontSize: 32 }} />
        </IconButton>}
        <ReportDialog open={openDialog} setOpen={setOpenDialog} />
      </Stack >
    );
  })
);

export default Upbar;
