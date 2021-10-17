import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router'
import { Pagination, useMediaQuery, Link, Box, Accordion, Tabs, Tab, AccordionSummary, AccordionDetails, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Popper, ClickAwayListener, Paper, MenuItem, MenuList, IconButton, Button, Grid, InputBase, Typography, useTheme, Tooltip } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import DescriptionIcon from '@mui/icons-material/Description';
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const categoryList = {
    "middle-school": "Средняя школа",
    "main-school": "Основная школа",
    "high-school": "Высшая школа",
    "university": "Высшее образование",
    "clubs": "Кружки",
    "hobby": "Хобби",
    "bne": "ОГЭ",
    "une": "ЕГЭ",
    "prof-skills": "Профессиональные навыки",
}

const themeList = {
    "math": "Математика",
    "algebra": "Алгебра",
    "geometry": "Геометрия",
    "languages": "Языки",
    "physics": "Физика",
    "chemistry": "Химия",
    "biology": "Биология",
    "geography": "География",
    "history": "История",
    "social-science": "Обществознание",
    "arts": "Искусства",
    "informatics": "Информатика",
    "literature": "Литература",
    "philosophy": "Философия",
}

const difficultyList = {
    "review": "Обзорный",
    "newbie": "Новичок",
    "amateur": "Любитель",
    "enthusiast": "Энтузиаст",
    "professional": "Профи",
    "expert": "Эксперт",
}

const AntTabs = withStyles((theme) => ({
    root: {
        //width: "100%",
        //backgroundColor: theme => theme.palette.blueGrey["3"],
        borderBottom: '0px solid #e8e8e8',
    },
    indicator: {
        height: "4px",
        backgroundColor: '#1976d2',
    },
}))(Tabs);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const useStyles = makeStyles((theme) => ({
    wrapperRoot: {
        //marginTop: 16,
        //maxWidth: 800,
    },
    wrapper: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        width: "calc(100% - 4px)",
        margin: 1,
        padding: 1,
    },
    Accordion: {
        zIndex: 2000,
        width: "100%",
        backgroundColor: theme => theme.palette.blueGrey["2"],
        color: theme => theme.palette.primary.contrastText,
    },
    AccordionSummary: {
        height: 36,
        marginLeft: -8,
        backgroundColor: theme => theme.palette.blueGrey["3"],
    },
    AccordionDetails: {
        marginTop: 0,
        paddingTop: 0,
    },
    moduleAppbar: {
        zIndex: 2000,
        position: "fixed",
        top: 0,
        left: 72,
        width: "calc(100% - 72px)",
    },
    moduleAppbarMobile: {
        left: 0,
        position: "fixed",
        top: 0,
        width: "100%",
    },
    gridSpacer: {
        marginLeft: "auto",
    },
    gridNavWrap: {
        //width: 120,
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
    },
    moduleLabel: {
        color: theme => theme.palette.primary.contrastText,
    },
    slashLabel: {
        marginLeft: 8,
        marginRight: 8,
    },
    descriptionLabel: {
        marginTop: 16,
        fontSize: 20,
    },
    Divider: {
        backgroundColor: theme => theme.palette.primary.contrastText,
    },
    gridWrapperMeta: {
        marginTop: 8,
        // marginLeft: 32,
    },
    tabLabel: {
        fontSize: "14px",
        color: theme => theme.palette.primary.contrastText,
    },
    gridTabsWrapper: {
        width: "100%",
    },
    AntTabs: {
        marginLeft: -16,
        width: "calc(100% + 32px)",
        backgroundColor: theme => theme.palette.blueGrey["3"],
    },
    Link: {
        cursor: "pointer",
    },
    Pagination: {
        color: theme => theme.palette.primary.contrastText,
    },
    Icon: {
        color: theme => theme.palette.primary.contrastText,
    }
}));


