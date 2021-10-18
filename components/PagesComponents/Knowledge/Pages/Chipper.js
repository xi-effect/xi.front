import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';

import { Chip, Divider, useMediaQuery, SpeedDial, SpeedDialAction, FormLabel, RadioGroup, Radio, FormControlLabel, Popper, ClickAwayListener, Paper, MenuItem, MenuList, IconButton, Button, Grid, InputBase, Typography, useTheme, Tooltip } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ReorderIcon from '@mui/icons-material/Reorder';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RedoIcon from '@mui/icons-material/Redo';

import { inject, observer } from 'mobx-react'
import { filterableGridColumnsSelector } from '@material-ui/data-grid';

const PREFIX = 'Chipper';

const classes = {
    root: `${PREFIX}-root`,
    divider: `${PREFIX}-divider`,
    input: `${PREFIX}-input`,
    iconButton: `${PREFIX}-iconButton`,
    popper: `${PREFIX}-popper`,
    popperPaper: `${PREFIX}-popperPaper`,
    popperPaperGrid: `${PREFIX}-popperPaperGrid`,
    gridSpacer: `${PREFIX}-gridSpacer`,
    gridNavWrap: `${PREFIX}-gridNavWrap`,
    Typography: `${PREFIX}-Typography`,
    speedDial: `${PREFIX}-speedDial`,
    speedDialActionFirst: `${PREFIX}-speedDialActionFirst`,
    speedDialAction: `${PREFIX}-speedDialAction`,
    disableIcon: `${PREFIX}-disableIcon`,
    activeIcon: `${PREFIX}-activeIcon`,
    iconSpeedDial: `${PREFIX}-iconSpeedDial`,
    IconButtonSpeedDial: `${PREFIX}-IconButtonSpeedDial`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        margin: 0,
        marginLeft: 32,
        marginRight: 32,
        width: "calc(100% - 64px)",
        borderRadius: 4,
        background: theme => theme.palette.blueGrey["1"],
    },

    [`& .${classes.divider}`]: {
        width: "100%",
        height: 1,
        backgroundColor: theme => theme.palette.primary.contrastText
    },

    [`& .${classes.input}`]: {
        color: theme => theme.palette.primary.contrastText,
        //marginLeft: theme => theme.spacing(1),
        flex: 1,
        // minWidth: 100,
        maxWidth: 500,
        marginLeft: "auto",
    },

    [`& .${classes.iconButton}`]: {
        //padding: 10,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.popper}`]: {
        zIndex: 1000,
        //position: 'fixed',
    },

    [`& .${classes.popperPaper}`]: {
        zIndex: 1000,
        //minWidth: 200,
        backgroundColor: theme => theme.palette.blueGrey["6"]
    },

    [`& .${classes.popperPaperGrid}`]: {
        padding: 8,
    },

    [`& .${classes.gridSpacer}`]: {
        marginLeft: "auto",
    },

    [`& .${classes.gridNavWrap}`]: {
        width: 120,
        marginRight: 0,
        marginLeft: 0,
    },

    [`& .${classes.Typography}`]: {
        marginRight: 2,
        marginLeft: 2,
        color: theme => theme.palette.primary.contrastText,
        cursor: "default",
    },

    [`& .${classes.speedDial}`]: {
        height: 36,
        width: 36,
        marginTop: 4,
        marginLeft: 16,
        // position: 'absolute',
        // top: theme => theme.spacing(10),
        // left: theme => theme.spacing(2),
    },

    [`& .${classes.speedDialActionFirst}`]: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.speedDialAction}`]: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.disableIcon}`]: {
        color: props => props.palette.error.main,
    },

    [`& .${classes.activeIcon}`]: {
        color: props => props.palette.primary.contrastText,
        backgroundColor: props => props.palette.primary.main,
        '&:hover': {
            color: props => props.palette.primary.contrastText,
            backgroundColor: props => props.palette.primary.main,
        }
    },

    [`& .${classes.iconSpeedDial}`]: {
        height: 24,
        width: 24,
    },

    [`& .${classes.IconButtonSpeedDial}`]: {
        color: props => props.palette.primary.contrastText,
    }
}));

