/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Grid, Box, Button, Skeleton, useTheme, useMediaQuery, InputBase, IconButton, Tooltip, Drawer, Stack, Typography } from "@mui/material";
import CustomAvatar from '../Avatar/CustomAvatar'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
  observer(({knowledgeStore }) => {
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
        {knowledgeStore.page.loading ? <Skeleton animation="wave" sx={{ml: 2, mr: 1, height: 42, borderRadius: 4, maxWidth: 500}} variant="text" /> :
          <Typography variant="h5" sx={{ fontWeight: "bolder", ml: 2, mr: 1, cursor: "default" }} noWrap>{knowledgeStore.page.name}</Typography>}
        </Grid>
      </>
    );
  })
);

const KnowledgeModuleTools = inject(
  "knowledgeStore"
)(
  observer(({knowledgeStore }) => {
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
  observer(({ rootStore, settingsStore, uiStore, messageStore, children, hasRightToolbar }) => {
    const theme = useTheme();
    const router = useRouter();

    return (
  <Stack
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
  // spacing={2}
  sx={{
      height: '48px',
      width: '100%',
      }}
>
    <Typography onClick={() => router.push('/home')} variant="h4" sx={{ml: 1.5, mr: 'auto', cursor: 'pointer'}}>
    Ξffect
    </Typography>
    {router.pathname === '/knowledge/pages' && <KnowledgePagesTools/>}
    {router.pathname === '/knowledge/modules' && <KnowledgeModulesTools/>}
    {router.pathname.includes('/knowledge/page/') && <KnowledgePageTools/>}
    {router.pathname.includes('/knowledge/module/') && <KnowledgeModuleTools/>}
    <Typography variant="h6" sx={{ mt: 0, ml: 'auto', mr: 1}}>
    {settingsStore.settings.username}
    </Typography>
    <Box sx={{ height: 48, width: 48, m: 1, mb: "22px", mr: hasRightToolbar ? 8 : 1, cursor: 'pointer' }}>
        <CustomAvatar avatar={{ ...settingsStore.settings.avatar, bgcolor: 'rgba(0,0,0,0)' }} viewBox={{ x: '50', y: '-110', width: '690', height: '790' }} reverse={true}/>
    </Box>
  </Stack>
    );
  })
);

export default Upbar;
