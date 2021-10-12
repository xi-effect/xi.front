/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import clsx from 'clsx';
import { Divider, CardContent, SpeedDial, MenuItem, SpeedDialAction, Popper, MenuList, Avatar, Paper, Accordion, IconButton, Chip, AccordionSummary, AccordionDetails, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { inject, observer } from 'mobx-react'

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        //backgroundColor: theme => theme.palette.common.white,
        //color: 'rgba(0, 0, 0, 0.87)',
        //boxShadow: theme => theme.shadows[1],
        fontSize: 14,
    },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 16,
        marginTop: 2,
        paddingTop: 0,
        height: '100%',
        width: '100%',
    },
    gridCard: {
        padding: 8,
    },
    Card: {
        position: 'relative',
        //paddingLeft: 4,
        //maxWidth: 400,
        //border: '2px solid',
        //borderColor: theme => theme.palette.primary.dark,
        borderRadius: 42,
        //transition: '0.4s',
        // '&:hover': {
        //     borderColor: theme => theme.palette.primary.light,
        // },
        // marginTop: theme => theme.spacing(8),

        transition: '0.3s',
        width: '100%',
        height: '100%',
        //overflow: 'initial',
        background: theme => theme.palette.blueGrey["3"],
    },
    CardTheory: {
        border: '4px solid',
        borderColor: "#81c784",
    },
    CardPractice: {
        //background: "#2962ff",
        border: '4px solid',
        borderColor: "#64b5f6",
    },
    CardTest: {
        //background: "#6200ea",
        border: '4px solid',
        borderColor: "#9575cd",
    },
    CardButtonTheory: {
        backgroundColor: "#81c784",
        '&:hover': {
            backgroundColor: "#81c784",
        }
    },
    CardButtonPractice: {
        backgroundColor: "#64b5f6",
        '&:hover': {
            backgroundColor: "#64b5f6",
        }
    },
    CardButtonTest: {
        backgroundColor: "#9575cd",
        '&:hover': {
            backgroundColor: "#9575cd",
        }
    },
    cardColumn: {
        maxWidth: 700,
    },
    CardContent: {
        marginTop: 0,
        height: 196,
    },
    CardActionsCenterButton: {
        marginTop: "5px",
        height: "40px",
        marginBottom: "5px",
    },
    Chip: {
        //border: '2px solid',
        marginRight: 4,
        marginTop: 4,
    },
    CardActions: {
        marginTop: "auto",
        marginBottom: 0,
    },
    Avatar: {
        borderRadius: 16,
        fontSize: 48,
        width: 128,
        height: 128,
        backgroundColor: theme => theme.palette.blueGrey["7"],
    },
    overline: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: theme => theme.palette.primary.contrastText,
    },
    name: {
        fontSize: 16,
        fontWeight: 500,
        color: theme => theme.palette.primary.contrastText,
    },
    gridcreater: {
        paddingLeft: theme => theme.spacing(1.5),
    },
    userownerinfo: {
        paddingTop: theme => theme.spacing(1.5),
        width: 'auto',
        marginRight: 'auto',
    },
    Divider: {
        marginTop: 4,
        marginBottom: 4,
        height: 1,
        width: "100%",
        backgroundColor: theme => theme.palette.primary.contrastText,
    },
    popper: {
        zIndex: 1000,
        //position: 'fixed',
    },
    pageName: {
        cursor: "default",
        marginTop: 16,
        marginLeft: 16,
        marginRight: 52,
        fontSize: 24,
        color: theme => theme.palette.primary.contrastText,
    },
    pageDescription: {
        cursor: "default",
        marginTop: 12,
        marginLeft: 0,
        fontSize: 16,
        color: theme => theme.palette.primary.contrastText,
    },
    icon: {
        color: props => props.palette.primary.contrastText,
    },
    "&.MuiSpeedDial-fab": {
        // height: 24,
        // width: 24,
        // color: "#fff"
        color: "#fff !important",
    },
    speedDial: {
        //marginTop: 4,
        //marginLeft: 16,
        // height: "24px !important",
        // width: "24px !important",
        // borderRadius: "12px",
        // height: 36,
        // width: 36,
        // marginTop: 4,
        // marginLeft: 16,
        // margin: 0,
        position: 'absolute',
        top: 6,
        right: 6,
    },
    speedDialActionFirst: {
        marginTop: -4,
        color: props => props.palette.primary.main,
    },

    speedDialAction: {
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
        // height: 24,
        // width: 24,
    },
    IconButtonSpeedDial: {
        // height: 48,
        // width: 48,
        color: props => props.palette.primary.contrastText,
    },
    IconButtonMoreVert: {
        position: 'absolute',
        top: 12,
        right: 12,
        // marginTop: 12,
        // marginRight: 12,
        color: props => props.palette.primary.contrastText,
    },
    Divider: {
        height: 1,
        backgroundColor: props => props.palette.primary.contrastText,
    },
    CardHeader: {
        marginBottom: 4,
    },
    DescriptionLabel: {
        fontWeight: "bold",
        color: props => props.palette.primary.contrastText,
    },
    DescriptionLabelInfo: {
        marginTop: 8,
        fontWeight: "bold",
        color: props => props.palette.primary.contrastText,
    },
    AuthorLabel: {
        marginLeft: 8,
        fontWeight: "bold",
        color: props => props.palette.primary.contrastText,
    },
    AuthorName: {
        marginLeft: 8,
        color: props => props.palette.primary.contrastText,
    },
    ContentLabel: {
        color: props => props.palette.primary.contrastText,
    }
}));