const Chipper = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();

    const knowledgeUI = uiStore.knowledgeUI
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));

    const setGridType = (type) => {
        if (type === "grid") {
            localStorage.setItem("gridTypeOnPageInKnowleadge", "list")
            uiStore.setKnowledgeUI("gridTypeOnPage", "list")
            console.log(localStorage.getItem("gridTypeOnPageInKnowleadge"))
        }
        else if (type === "list") {
            localStorage.setItem("gridTypeOnPageInKnowleadge", "grid")
            uiStore.setKnowledgeUI("gridTypeOnPage", "grid")
        }
    }

    const setContentType = (type) => {
        if (type === "info") {
            localStorage.setItem("contentTypeOnPageInKnowleadge", "description")
            uiStore.setKnowledgeUI("contentTypeOnPage", "description")
        }
        else if (type === "description") {
            localStorage.setItem("contentTypeOnPageInKnowleadge", "author")
            uiStore.setKnowledgeUI("contentTypeOnPage", "author")
        }
        else if (type === "author") {
            localStorage.setItem("contentTypeOnPageInKnowleadge", "info")
            uiStore.setKnowledgeUI("contentTypeOnPage", "info")
        }
    }

    const [mobileSearch, setMobileSearch] = React.useState(false);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const gridTypeIcon = (type) => {
        if (type === "grid") return <ViewComfyIcon />
        if (type === "list") return <ReorderIcon />
    }

    const gridTypeLabel = (type) => {
        if (type === "grid") return "Сетка"
        if (type === "list") return "Лента"
    }

    const cardContentIcon = (type) => {
        if (type === "info") return <AnalyticsIcon />
        if (type === "description") return <DescriptionIcon />
        if (type === "author") return <AccountCircleIcon />
    }

    const cardContentLabel = (type) => {
        if (type === "info") return "Информация"
        if (type === "description") return "Описание"
        if (type === "author") return "Автор"
    }


    return (
        <StyledGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid
                item
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >

                {(!mobileSearch || !mobile) && <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    // hidden={hidden}
                    // icon={<IconButton className={classes.IconButtonSpeedDial}>
                    //     <TuneIcon className={classes.iconSpeedDial} />
                    // </IconButton>}
                    icon={
                        <TuneIcon className={classes.iconSpeedDial} />
                    }
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction="right"
                >
                    <SpeedDialAction
                        className={clsx(classes.speedDialActionFirst)}
                        tooltipPlacement="bottom"
                        icon={gridTypeIcon(knowledgeUI.gridTypeOnPage)}
                        tooltipTitle={`Вид сетки. Сейчас - ${gridTypeLabel(knowledgeUI.gridTypeOnPage)}`}
                        //tooltipOpen
                        onClick={() => setGridType(knowledgeUI.gridTypeOnPage)}
                    />
                    {/* { [classes.disableIcon]: true } */}
                    <SpeedDialAction
                        className={clsx(classes.speedDialAction)}
                        tooltipPlacement="bottom"
                        icon={cardContentIcon(knowledgeUI.contentTypeOnPage)}
                        tooltipTitle={`Изменить содержание карточки. Сейчас - ${cardContentLabel(knowledgeUI.contentTypeOnPage)}`}
                        //tooltipOpen
                        onClick={() => setContentType(knowledgeUI.contentTypeOnPage)}
                    />
                </SpeedDial>}


                {/* Поиск в десктоп */}
                {!mobile && <InputBase
                    value={knowledgeStore.pageList.search}
                    onChange={(event) => knowledgeStore.setPageListData("search", event.target.value)}
                    className={classes.input}
                    placeholder="Поиск страниц"
                    inputProps={{ 'aria-label': 'Поиск страниц' }}
                />}
                {!mobile && <Tooltip title="Очистить поиск">
                    <span>
                        <IconButton
                            onClick={knowledgeStore.clearSearchInPages}
                            disabled={knowledgeStore.pageList.search.length === 0}
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                            size="large">
                            <ClearIcon />
                        </IconButton>
                    </span>
                </Tooltip>}
                {!mobile && <Tooltip title="Найти">
                    <span>
                        <IconButton
                            className={clsx(classes.iconButton)}
                            onClick={() => knowledgeStore.goSearchInPages()}
                            disabled={mobile ? false : knowledgeStore.pageList.search.length < 3}
                            aria-label="search"
                            size="large">
                            <SearchIcon />
                        </IconButton>
                    </span>
                </Tooltip>}

                {mobileSearch && mobile && <InputBase
                    value={knowledgeStore.pageList.search}
                    onChange={(event) => knowledgeStore.setPageListData("search", event.target.value)}
                    className={classes.input}
                    placeholder="Поиск страниц"
                    inputProps={{ 'aria-label': 'Поиск страниц' }}
                />}

                {/* <Tooltip title="Очистить поиск">
                        <IconButton disabled={search.length === 0} onClick={() => clearSearchHere()} type="submit" className={classes.iconButton} aria-label="search">
                            <ClearIcon />
                        </IconButton>
                    </Tooltip> */}
                <Grid className={classes.gridSpacer}>

                </Grid>
                {mobileSearch && mobile && <Tooltip title="Очистить поиск">
                    <span>
                        <IconButton
                            onClick={knowledgeStore.clearSearchInPages}
                            disabled={knowledgeStore.pageList.search.length === 0}
                            type="submit"
                            className={classes.iconButton}
                            aria-label="search"
                            size="large">
                            <ClearIcon />
                        </IconButton>
                    </span>
                </Tooltip>}
                {!mobileSearch && mobile && <Tooltip title="Очистить поиск">
                    <span>
                        <IconButton
                            className={clsx(classes.iconButton)}
                            onClick={() => setMobileSearch(true)}
                            disabled={mobile ? false : knowledgeStore.pageList.search.length < 3}
                            aria-label="search"
                            size="large">
                            <SearchIcon />
                        </IconButton>
                    </span>
                </Tooltip>}
                {mobileSearch && mobile && <Tooltip title="Найти">
                    <span>
                        <IconButton
                            className={clsx(classes.iconButton)}
                            onClick={() => knowledgeStore.goSearchInPages()}
                            disabled={mobile ? false : knowledgeStore.pageList.search.length < 3}
                            aria-label="search"
                            size="large">
                            <SearchIcon />
                        </IconButton>
                    </span>
                </Tooltip>}
                {mobileSearch && mobile && <Tooltip title="Назад">
                    <span>
                        <IconButton
                            className={clsx(classes.iconButton)}
                            onClick={() => setMobileSearch(false)}
                            disabled={mobile ? false : knowledgeStore.pageList.search.length < 3}
                            aria-label="search"
                            size="large">
                            <RedoIcon />
                        </IconButton>
                    </span>
                </Tooltip>}
                {(!mobileSearch || !mobile) && <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.gridNavWrap}
                >
                    <Tooltip title="Назад">
                        <span>
                            <IconButton
                                onClick={knowledgeStore.prevPageInPages}
                                type="submit"
                                className={classes.iconButton}
                                disabled={knowledgeStore.pageList.counter === 0 ? true : false}
                                size="large">
                                <NavigateBeforeIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Страница">
                        <Typography className={classes.Typography}> {`${knowledgeStore.pageList.counter + 1}`} </Typography>
                    </Tooltip>
                    <Tooltip title="Вперёд">
                        <span>
                            <IconButton
                                onClick={knowledgeStore.nextPageInPages}
                                type="submit"
                                className={classes.iconButton}
                                disabled={knowledgeStore.pageList.pages.length < 50 ? true : false}
                                size="large">
                                <NavigateNextIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>}
            </Grid>
            <Divider className={classes.divider} />
        </StyledGrid>
    );
}));

export default Chipper;