/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import clsx from 'clsx';


import { Chip, Divider, Accordion, useMediaQuery, SpeedDial, SpeedDialAction, AccordionSummary, AccordionDetails, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Popper, ClickAwayListener, Paper, MenuItem, MenuList, IconButton, Button, Grid, InputBase, Typography, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import RedoIcon from '@mui/icons-material/Redo';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        marginLeft: 32,
        marginRight: 32,
        width: "calc(100% - 64px)",
        borderRadius: 4,
        background: theme => theme.palette.blueGrey["1"],
    },
    gridChip: {
        marginLeft: '6px',
        marginTop: '8px',
        cursor: 'pointer',
    },
    chip: {
        border: '2px solid',
        borderColor: theme => theme.palette.primary.contrastText,
        cursor: 'pointer',
        // backgroundColor: "rgb(0,0,0, .0)",
        '&:hover': {
            //backgroundColor: "rgb(0,0,0, .0)"
        }
    },
    chipClicked: {
        backgroundColor: theme => theme.palette.primary.main,
        borderColor: theme => theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme => theme.palette.primary.main,
            borderColor: theme => theme.palette.primary.main,
        }
    },
    chipTypography: {
        fontSize: 18,
        cursor: 'pointer',
        color: theme => theme.palette.primary.contrastText,
    },
    labelTypography: {
        paddingRight: 4,
        fontSize: 18,
        color: theme => theme.palette.primary.contrastText,
    },
    labelTypographyAccept: {
        paddingRight: 4,
        fontSize: 16,
    },
    icons: {
        color: theme => theme.palette.primary.contrastText,
    },
    filterColumn: {
        width: 'auto',
        paddingLeft: 8,
        paddingRight: 8,
    },
    labelFilterColumn: {
        marginTop: 4,
        // paddingTop: 16,
        // paddingLeft: 12,
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },
    gridFilters: {
        marginTop: 0,
        marginBottom: 8,
    },
    gridLabelTypographyAccept: {
        paddingTop: 8,
        paddingLeft: 8,
        paddingBottom: 8,
    },
    formControl: {
        marginBottom: 4,
    },
    typographyInputLabel: {
        color: theme => theme.palette.primary.contrastText,
    },
    applyButton: {
        marginLeft: 8,
        color: theme => theme.palette.primary.contrastText,
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: theme => theme.palette.primary.contrastText
    },
    Accordion: {
        width: "100%",
        backgroundColor: theme => theme.palette.blueGrey["1"],
        color: theme => theme.palette.primary.contrastText,
    },
    gridAccordionSummary: {
        width: "100%",
    },
    AccordionDetails: {
        marginTop: 0,
        paddingTop: 0,
    },
    iconButton: {
        //  padding: 10,
        color: theme => theme.palette.primary.contrastText,
    },
    input: {
        color: theme => theme.palette.primary.contrastText,
        //marginLeft: theme => theme.spacing(1),
        flex: 1,
        // minWidth: 100,
        maxWidth: 500,
        marginLeft: "auto",
    },
    gridSpacer: {
        marginLeft: "auto",
    },
    gridNavWrap: {
        width: 100,
        marginRight: 0,
        marginLeft: 0,
    },
    ExpandMoreIcon: {
        color: theme => theme.palette.primary.contrastText,
        transform: "rotate(-90deg)",
        transition: "0.2s",
    },
    ExpandMoreIconOpen: {
        color: theme => theme.palette.primary.contrastText,
        transform: "rotate(0deg)",
        transition: "0.2s",
    }
}));