const useStylesViews = makeStyles((theme) => ({
    icon: {
        marginLeft: 12,
        marginRight: 8,
        color: theme => theme.palette.primary.contrastText,
    }
}));

const Views = React.memo(({ views }) => {
    const theme = useTheme()
    const classes = useStylesViews(theme);
    if (views < 1000) {
        return (
            <>
                <VisibilityIcon className={classes.icon} />
                <Typography sx={{ color: "white" }}> {`${views}`} </Typography>
            </>
        )
    }
    if (views >= 1000 && views < 1000000) {
        return (
            <>
                <VisibilityIcon className={classes.icon} />
                <Typography sx={{ color: "white" }}> {`${Math.round(views / 1000)}к`} </Typography>
            </>
        )
    }
    if (views > 1000000) {
        return (
            <>
                <VisibilityIcon className={classes.icon} />
                <Typography sx={{ color: "white" }}> {`${Math.round(views / 1000000)} млн`} </Typography>
            </>
        )
    }
})


const PagesList = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    const knowledgeUI = uiStore.knowledgeUI
    const [openMenu, setOpenMenu] = React.useState(false)

    const kindSelect = (value) => {
        if (value === "theory") return "Теория"
        if (value === "practice") return "Практика"
        if (value === "task") return "Проверочная работа"
    }

    const buttonLabelSelect = (value) => {
        if (value === "theory") return "теории"
        if (value === "practice") return "практике"
        if (value === "task") return "проверочной"
    }

    return (
        <Grid
            container
            direction={knowledgeUI.gridTypeOnPage === "grid" ? "row" : "column"}
            justifyContent="center"
            alignItems="center"
            className={classes.container}
        >
            {
                knowledgeStore.pageList.pages.map((page, index) => (
                    <Grid
                        xs={12} sm={12} md={knowledgeUI.gridTypeOnPageSizes[0]} lg={knowledgeUI.gridTypeOnPageSizes[1]} xl={knowledgeUI.gridTypeOnPageSizes[2]}
                        item
                        className={clsx(classes.gridCard,)}
                        container
                        justifyContent="center"
                        alignItems="center"
                        key={index}>
                        <Card elevation={24} className={clsx(classes.Card, { [classes.cardColumn]: knowledgeUI.gridTypeOnPage != "grid" }, { [classes.CardTheory]: page.kind === "theory" }, { [classes.CardPractice]: page.kind === "practice" }, { [classes.CardTest]: page.kind === "task" })}>
                            {/* <SpeedDial
                                //sx={{ height: 20, width: 20 }}
                                ariaLabel="SpeedDial tooltip example"
                                className={classes.speedDial}
                                //hidden={hidden}
                                // icon={<IconButton className={classes.IconButtonSpeedDial}>
                                //     <MoreVertIcon className={classes.iconSpeedDial} />
                                // </IconButton>}
                                icon={<MoreVertIcon className={classes.iconSpeedDial} />}
                                onClose={() => setOpen(false)}
                                onOpen={() => setOpen(true)}
                                open={open}
                                direction="down"
                            >
                                <SpeedDialAction
                                    className={clsx(classes.speedDialActionFirst)}
                                    tooltipPlacement="left"
                                    icon={<MoreVertIcon />}
                                    tooltipTitle={`Тип`}
                                    //tooltipOpen
                                    onClick={() => setOpen(false)}
                                />
                            </SpeedDial> */}
                            <IconButton className={classes.IconButtonMoreVert} variant="contained" color="primary" onClick={(event) => setOpenMenu(event.currentTarget)}>
                                <MoreVertIcon className={classes.icons} />
                            </IconButton>
                            <Popper className={classes.popper} id={undefined} open={Boolean(openMenu)} onClose={() => setOpenMenu(false)} anchorEl={openMenu}>
                                <Paper className={classes.popper}>
                                    <MenuList
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                    >
                                        <MenuItem onClick={() => setOpenMenu(false)}>Скрыть курс</MenuItem>
                                        <MenuItem onClick={() => setOpenMenu(false)}>Пожаловаться</MenuItem>
                                        <MenuItem onClick={() => setOpenMenu(false)}>Logout</MenuItem>
                                    </MenuList>
                                </Paper>
                            </Popper>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                className={classes.CardHeader}
                            >
                                {/* wrap="nowrap" spacing={2} */}
                                <Grid item container>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <CustomTooltip arrow title={`Название: ${page.name}`}>
                                                <Typography className={classes.pageName} noWrap>{page.name}</Typography>
                                            </CustomTooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>

                                </Grid>
                            </Grid>

                            {/* <Grid sx={{ maxWidth: 640, my: 1, mx: 'auto' }}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs>
                                        <Typography className={classes.pageName} noWrap>{page.name}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            <Divider variant="middle" className={classes.Divider} />
                            <CardContent className={classes.CardContent}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                >
                                    {knowledgeUI.contentTypeOnPage === "info" && <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Typography className={classes.DescriptionLabel}> Тематика Страницы </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.ContentLabel}> {page.theme} </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.DescriptionLabelInfo}> Тип Страницы </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.ContentLabel}> {kindSelect(page.kind)}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.DescriptionLabelInfo}> Просмотры </Typography>
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                        >
                                            <Views views={page.views} />
                                        </Grid>
                                    </Grid>}
                                    {knowledgeUI.contentTypeOnPage === "description" && <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Typography className={classes.DescriptionLabel}> Описание </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.ContentLabel}> {page.description != null ? page.description : "Автор не оставил описание страницы"} </Typography>
                                        </Grid>
                                    </Grid>}
                                    {knowledgeUI.contentTypeOnPage === "author" && <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Avatar className={classes.Avatar}> {page["author-name"][0].toUpperCase()} </Avatar>
                                            <Typography className={classes.AuthorLabel}> Автор </Typography>
                                            <Typography className={classes.AuthorName}>{page["author-name"]}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.AuthorLabel}>Об Авторе </Typography>
                                            <Typography className={classes.AuthorName}>Информация об авторе</Typography>
                                        </Grid>
                                    </Grid>}

                                    {/* <Chip className={classes.Chip} label={page.theme} size="small" color="primary" /> */}
                                    {/* <Chip className={classes.Chip} label={kindSelect(page.kind)} size="small" color="primary" /> */}
                                    {/* <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                    >
                                        <Views views={page.views} />
                                    </Grid> */}
                                    {/* <Divider className={classes.Divider} /> */}
                                    {/* <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <CustomTooltip className={classes.Tooltip} arrow title={`Описание`}>
                                                <Typography className={classes.pageDescription} noWrap>{page.description != null ? page.description : "Автор не оставил описание страницы"}</Typography>
                                            </CustomTooltip>
                                        </Grid>
                                    </Grid> */}
                                    {/* <Divider className={classes.Divider}/> */}
                                    {/* <Grid container item direction="row" justifyContent="flex-end" xs={12} className={classes.CardContentGrid}>
                                        <Grid container direction='row' className={classes.userownerinfo}> */}
                                    {/* {course.createrAvatar} */}
                                    {/* <Grid><Avatar className={classes.avatar}> {page["author_name"][0].toUpperCase()} </Avatar></Grid>
                                            <Grid className={classes.gridcreater}>
                                                <Typography className={classes.overline}>Создатель</Typography>
                                                <Typography className={classes.name}>{page["author_name"]}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid className={classes.CardContentSmallActionButtom}>

                                        </Grid>
                                    </Grid> */}
                                </Grid>
                            </CardContent>
                            <Divider variant="middle" className={classes.Divider} />
                            <CardActions className={classes.CardActions}>
                                <Grid spacing={1} container justifyContent="center" >
                                    <Grid>
                                        <Link
                                            href={{
                                                pathname: '/knowledge/page/[id]',
                                                query: { id: page.id },
                                            }}
                                            passHref>
                                            <Button variant="contained" className={clsx(classes.CardActionsCenterButton, { [classes.CardButtonTheory]: page.kind === "theory" }, { [classes.CardButtonPractice]: page.kind === "practice" }, { [classes.CardButtonTest]: page.kind === "task" })}>
                                                <Typography variant="subtitle1">{`Перейти к ${buttonLabelSelect(page.kind)}`}</Typography>
                                                {/* <Typography variant="subtitle1">Продолжить модуль</Typography>} */}
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))

            }
        </Grid>
    )
}));



export default PagesList;