const ModuleInfo = inject('knowledgeStore')(observer(({ knowledgeStore, children }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

    React.useEffect(() => {

    }, [])

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [paginationCounter, setPaginationCounter] = React.useState(1);

    const handleChangePagination = (event, value) => {
        setPaginationCounter(value);
    };

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.wrapperRoot}
        >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                className={clsx(classes.moduleAppbar, { [classes.moduleAppbarMobile]: mobile, })}
            >
                <Accordion elevation={24} className={classes.Accordion} expanded={knowledgeStore.module.openAccordion === undefined ? false : knowledgeStore.module.openAccordion}>
                    <AccordionSummary
                        className={classes.AccordionSummary}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Grid container direction="row" alignItems="center">
                                    <Tooltip title="Фильтры">
                                        <span>
                                            <IconButton onClick={() => knowledgeStore.setModuleData("openAccordion", !knowledgeStore.module.openAccordion)}>
                                                <ExpandMoreIcon
                                                    className={clsx(classes.ExpandMoreIcon, {
                                                        [classes.ExpandMoreIconOpen]: knowledgeStore.module.openAccordion,
                                                    })}
                                                />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                    {!mobile && <Typography variant="h6" className={classes.moduleLabel}>
                                        {knowledgeStore.module.name}
                                    </Typography>}
                                    {!mobile && knowledgeStore.page.name != "" && <Typography variant="h5" className={classes.slashLabel}>
                                        {"/"}
                                    </Typography>}
                                    {!mobile && <Typography variant="h6" className={classes.pageLabel}>
                                        {knowledgeStore.page.name}
                                    </Typography>}
                                </Grid>

                            </Grid>
                            <Grid item>

                            </Grid>
                            <Grid item>
                                <Tooltip title="Вперёд">
                                    <span>
                                        <IconButton onClick={null}>
                                            <DoubleArrowIcon className={classes.Icon} />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails className={classes.AccordionDetails}>
                        {/* <Divider className={classes.Divider} /> */}
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >

                            <Grid className={classes.gridTabsWrapper}>
                                {!mobile && <AntTabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="full width tabs example"
                                    //variant="fullWidth"
                                    centered
                                    className={classes.AntTabs}
                                >
                                    <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Pages")} label={<Typography className={classes.tabLabel}>Описание</Typography>} {...a11yProps(0)} />
                                    {knowledgeStore.module["map"] != undefined && <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<Typography className={classes.tabLabel}>Навигация</Typography>} {...a11yProps(1)} />}
                                    <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<Typography className={classes.tabLabel}>Статистика</Typography>} {...a11yProps(2)} />
                                    <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<Typography className={classes.tabLabel}>Об Авторе</Typography>} {...a11yProps(3)} />

                                    {/* <Tab label={<Typography className={classes.tabLabel}>Модерация</Typography>} {...a11yProps(2)} /> */}
                                    {/* <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Others")} label={<Typography className={classes.tabLabel}><MoreHorizIcon /></Typography>} {...a11yProps(2)} /> */}
                                </AntTabs>}
                                {mobile && <AntTabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="full width tabs example"
                                    //variant="fullWidth"
                                    centered
                                    className={classes.AntTabs}
                                >
                                    <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Pages")} label={<DescriptionIcon className={classes.Icon} />} {...a11yProps(0)} />
                                    {knowledgeStore.module["map"] != undefined && <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<MenuIcon className={classes.Icon} />} {...a11yProps(1)} />}
                                    <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<AnalyticsIcon className={classes.Icon} />} {...a11yProps(2)} />
                                    <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Modules")} label={<AccountBoxIcon className={classes.Icon} />} {...a11yProps(3)} />

                                    {/* <Tab label={<Typography className={classes.tabLabel}>Модерация</Typography>} {...a11yProps(2)} /> */}
                                    {/* <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Others")} label={<Typography className={classes.tabLabel}><MoreHorizIcon /></Typography>} {...a11yProps(2)} /> */}
                                </AntTabs>}
                                <TabPanel value={value} index={0}>
                                    <Typography variant="h6" className={classes.moduleLabel}>
                                        {knowledgeStore.module.name}
                                    </Typography>
                                    <Typography variant="h6" className={classes.pageLabel}>
                                        {knowledgeStore.page.name}
                                    </Typography>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        className={classes.gridWrapperMeta}
                                    >
                                        <Typography variant="subtitle2" className={classes.moduleLabel}>
                                            {themeList[knowledgeStore.module.theme]}
                                        </Typography>
                                        <Typography variant="subtitle2" className={classes.slashLabel}>
                                            {"-"}
                                        </Typography>
                                        <Typography variant="subtitle2" className={classes.pageLabel}>
                                            {categoryList[knowledgeStore.module.category]}

                                        </Typography>
                                        <Typography variant="subtitle2" className={classes.slashLabel}>
                                            {"-"}
                                        </Typography>
                                        <Typography variant="subtitle2" className={classes.pageLabel}>
                                            {difficultyList[knowledgeStore.module.difficulty]}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        className={classes.gridWrapperMeta}
                                    >
                                        <Typography variant="subtitle2" className={classes.descriptionLabel}>
                                            {knowledgeStore.module.description != undefined ? knowledgeStore.module.description : "Автор не оставил описания"}
                                        </Typography>

                                    </Grid>
                                </TabPanel>
                                {knowledgeStore.module["map"] != undefined && <TabPanel value={value} index={1}>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        className={classes.gridWrapperMeta}
                                    >
                                        <Typography variant="subtitle2" className={classes.moduleLabel}>
                                            Навигация по страницам
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    //className={classes.gridWrapperMeta}
                                    >
                                        {knowledgeStore.module["map"].slice(0 + (paginationCounter - 1) * 10, 10 + (paginationCounter - 1) * 10).map((name, index) => (
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                key={index.toString()}
                                            >
                                                <ArrowRightIcon />
                                                <Link
                                                    className={classes.Link}
                                                    onClick={() => {
                                                        router.push({
                                                            pathname: '/knowledge/module/[moduleId]/[pageId]',
                                                            query: { moduleId: knowledgeStore.module.id, pageId: index + (paginationCounter - 1) * 10 },
                                                        })
                                                    }}
                                                    color="inherit"
                                                    underline="hover"
                                                >
                                                    {name}
                                                </Link>
                                                {/* <Typography>
                                                    {item.name}
                                                </Typography> */}
                                            </Grid>))}
                                        <Pagination
                                            sx={{
                                                "& .MuiPaginationItem-root": {
                                                    color: theme => theme.palette.primary.contrastText,
                                                }
                                            }}
                                            className={classes.Pagination}
                                            count={Math.ceil(knowledgeStore.module["map"].length / 10)}
                                            color="primary"
                                            onChange={handleChangePagination}
                                        />
                                    </Grid>
                                </TabPanel>}
                                <TabPanel value={value} index={2}>
                                    Item Three
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    Item Three
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid sx={{ zIndex: 1 }}>
                {children}
            </Grid>
        </Grid >
    )
}));


export default ModuleInfo;