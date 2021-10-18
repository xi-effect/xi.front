import React from 'react';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import cx from 'clsx';
import { Divider, CardContent, CardMedia, Grow, ClickAwayListener, SpeedDial, MenuItem, SpeedDialAction, Popper, MenuList, Avatar, Paper, Accordion, IconButton, Chip, AccordionSummary, AccordionDetails, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { inject, observer } from 'mobx-react'

const PREFIX = 'ModulesList';

const classes = {
    container: `${PREFIX}-container`,
    gridCard: `${PREFIX}-gridCard`,
    card: `${PREFIX}-card`,
    content: `${PREFIX}-content`,
    boxCardHeader: `${PREFIX}-boxCardHeader`,
    cardHeader: `${PREFIX}-cardHeader`,
    avatar: `${PREFIX}-avatar`,
    overline: `${PREFIX}-overline`,
    name: `${PREFIX}-name`,
    gridcreater: `${PREFIX}-gridcreater`,
    userownerinfo: `${PREFIX}-userownerinfo`,
    CardActionsCenterButton: `${PREFIX}-CardActionsCenterButton`,
    CardContentGrid: `${PREFIX}-CardContentGrid`,
    CardContentSmallActionButtom: `${PREFIX}-CardContentSmallActionButtom`,
    icons: `${PREFIX}-icons`,
    iconsStarPush: `${PREFIX}-iconsStarPush`,
    iconsPinPush: `${PREFIX}-iconsPinPush`,
    media: `${PREFIX}-media`,
    title: `${PREFIX}-title`,
    subtitle: `${PREFIX}-subtitle`,
    Page: `${PREFIX}-Page`,
    popper: `${PREFIX}-popper`,
    MenuList: `${PREFIX}-MenuList`,
    MenuItem: `${PREFIX}-MenuItem`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        marginTop: 16,
        marginBottom: 16,
        height: '100%',
        width: '100%',
    },

    [`& .${classes.gridCard}`]: {
        padding: 8,
    },

    [`& .${classes.card}`]: {
        position: 'relative',
        //paddingLeft: 4,
        border: '2px solid',
        borderColor: theme.palette.primary.dark,
        borderRadius: 32,
        transition: '0.4s',
        '&:hover': {
            borderColor: theme.palette.primary.light,
        },
        // marginTop: theme.spacing(8),

        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: theme.palette.blueGrey["3"],
    },

    [`& .${classes.content}`]: {
        paddingTop: 6,
        textAlign: 'left',
        overflowX: 'auto',
        '& table': {
            marginBottom: 0,
        }
    },

    [`& .${classes.boxCardHeader}`]: {
        paddingTop: -8,
    },

    [`& .${classes.cardHeader}`]: {
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.avatar}`]: {
        borderRadius: 8,
        backgroundColor: theme.palette.blueGrey["7"],
    },

    [`& .${classes.overline}`]: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.name}`]: {
        fontSize: 16,
        fontWeight: 500,
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.gridcreater}`]: {
        paddingLeft: theme.spacing(1.5),
    },

    [`& .${classes.userownerinfo}`]: {
        paddingTop: theme.spacing(1.5),
        width: 'auto',
        marginRight: 'auto',
    },

    [`& .${classes.CardActionsCenterButton}`]: {
        marginTop: "5px",
        height: "40px",
        marginBottom: "5px",
    },

    [`& .${classes.CardContentGrid}`]: {
        width: "100%"
    },

    [`& .${classes.CardContentSmallActionButtom}`]: {
        marginTop: "8px",
    },

    [`& .${classes.icons}`]: {
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.iconsStarPush}`]: {
        color: "#ffeb3b",
    },

    [`& .${classes.iconsPinPush}`]: {
        color: "#8bc34a",
    },

    [`& .${classes.media}`]: {
        height: 320,
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        marinLeft: 0,
        marginRight: 0,
    },

    [`& .${classes.title}`]: {
        marginTop: 12,
        marginLeft: 12,
        fontSize: 28,
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.subtitle}`]: {
        marginTop: 0,
        marginLeft: 12,
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.Page}`]: {
        height: 320,
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        marinLeft: 0,
        marginRight: 0,
    },

    [`& .${classes.popper}`]: {
        zIndex: 1000,
    },

    [`& .${classes.MenuList}`]: {
        backgroundColor: theme.palette.blueGrey["5"],
        border: '2px solid',
        borderColor: theme.palette.primary.dark,
        borderRadius: 4,
    },

    [`& .${classes.MenuItem}`]: {
        color: theme.palette.primary.contrastText,
    }
}));

const coursesThemeList = {
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
    "philosophy": "Философия",
    "literature": "Литература",
    "arts": "Искусства",
    "informatics": "Информатика",
}