const Chipper = inject('rootStore', 'knowledgeStore', 'uiStore')(observer(({ rootStore, knowledgeStore, uiStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [open, setOpen] = React.useState(false);
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));
    const [mobileSearch, setMobileSearch] = React.useState(false);
    const [openGlobalList, setOpenGlobalList] = React.useState(false);
    const [openСategoryList, setOpenСategoryList] = React.useState(false);
    const [openThemeList, setOpenThemeList] = React.useState(false);
    const [openDifficultyList, setOpenDifficultyList] = React.useState(false);
    const [openSortList, setOpenSortList] = React.useState(false);


    const globalList = [
        { key: 0, title: "Избранное", name: "starred" },
        { key: 1, title: "Закреплённое", name: "pinned" },
        { key: 2, title: "Начатое", name: "started" },
    ]

    const categoryList = [
        { key: 0, title: "Средняя школа", name: "middle-school" },
        { key: 1, title: "Основная школа", name: "main-school" },
        { key: 2, title: "Высшая школа", name: "high-school" },
        { key: 3, title: "Высшее образование", name: "university" },
        { key: 4, title: "Кружки", name: "clubs" },
        { key: 5, title: "Хобби", name: "hobby" },
        { key: 6, title: "ОГЭ", name: "bne" },
        { key: 7, title: "ЕГЭ", name: "une" },
        { key: 8, title: "Профессиональные навыки", name: "prof-skills" },
    ]

    const themeList = [
        { key: 0, title: "Математика", name: "math" },
        { key: 1, title: "Алгебра", name: "algebra" },
        { key: 2, title: "Геометрия", name: "geometry" },
        { key: 3, title: "Языки", name: "languages" },
        { key: 4, title: "Физика", name: "physics" },
        { key: 5, title: "Химия", name: "chemistry" },
        { key: 6, title: "Биология", name: "biology" },
        { key: 7, title: "География", name: "geography" },
        { key: 8, title: "История", name: "history" },
        { key: 9, title: "Обществознание", name: "social-science" },
        { key: 10, title: "Искусства", name: "arts" },
        { key: 11, title: "Информатика", name: "informatics" },
        { key: 12, title: "Литература", name: "literature" },
        { key: 13, title: "Философия", name: "philosophy" },
    ]

    const difficultyList = [
        { key: 0, title: "Обзорный", name: "review" },
        { key: 1, title: "Новичок", name: "newbie" },
        { key: 2, title: "Любитель", name: "amateur" },
        { key: 3, title: "Энтузиаст", name: "enthusiast" },
        { key: 4, title: "Профи", name: "professional" },
        { key: 5, title: "Эксперт", name: "expert" },
    ]

    const sortList = [
        { key: 0, title: "По популярности", clicked: true, name: "popularity" },
        { key: 1, title: "По дате посещения: сначала недавние", clicked: false, name: "visit-date" },
        { key: 2, title: "По дате создания: сначала новые", clicked: false, name: "creation-date" },
    ]

    React.useEffect(() => {
        rootStore.fetchDataScr(`${rootStore.url}/filters/`, "GET")
            .then((data) => {
                console.log("filtersI:", data)
                // if (data != undefined) {
                //     store.setFiltersGlobal(data)
                //     if (!store.allLoading) store.loadingMoreCourses()
                // }
            });

    }, []);




    return (
        <>
            <Grid container direction="column" className={classes.root}>
                <Accordion elevation={0} className={classes.Accordion} expanded={open}>
                    <AccordionSummary
                        className={classes.AccordionSummary}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            className={classes.gridAccordionSummary}
                        >
                            {(!mobileSearch || !mobile) && <Tooltip title="Фильтры">
                                <span>
                                    <IconButton onClick={() => setOpen(!open)}>
                                        <ExpandMoreIcon
                                            className={clsx(classes.ExpandMoreIcon, {
                                                [classes.ExpandMoreIconOpen]: open,
                                            })}
                                        />
                                    </IconButton>
                                </span>
                            </Tooltip>}
                            {(!mobileSearch || !mobile) && <Tooltip disableHoverListener={!open} title="Применить фильтры">
                                <span>
                                    <IconButton color="inherit" disabled={!open} onClick={() => knowledgeStore.loadModuleList()}>
                                        <SavedSearchIcon
                                        // className={clsx(classes.ExpandMoreIcon, {
                                        //     [classes.ExpandMoreIconOpen]: open,
                                        // })}
                                        />
                                    </IconButton>
                                </span>
                            </Tooltip>}
                            {(!mobileSearch || !mobile) && <Tooltip disableHoverListener={!open} title="Удалить фильтры">
                                <span>
                                    <IconButton color="inherit" disabled={!open} onClick={() => knowledgeStore.clearFilters()}>
                                        <SearchOffIcon
                                        // className={clsx(classes.ExpandMoreIcon, {
                                        //     [classes.ExpandMoreIconOpen]: open,
                                        // })}
                                        />
                                    </IconButton>
                                </span>
                            </Tooltip>}
                            {/* <Button onClick={() => knowledgeStore.loadModuleList()} disabled={!open} className={classes.applyButton}>
                                Применить фильтры
                            </Button> */}
                            {/* <Tooltip title="Очистить фильтры">
                                <span> */}
                            {/* <IconButton disabled={!open} onClick={() => knowledgeStore.clearFilters()}>
                                        <ClearAllIcon/>
                                    </IconButton> */}
                            {/* </span>
                            </Tooltip> */}

                            {/* Поиск в десктоп */}
                            {!mobile && <InputBase
                                value={knowledgeStore.moduleList.search}
                                onChange={(event) => knowledgeStore.setModuleListData("search", event.target.value)}
                                className={classes.input}
                                placeholder="Поиск модулей"
                                inputProps={{ 'aria-label': 'Поиск страниц' }}
                            />}
                            {!mobile && <Tooltip title="Очистить поиск">
                                <span>
                                    <IconButton onClick={() => knowledgeStore.clearSearchInModules()} disabled={knowledgeStore.moduleList.search.length === 0} type="submit" className={classes.iconButton} aria-label="search">
                                        <ClearIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>}
                            {!mobile && <Tooltip title="Найти">
                                <span>
                                    <IconButton onClick={() => knowledgeStore.goSearchInModules()} disabled={knowledgeStore.moduleList.search.length < 3} className={classes.iconButton} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>}

                            {mobileSearch && mobile && <InputBase
                                value={knowledgeStore.moduleList.search}
                                onChange={(event) => knowledgeStore.setModuleListData("search", event.target.value)}
                                className={classes.input}
                                placeholder="Поиск модулей"
                                inputProps={{ 'aria-label': 'Поиск страниц' }}
                            />}
                            <Grid className={classes.gridSpacer}>

                            </Grid>
                            {mobileSearch && mobile && <Tooltip title="Очистить поиск">
                                <span>
                                    <IconButton onClick={knowledgeStore.clearSearchInModules} disabled={knowledgeStore.moduleList.search.length === 0} type="submit" className={classes.iconButton} aria-label="search">
                                        <ClearIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>}
                            {!mobileSearch && mobile && <Tooltip title="Очистить поиск">
                                <span>
                                    <IconButton className={clsx(classes.iconButton)} onClick={() => setMobileSearch(true)} disabled={mobile ? false : knowledgeStore.moduleList.search.length < 3} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>}
                            {mobileSearch && mobile && <Tooltip title="Найти">
                                <span>
                                    <IconButton className={clsx(classes.iconButton)} onClick={() => knowledgeStore.goSearchInModules()} disabled={mobile ? false : knowledgeStore.moduleList.search.length < 3} aria-label="search">
                                        <SearchIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>}
                            {mobileSearch && mobile && <Tooltip title="Назад">
                                <span>
                                    <IconButton className={clsx(classes.iconButton)} onClick={() => setMobileSearch(false)} disabled={mobile ? false : knowledgeStore.moduleList.search.length < 3} aria-label="search">
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
                                        <IconButton onClick={knowledgeStore.prevPageInModules} type="submit" className={classes.iconButton} disabled={knowledgeStore.moduleList.counter === 0 ? true : false}>
                                            <NavigateBeforeIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Страница">
                                    <Typography className={classes.Typography}> {`${knowledgeStore.moduleList.counter + 1}`} </Typography>
                                </Tooltip>
                                <Tooltip title="Вперёд">
                                    <span>
                                        <IconButton onClick={knowledgeStore.nextPageInModules} type="submit" className={classes.iconButton} disabled={knowledgeStore.moduleList.modules.length < 12 ? true : false}>
                                            <NavigateNextIcon />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>}
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails className={classes.AccordionDetails}>
                        <Grid
                            item
                            className={classes.gridFilters}
                            container
                            direction="row"
                        >
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Accordion elevation={0} className={classes.Accordion} expanded={openGlobalList}>
                                    <AccordionSummary
                                        onClick={() => setOpenGlobalList(!openGlobalList)}
                                        className={classes.AccordionSummary}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Tooltip title="Фильтры">
                                            <span>
                                                <IconButton>
                                                    <ArrowDropDownIcon
                                                        className={clsx(classes.ExpandMoreIcon, {
                                                            [classes.ExpandMoreIconOpen]: openGlobalList,
                                                        })}
                                                    />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Typography className={classes.labelFilterColumn}> Глобальные </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.AccordionDetails}>
                                        {globalList.map((chip, index) => (
                                            <Grid className={classes.gridChip} key={chip.key.toString()}>
                                                <Chip
                                                    //clickable={false}
                                                    className={clsx(classes.chip, {
                                                        [classes.chipClicked]: chip.name === knowledgeStore.moduleList.filters.global,
                                                    })}
                                                    onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "global", chip.name === knowledgeStore.moduleList.filters.global ? null : chip.name)}
                                                    label={
                                                        <Typography className={classes.chipTypography}>
                                                            {chip.title}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </AccordionDetails>

                                </Accordion>

                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Accordion elevation={0} className={classes.Accordion} expanded={openСategoryList}>
                                    <AccordionSummary
                                        onClick={() => setOpenСategoryList(!openСategoryList)}
                                        className={classes.AccordionSummary}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Tooltip title="Фильтры">
                                            <span>
                                                <IconButton >
                                                    <ArrowDropDownIcon
                                                        className={clsx(classes.ExpandMoreIcon, {
                                                            [classes.ExpandMoreIconOpen]: openСategoryList,
                                                        })}
                                                    />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Typography className={classes.labelFilterColumn}> По Категории </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.AccordionDetails}>
                                        {categoryList.map((chip) => (
                                            <Grid className={classes.gridChip} key={chip.key.toString()}>
                                                <Chip
                                                    clickable={false}
                                                    className={clsx(classes.chip, {
                                                        [classes.chipClicked]: chip.name === knowledgeStore.moduleList.filters.category,
                                                    })}
                                                    onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "category", chip.name === knowledgeStore.moduleList.filters.category ? null : chip.name)}
                                                    label={
                                                        <Typography className={classes.chipTypography}>
                                                            {chip.title}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Accordion elevation={0} className={classes.Accordion} expanded={openThemeList}>
                                    <AccordionSummary
                                        onClick={() => setOpenThemeList(!openThemeList)}
                                        className={classes.AccordionSummary}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Tooltip title="Фильтры">
                                            <span>
                                                <IconButton>
                                                    <ArrowDropDownIcon
                                                        className={clsx(classes.ExpandMoreIcon, {
                                                            [classes.ExpandMoreIconOpen]: openThemeList,
                                                        })}
                                                    />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Typography className={classes.labelFilterColumn}> По Теме </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.AccordionDetails}>
                                        {themeList.map((chip) => (
                                            <Grid className={classes.gridChip} key={chip.key.toString()}>
                                                <Chip
                                                    clickable={false}
                                                    className={clsx(classes.chip, {
                                                        [classes.chipClicked]: chip.name === knowledgeStore.moduleList.filters.theme,
                                                    })}
                                                    onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "theme", chip.name === knowledgeStore.moduleList.filters.theme ? null : chip.name)}
                                                    label={
                                                        <Typography className={classes.chipTypography}>
                                                            {chip.title}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Accordion elevation={0} className={classes.Accordion} expanded={openDifficultyList}>
                                    <AccordionSummary
                                        onClick={() => setOpenDifficultyList(!openDifficultyList)}
                                        className={classes.AccordionSummary}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Tooltip title="Фильтры">
                                            <span>
                                                <IconButton>
                                                    <ArrowDropDownIcon
                                                        className={clsx(classes.ExpandMoreIcon, {
                                                            [classes.ExpandMoreIconOpen]: openDifficultyList,
                                                        })}
                                                    />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Typography className={classes.labelFilterColumn}> По Сложности </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.AccordionDetails}>
                                        {difficultyList.map((chip) => (
                                            <Grid className={classes.gridChip} key={chip.key.toString()}>
                                                <Chip
                                                    clickable={false}
                                                    className={clsx(classes.chip, {
                                                        [classes.chipClicked]: chip.name === knowledgeStore.moduleList.filters.difficulty,
                                                    })}
                                                    onClick={() => knowledgeStore.setModuleListDataSecondary("filters", "difficulty", chip.name === knowledgeStore.moduleList.filters.difficulty ? null : chip.name)}
                                                    label={
                                                        <Typography className={classes.chipTypography}>
                                                            {chip.title}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Accordion elevation={0} className={classes.Accordion} expanded={openSortList}>
                                    <AccordionSummary
                                        onClick={() => setOpenSortList(!openSortList)}
                                        className={classes.AccordionSummary}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Tooltip title="Фильтры">
                                            <span>
                                                <IconButton >
                                                    <ArrowDropDownIcon
                                                        className={clsx(classes.ExpandMoreIcon, {
                                                            [classes.ExpandMoreIconOpen]: openSortList,
                                                        })}
                                                    />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Typography className={classes.labelFilterColumn}> Сортировка </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.AccordionDetails}>
                                        {sortList.map((chip) => (
                                            <Grid className={classes.gridChip} key={chip.key.toString()}>
                                                <Chip
                                                    clickable={false}
                                                    className={clsx(classes.chip, {
                                                        [classes.chipClicked]: chip.name === knowledgeStore.moduleList.sort,
                                                    })}
                                                    onClick={() => knowledgeStore.setModuleListData("sort", chip.name)}
                                                    label={
                                                        <Typography className={classes.chipTypography}>
                                                            {chip.title}
                                                        </Typography>
                                                    }
                                                />
                                            </Grid>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Divider className={classes.divider} />
            </Grid>
        </>
    )
}));

export default Chipper;
