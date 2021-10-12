import React, { useEffect } from 'react';
import clsx from 'clsx';

import { Chip, Divider, FormControl, SpeedDial, SpeedDialAction, FormLabel, RadioGroup, Radio, FormControlLabel, Popper, ClickAwayListener, Paper, MenuItem, MenuList, IconButton, Button, Grid, InputBase, Typography, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
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

import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        marginLeft: 32,
        marginRight: 32,
        width: "calc(100% - 64px)",
        borderRadius: 4,
        background: theme => theme.palette.blueGrey["1"],
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: theme => theme.palette.primary.contrastText
    },
    input: {
        color: theme => theme.palette.primary.contrastText,
        //marginLeft: theme => theme.spacing(1),
        flex: 1,
        // minWidth: 100,
        maxWidth: 500,
        marginLeft: "auto",
    },
    iconButton: {
        padding: 10,
        color: theme => theme.palette.primary.contrastText,
    },
    popper: {
        zIndex: 1000,
        //position: 'fixed',
    },
    popperPaper: {
        zIndex: 1000,
        //minWidth: 200,
        backgroundColor: theme => theme.palette.blueGrey["6"]
    },
    popperPaperGrid: {
        padding: 8,
    },
    gridSpacer: {
        marginLeft: "auto",
    },
    gridNavWrap: {
        width: 120,
        marginRight: 0,
        marginLeft: 0,
    },
    Typography: {
        marginRight: 2,
        marginLeft: 2,
        color: theme => theme.palette.primary.contrastText,
        cursor: "default",
    },
    speedDial: {
        height: 36,
        width: 36,
        marginTop: 4,
        marginLeft: 16,
        // position: 'absolute',
        // top: theme => theme.spacing(10),
        // left: theme => theme.spacing(2),
    },
    speedDialActionFirst: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },
    speedDialAction: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },
    disableIcon: {
        color: props => props.palette.error.main,
    },
    activeIcon: {
        color: props => props.palette.primary.contrastText,
        backgroundColor: props => props.palette.primary.main,
        '&:hover': {
            color: props => props.palette.primary.contrastText,
            backgroundColor: props => props.palette.primary.main,
        }
    },
    iconSpeedDial: {
        height: 24,
        width: 24,
    },
    IconButtonSpeedDial: {
        color: props => props.palette.primary.contrastText,
    },
}));

const Chipper = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const knowledgeUI = uiStore.knowledgeUI

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
        <Grid
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

                <SpeedDial
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
                </SpeedDial>
                {/* <ClickAwayListener onClickAway={() => setOpenMenu(null)}>
                    <IconButton onClick={(event) => setOpenMenu(openMenu ? null : event.currentTarget)} className={classes.iconButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </ClickAwayListener> */}
                {/* <Popper className={classes.popper} id={undefined} open={Boolean(openMenu)} anchorEl={openMenu}>
                    <Paper className={classes.popperPaper}>
                        <Grid
                            className={classes.popperPaperGrid}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Вид</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={dataType} onChange={handleChange}>
                                    <FormControlLabel value="list" control={<Radio color="primary" />} label="Сетка" />
                                    <FormControlLabel value="grid" control={<Radio color="primary" />} label="Список" />
                                </RadioGroup>
                            </FormControl>

                        </Grid>

                    </Paper>
                </Popper> */}
                <InputBase
                    value={knowledgeStore.pageList.search}
                    onChange={(event) => knowledgeStore.setPageListData("search", event.target.value)}
                    className={classes.input}
                    placeholder="Поиск страниц"
                    inputProps={{ 'aria-label': 'Поиск страниц' }}
                />
                <Tooltip title="Очистить поиск">
                    <span>
                        <IconButton onClick={knowledgeStore.clearSearchInPages} disabled={knowledgeStore.pageList.search.length === 0} type="submit" className={classes.iconButton} aria-label="search">
                            <ClearIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Найти">
                    <span>
                        <IconButton onClick={() => knowledgeStore.goSearchInPages()} disabled={knowledgeStore.pageList.search.length < 3} className={classes.iconButton} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </span>
                </Tooltip>

                {/* <Tooltip title="Очистить поиск">
                        <IconButton disabled={search.length === 0} onClick={() => clearSearchHere()} type="submit" className={classes.iconButton} aria-label="search">
                            <ClearIcon />
                        </IconButton>
                    </Tooltip> */}
                <Grid className={classes.gridSpacer}>

                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.gridNavWrap}
                >
                    <Tooltip title="Назад">
                        <span>
                            <IconButton onClick={knowledgeStore.prevPageInPages} type="submit" className={classes.iconButton} disabled={knowledgeStore.pageList.counter === 0 ? true : false}>
                                <NavigateBeforeIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Страница">
                        <Typography className={classes.Typography}> {`${knowledgeStore.pageList.counter + 1}`} </Typography>
                    </Tooltip>
                    <Tooltip title="Вперёд">
                        <span>
                            <IconButton onClick={knowledgeStore.nextPageInPages} type="submit" className={classes.iconButton} disabled={knowledgeStore.pageList.pages.length < 50 ? true : false}>
                                <NavigateNextIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider className={classes.divider} />
        </Grid>
    )
}));

export default Chipper;