const coursesImgList = {
    "Робототехника": "/knowledge/robotechnik.jpg",
    "Безопасность в интернете": "/knowledge/secureInInternet.jpg",
    "Математика ЕГЭ": "/knowledge/mathEGE.jpg",
    "English ABCs": "/knowledge/EnglishABC.jpg",
    "Веб Дизайн": "/knowledge/webdesign.jpg",
    "Классическая Музыка": "/knowledge/musicClassic.jpg",
    "География": "/knowledge/geography.jpg",
    "Геодезия": "/knowledge/geodesia.jpg",
    "Океанология": "/knowledge/oceanology.jpg",
    "Социология": "/knowledge/sociology.jpg",
    "Информатика 7 класс": "/knowledge/informatica.jpg",
    "Литература Европы XX века": "/knowledge/literatureXX.jpg",
    "Python": "/knowledge/python.jpg",
    "Ораторское искусство": "/knowledge/publicSpeaking.jpg",
    "История ЕГЭ": "/knowledge/historyEGE.jpg",
    "Немецкий язык": "/knowledge/deutsch.jpg",
    "Классическая философия": "/knowledge/classicPhilosophy.jpg",
    "Литература": "/knowledge/literature.jpg",
    "История России": "/knowledge/historyRussia.jpg",
    "Арифметика": "/knowledge/arifmetic.jpg",
    "Архитектура XIX века": "/knowledge/architecture.jpg",
    "Матан": "/knowledge/math.jpg",
    "Физика: термодинамика": "/knowledge/phi.jpeg",
}

const ModulesList = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();


    const options = [
        'Скрыть курс',
        'Пожаловаться',
        'Добавить в Избранное',
        'Закрепить',
    ];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <StyledGrid container className={classes.container}>
            {knowledgeStore.moduleList.modules.map((module, index) => (
                <Grid xs={12} sm={12} md={6} lg={4} xl={3} item className={classes.gridCard} container key={index.toString()}>
                    <Card elevation={24} className={cx(classes.card)}>
                        <Box className={classes.boxCardHeader}>
                            {/* <CardHeader
                                className={classes.cardHeader}
                                title={<Typography className={classes.title}>{module.name}</Typography>}
                                subheader={<Typography className={classes.subtitle}>{coursesThemeList[module.theme]}</Typography>}
                            /> */}
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <Typography className={classes.title} noWrap>{module.name}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <Typography className={classes.subtitle} noWrap>{coursesThemeList[module.theme]}</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <div className={classes.Page}>
                            <CardMedia
                                src="img"
                                className={classes.media}
                                image={coursesImgList[module.name] != undefined ? coursesImgList[module.name] : "/illustrations/astronaut.png"}
                            />
                        </div>

                        <CardContent className={classes.content}>
                            <Grid container item direction="row" justifyContent="flex-end" xs={12} className={classes.CardContentGrid}>
                                <Grid container direction='row' className={classes.userownerinfo}>
                                    {/* {course.createrAvatar} */}
                                    <Grid><Avatar className={classes.avatar}> Ξ </Avatar></Grid>
                                    <Grid className={classes.gridcreater}>
                                        <Typography className={classes.overline}>Создатель</Typography>
                                        <Typography className={classes.name}>Ξ Effect</Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.CardContentSmallActionButtom}>
                                    <IconButton
                                        onClick={() => knowledgeStore.setPreferenceInModules(index, "starred", module.id, module.starred ? "unstar" : "star", !module.starred)}
                                        color="primary"
                                        aria-label="add an alarm"
                                        size="large">
                                        {!module.starred && <StarBorderIcon className={classes.icons} />}
                                        {module.starred && <StarIcon className={classes.iconsStarPush} />}
                                    </IconButton>
                                </Grid>
                                <Grid className={classes.CardContentSmallActionButtom}>
                                    <IconButton
                                        onClick={() => knowledgeStore.setPreferenceInModules(index, "pinned", module.id, module.pinned ? "unpin" : "pin", !module.pinned)}
                                        color="primary"
                                        aria-label="add an alarm"
                                        size="large">
                                        {!module.pinned && <FlagOutlinedIcon className={classes.icons} />}
                                        {module.pinned && <FlagIcon className={classes.iconsPinPush} />}
                                    </IconButton>
                                </Grid>
                                <Grid className={classes.CardContentSmallActionButtom}>
                                    <IconButton
                                        onClick={(event) => {
                                            knowledgeStore.setModuleListDataInModules(index, "openMenu", module.openMenu === undefined ? true : !module.openMenu)
                                            knowledgeStore.setModuleListDataInModules(index, "openMenuTarget", event.currentTarget)
                                        }}
                                        variant="contained"
                                        color="primary"
                                        size="large">
                                        <MoreVertIcon className={classes.icons} />
                                    </IconButton>
                                    <Popper className={classes.popper} id={index} open={module.openMenu === undefined ? false : module.openMenu} anchorEl={module?.openMenuTarget}>
                                        <Paper elevation={24} className={classes.popper}>
                                            <MenuList
                                                className={classes.MenuList}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                            >
                                                <MenuItem className={classes.MenuItem} onClick={() => {
                                                    knowledgeStore.setPreferenceInModules(index, "hide", module.id, "hide", false)
                                                }}>Скрыть курс</MenuItem>
                                                {/* <MenuItem className={classes.MenuItem} onClick={null}>Пожаловаться</MenuItem> */}
                                            </MenuList>
                                        </Paper>
                                    </Popper>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <CardActions>
                            <Grid spacing={1} container justifyContent="center" className={classes.CardActions}>
                                <Grid>
                                    <Link
                                        href={{
                                            pathname: '/knowledge/module/[moduleId]/start',
                                            query: { moduleId: module.id },
                                        }}
                                        passHref>
                                        <Button variant="contained" color="primary" className={classes.CardActionsCenterButton}>
                                            {!module.started && <Typography variant="subtitle1">Приступить к модулю</Typography>}
                                            {module.started && <Typography variant="subtitle1">Продолжить модуль</Typography>}
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </CardActions>
                    </Card>
                </Grid>
            ))
            }
        </StyledGrid>
    );
}));



export default ModulesList;