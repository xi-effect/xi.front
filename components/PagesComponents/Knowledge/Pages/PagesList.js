/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import cx from 'clsx';
import clsx from 'clsx';
import { Divider, CardContent, MenuItem, Popper, MenuList, Avatar, Paper, Accordion, IconButton, Chip, AccordionSummary, AccordionDetails, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { inject, observer } from 'mobx-react'

const PREFIX = 'PagesList';

const classes = {
    container: `${PREFIX}-container`,
    gridCard: `${PREFIX}-gridCard`,
    Card: `${PREFIX}-Card`,
    CardTheory: `${PREFIX}-CardTheory`,
    CardPractice: `${PREFIX}-CardPractice`,
    CardTest: `${PREFIX}-CardTest`,
    CardButtonTheory: `${PREFIX}-CardButtonTheory`,
    CardButtonPractice: `${PREFIX}-CardButtonPractice`,
    CardButtonTest: `${PREFIX}-CardButtonTest`,
    cardColumn: `${PREFIX}-cardColumn`,
    CardContent: `${PREFIX}-CardContent`,
    CardActionsCenterButton: `${PREFIX}-CardActionsCenterButton`,
    Chip: `${PREFIX}-Chip`,
    CardActions: `${PREFIX}-CardActions`,
    Avatar: `${PREFIX}-Avatar`,
    overline: `${PREFIX}-overline`,
    name: `${PREFIX}-name`,
    gridcreater: `${PREFIX}-gridcreater`,
    userownerinfo: `${PREFIX}-userownerinfo`,
    Divider: `${PREFIX}-Divider`,
    popper: `${PREFIX}-popper`,
    pageName: `${PREFIX}-pageName`,
    pageDescription: `${PREFIX}-pageDescription`,
    icon: `${PREFIX}-icon`,
    "&.MuiSpeedDial-fab": `${PREFIX}-undefined`,
    speedDial: `${PREFIX}-speedDial`,
    speedDialActionFirst: `${PREFIX}-speedDialActionFirst`,
    speedDialAction: `${PREFIX}-speedDialAction`,
    disableIcon: `${PREFIX}-disableIcon`,
    activeIcon: `${PREFIX}-activeIcon`,
    iconSpeedDial: `${PREFIX}-iconSpeedDial`,
    IconButtonSpeedDial: `${PREFIX}-IconButtonSpeedDial`,
    IconButtonMoreVert: `${PREFIX}-IconButtonMoreVert`,
    Divider: `${PREFIX}-Divider`,
    CardHeader: `${PREFIX}-CardHeader`,
    DescriptionLabel: `${PREFIX}-DescriptionLabel`,
    DescriptionLabelInfo: `${PREFIX}-DescriptionLabelInfo`,
    AuthorLabel: `${PREFIX}-AuthorLabel`,
    AuthorName: `${PREFIX}-AuthorName`,
    ContentLabel: `${PREFIX}-ContentLabel`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({

    [`& .${classes.gridCard}`]: {
        padding: 8,
    },

    [`& .${classes.Card}`]: {

    },

    [`& .${classes.CardTheory}`]: {
        border: '4px solid',
        borderColor: "#81c784",
    },

    [`& .${classes.CardPractice}`]: {
        //background: "#2962ff",
        border: '4px solid',
        borderColor: "#64b5f6",
    },

    [`& .${classes.CardTest}`]: {
        //background: "#6200ea",
        border: '4px solid',
        borderColor: "#9575cd",
    },

    [`& .${classes.CardButtonTheory}`]: {
        backgroundColor: "#81c784",
        '&:hover': {
            backgroundColor: "#81c784",
        }
    },

    [`& .${classes.CardButtonPractice}`]: {
        backgroundColor: "#64b5f6",
        '&:hover': {
            backgroundColor: "#64b5f6",
        }
    },

    [`& .${classes.CardButtonTest}`]: {
        backgroundColor: "#9575cd",
        '&:hover': {
            backgroundColor: "#9575cd",
        }
    },

    [`& .${classes.cardColumn}`]: {
        maxWidth: 700,
    },

    [`& .${classes.CardContent}`]: {
        marginTop: 0,
        height: 196,
    },

    [`& .${classes.CardActionsCenterButton}`]: {
        marginTop: "5px",
        height: "40px",
        marginBottom: "5px",
    },

    [`& .${classes.Chip}`]: {
        //border: '2px solid',
        marginRight: 4,
        marginTop: 4,
    },

    [`& .${classes.CardActions}`]: {
        marginTop: "auto",
        marginBottom: 0,
    },

    [`& .${classes.Avatar}`]: {
        borderRadius: 16,
        fontSize: 48,
        width: 128,
        height: 128,
        backgroundColor: theme => theme.palette.blueGrey["7"],
    },

    [`& .${classes.overline}`]: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.name}`]: {
        fontSize: 16,
        fontWeight: 500,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.gridcreater}`]: {
        paddingLeft: theme => theme.spacing(1.5),
    },

    [`& .${classes.userownerinfo}`]: {
        paddingTop: theme => theme.spacing(1.5),
        width: 'auto',
        marginRight: 'auto',
    },

    [`& .${classes.Divider}`]: {
        marginTop: 4,
        marginBottom: 4,
        height: 1,
        width: "100%",
        backgroundColor: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.popper}`]: {
        zIndex: 1000,
        //position: 'fixed',
    },

    [`& .${classes.pageName}`]: {
        cursor: "default",
        marginTop: 16,
        marginLeft: 16,
        marginRight: 52,
        fontSize: 24,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.pageDescription}`]: {
        cursor: "default",
        marginTop: 12,
        marginLeft: 0,
        fontSize: 16,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.icon}`]: {
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.undefined}`]: {
        // height: 24,
        // width: 24,
        // color: "#fff"
        color: "#fff !important",
    },

    [`& .${classes.speedDial}`]: {
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

    [`& .${classes.speedDialActionFirst}`]: {
        marginTop: -4,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.speedDialAction}`]: {
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
        // height: 24,
        // width: 24,
    },

    [`& .${classes.IconButtonSpeedDial}`]: {
        // height: 48,
        // width: 48,
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.IconButtonMoreVert}`]: {
        position: 'absolute',
        top: 12,
        right: 12,
        // marginTop: 12,
        // marginRight: 12,
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.Divider}`]: {
        height: 1,
        backgroundColor: props => props.palette.primary.contrastText,
    },

    [`& .${classes.CardHeader}`]: {
        marginBottom: 4,
    },

    [`& .${classes.DescriptionLabel}`]: {
        fontWeight: "bold",
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.DescriptionLabelInfo}`]: {
        marginTop: 8,
        fontWeight: "bold",
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.AuthorLabel}`]: {
        marginLeft: 8,
        fontWeight: "bold",
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.AuthorName}`]: {
        marginLeft: 8,
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.ContentLabel}`]: {
        color: props => props.palette.primary.contrastText,
    }
}));


const Views = React.memo(({ views }) => {
    const theme = useTheme()

    if (views < 1000) {
        return (
            <>
                <VisibilityIcon />
                <Typography sx={{ color: "white" }}> {`${views}`} </Typography>
            </>
        )
    }
    if (views >= 1000 && views < 1000000) {
        return (
            <>
                <VisibilityIcon />
                <Typography sx={{ color: "white" }}> {`${Math.round(views / 1000)}к`} </Typography>
            </>
        )
    }
    if (views > 1000000) {
        return (
            <>
                <VisibilityIcon />
                <Typography sx={{ color: "white" }}> {`${Math.round(views / 1000000)} млн`} </Typography>
            </>
        )
    }
})


const PagesList = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();

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
        <StyledGrid
            container
            direction={knowledgeUI.gridTypeOnPage === "grid" ? "row" : "column"}
            justifyContent="center"
            alignItems="center"
            sx={{
                marginBottom: 2,
                marginTop: 2,
                paddingTop: 0,
                height: '100%',
                width: '100%',
            }}
        >
            {
                knowledgeStore.pageList.pages.map((page, index) => (
                    <Grid
                        xs={12} sm={12} md={knowledgeUI.gridTypeOnPageSizes[0]} lg={knowledgeUI.gridTypeOnPageSizes[1]} xl={knowledgeUI.gridTypeOnPageSizes[2]}
                        item
                        sx={{ p: 1 }}
                        container
                        justifyContent="center"
                        alignItems="center"
                        key={index.toString()}>
                        <Card elevation={24} sx={{
                            //position: 'relative',
                            borderRadius: 4,
                            transition: '0.3s',
                            width: '100%',
                            minWidth: "500px",
                            height: '100%',
                            backgroundColor: 'background.1',
                        }}>
                            <IconButton
                                className={classes.IconButtonMoreVert}
                                variant="contained"
                                color="primary"
                                onClick={(event) => setOpenMenu(event.currentTarget)}
                                size="large">
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
                                            <Tooltip arrow title={`Название: ${page.name}`}>
                                                <Typography className={classes.pageName} noWrap>{page.name}</Typography>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>

                                </Grid>
                            </Grid>
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
        </StyledGrid>
    );
}));



export default PagesList;