/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import clsx from 'clsx';


import { Chip, Divider, Accordion, SpeedDial, SpeedDialAction, AccordionSummary, AccordionDetails, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Popper, ClickAwayListener, Paper, MenuItem, MenuList, IconButton, Button, Grid, InputBase, Typography, useTheme, Tooltip } from '@mui/material';
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
        paddingTop: 16,
        paddingLeft: 12,
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
        backgroundColor: theme => theme.palette.primary.contrastText
    },
    Accordion: {
        backgroundColor: theme => theme.palette.blueGrey["1"],
        color: theme => theme.palette.primary.contrastText,
    },
    AccordionDetails: {
        marginTop: 0,
        paddingTop: 0,
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
    iconButton: {
        padding: 10,
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
        width: 120,
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
                        >
                            {/* <SpeedDial
                                ariaLabel="SpeedDial tooltip example"
                                className={classes.speedDial}
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
                                    onClick={() => setGridType(knowledgeUI.gridTypeOnPage)}
                                />
                                <SpeedDialAction
                                    className={clsx(classes.speedDialAction)}
                                    tooltipPlacement="bottom"
                                    icon={cardContentIcon(knowledgeUI.contentTypeOnPage)}
                                    tooltipTitle={`Изменить содержание карточки. Сейчас - ${cardContentLabel(knowledgeUI.contentTypeOnPage)}`}
                                    onClick={() => setContentType(knowledgeUI.contentTypeOnPage)}
                                />
                            </SpeedDial> */}
                            <Tooltip title="Фильтры">
                                <span>
                                    <IconButton onClick={() => setOpen(!open)}>
                                        <ExpandMoreIcon
                                            className={clsx(classes.ExpandMoreIcon, {
                                                [classes.ExpandMoreIconOpen]: open,
                                            })}
                                        />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            
                            <Tooltip disableHoverListener={!open} title="Применить фильтры">
                                <span>
                                    <IconButton color="inherit" disabled={!open} onClick={() => knowledgeStore.loadModuleList()}>
                                        <SavedSearchIcon
                                            // className={clsx(classes.ExpandMoreIcon, {
                                            //     [classes.ExpandMoreIconOpen]: open,
                                            // })}
                                        />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip disableHoverListener={!open} title="Удалить фильтры">
                                <span>
                                    <IconButton color="inherit" disabled={!open} onClick={() => knowledgeStore.clearFilters()}>
                                        <SearchOffIcon
                                            // className={clsx(classes.ExpandMoreIcon, {
                                            //     [classes.ExpandMoreIconOpen]: open,
                                            // })}
                                        />
                                    </IconButton>
                                </span>
                            </Tooltip>
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
                            <InputBase
                                value={knowledgeStore.moduleList.search}
                                onChange={(event) => knowledgeStore.setModuleListData("search", event.target.value)}
                                className={classes.input}
                                placeholder="Поиск модулей"
                                inputProps={{ 'aria-label': 'Поиск страниц' }}
                            />
                            <Tooltip title="Очистить поиск">
                                <span>
                                    <IconButton onClick={() => knowledgeStore.clearSearchInModules()} disabled={knowledgeStore.moduleList.search.length === 0} type="submit" className={classes.iconButton} aria-label="search">
                                        <ClearIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                            <Tooltip title="Найти">
                                <span>
                                    <IconButton onClick={() => knowledgeStore.goSearchInModules()} disabled={knowledgeStore.moduleList.search.length < 3} className={classes.iconButton} aria-label="search">
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
                            </Grid>
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
                                <Typography className={classes.labelFilterColumn}> Глобальные: </Typography>
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
                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Typography className={classes.labelFilterColumn}> По Категории: </Typography>
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
                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Typography className={classes.labelFilterColumn}> По Теме: </Typography>
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
                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Typography className={classes.labelFilterColumn}> По Сложности: </Typography>
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
                            </Grid>
                            <Grid
                                item
                                className={classes.filterColumn}
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Typography className={classes.labelFilterColumn}> Сортировка: </Typography>
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
