import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from "next/link";
import clsx from 'clsx';
import { ToggleButton, Accordion, Drawer, AccordionDetails, AccordionSummary, ToggleButtonGroup, SpeedDial, SpeedDialIcon, SpeedDialAction, Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';


import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { inject, observer } from 'mobx-react'


// import DnDList from './../../../../../OtherComponents/DnDList/DnDList';
// import ComponentsList from './Components/ComponentsList';
import TuneIcon from '@mui/icons-material/Tune';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TitleIcon from '@mui/icons-material/Title';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import ImageIcon from '@mui/icons-material/Image';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import BookIcon from '@mui/icons-material/Book';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const PREFIX = 'StepTwo';

const classes = {
    gridRoot: `${PREFIX}-gridRoot`,
    pagesPart: `${PREFIX}-pagesPart`,
    modulePart: `${PREFIX}-modulePart`,
    pageBlock: `${PREFIX}-pageBlock`,
    pageBlockTheory: `${PREFIX}-pageBlockTheory`,
    pageBlockPractice: `${PREFIX}-pageBlockPractice`,
    pageBlockTest: `${PREFIX}-pageBlockTest`,
    pageLabel: `${PREFIX}-pageLabel`,
    pageLabelInPoint: `${PREFIX}-pageLabelInPoint`,
    infoLabel: `${PREFIX}-infoLabel`,
    pageBlockIcons: `${PREFIX}-pageBlockIcons`,
    IconButton: `${PREFIX}-IconButton`,
    icon: `${PREFIX}-icon`,
    speedDial: `${PREFIX}-speedDial`,
    speedDialActionFirst: `${PREFIX}-speedDialActionFirst`,
    speedDialAction: `${PREFIX}-speedDialAction`,
    gridTextWrapper: `${PREFIX}-gridTextWrapper`,
    text: `${PREFIX}-text`,
    Accordion: `${PREFIX}-Accordion`,
    AccordionDetails: `${PREFIX}-AccordionDetails`,
    gridAddButtonWrapper: `${PREFIX}-gridAddButtonWrapper`
};

const StyledDragDropContext = styled(DragDropContext)((
    {
        theme
    }
) => ({
    [`& .${classes.gridRoot}`]: {
        //margin: "8px",
        width: "100%",
        height: "calc(100vh - 64px)",
    },

    [`& .${classes.pagesPart}`]: {
        //position: 'fixed',
        height: "calc(100vh - 64px)",
        backgroundColor: theme => theme.palette.blueGrey["4"],
    },

    [`& .${classes.modulePart}`]: {
        display: "block",
        padding: 16,
        height: "calc(100vh - 64px)",
        overflowY: "scroll",
        overflowX: "hidden",
        //backgroundColor: theme => theme.palette.blueGrey["4"],
    },

    [`& .${classes.pageBlock}`]: {
        position: "relative",
        backgroundColor: theme => theme.palette.blueGrey["6"],
        height: 64,
        width: "calc(100% - 16px)",
        margin: 8,
        borderRadius: 8,
        //zIndex: 10000,
    },

    [`& .${classes.pageBlockTheory}`]: {
        border: '4px solid',
        borderColor: "#81c784",
    },

    [`& .${classes.pageBlockPractice}`]: {
        //background: "#2962ff",
        border: '4px solid',
        borderColor: "#64b5f6",
    },

    [`& .${classes.pageBlockTest}`]: {
        //background: "#6200ea",
        border: '4px solid',
        borderColor: "#9575cd",
    },

    [`& .${classes.pageLabel}`]: {
        cursor: "default",
        //marginTop: 16,
        marginLeft: 8,
        marginRight: 82,
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.pageLabelInPoint}`]: {
        cursor: "default",
        //marginTop: 16,
        marginLeft: 8,
        marginRight: 128,
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.infoLabel}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.pageBlockIcons}`]: {
        position: "absolute",
        top: 8,
        right: 2,
    },

    [`& .${classes.IconButton}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.icon}`]: {
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.speedDial}`]: {
        height: 36,
        width: 36,
        //marginTop: 4,
        //marginLeft: 16,
        // position: 'absolute',
        // top: theme => theme.spacing(10),
        // left: theme => theme.spacing(2),
    },

    [`& .${classes.speedDialActionFirst}`]: {
        //marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.speedDialAction}`]: {
        //marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.gridTextWrapper}`]: {
        width: "calc(100% - 58px)",
    },

    [`& .${classes.text}`]: {
        width: "100%",
        color: props => props.palette.primary.contrastText,
        // fontSize: props => props.fontSize,
        // fontStyle: props => props.fontStyle,
        // textAlign: props => props.textAlign,
        // fontWeight: props => props.fontWeight,
        // textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    },

    [`& .${classes.Accordion}`]: {
        // maxWidth: 600,
        backgroundColor: theme => theme.palette.blueGrey["5"],
    },

    [`& .${classes.AccordionDetails}`]: {
        //opacity: "1",
        //zIndex: 1,
    },

    [`& .${classes.gridAddButtonWrapper}`]: {
        padding: 16,
    }
}));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const ItemList = inject('managmentStore')(observer(({ managmentStore, index }) => {
    const theme = useTheme();

    const value = managmentStore.moduleCreation.points[index].pages
    return <>
        {value.length === 0 && <Typography sx={{ color: "#fff" }}> Перетащите страницу сюда </Typography>}
        {value.length != 0 && value.map((page, pageIndex) => (
            <Draggable
                key={pageIndex.toString()}
                draggableId={`list-${index}-${pageIndex}`}
                index={pageIndex}>
                {(provided, snapshot) => (
                    <Grid
                        className={clsx(classes.pageBlock, { [classes.pageBlockTheory]: page.kind === "theory" }, { [classes.pageBlockPractice]: page.kind === "practice" }, { [classes.pageBlockTest]: page.kind === "task" })}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs zeroMinWidth>
                                <Tooltip className={classes.Tooltip} arrow title={`Название: ${page.name}`}>
                                    <Typography className={classes.pageLabelInPoint} noWrap>{page.name}</Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid className={classes.pageBlockIcons}>
                            <Link
                                href={{
                                    pathname: '/knowledge/page/[id]',
                                    query: { id: page.id },
                                }}
                                passHref>
                                <Tooltip title="Посмотреть страницу">
                                    <IconButton className={classes.IconButton} size="large">
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <IconButton
                                onClick={() => managmentStore.deletePageInPoint(index, pageIndex)}
                                className={classes.IconButton}
                                size="large">
                                <DeleteForeverIcon />
                            </IconButton>
                            <IconButton className={classes.IconButton} size="large">
                                <DragIndicatorIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                )}
            </Draggable>
        ))}
    </>;
}))

const StepTwo = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();

    console.log(managmentStore.pageCreationList.pages, "p")

    function onDragEnd(result) {
        console.log("result", result)
        // Перетаскивание не произошо
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === 'list-pages') {
            let newArray = managmentStore.moduleCreation.points[result.destination.droppableId.slice(5)].pages
            let newPage = {}
            newPage.id = managmentStore.pageCreationList.pages[result.source.index].id
            newPage.name = managmentStore.pageCreationList.pages[result.source.index].name
            newPage.kind = managmentStore.pageCreationList.pages[result.source.index].kind
            newArray.splice(result.destination.index, 0, newPage)
            managmentStore.setModuleCreationPoints(Number(result.destination.droppableId.slice(5)), "pages", newArray)
            return;

        }


        //

        //Перетаскивание в рамках одной точки
        if (result.destination.droppableId === result.source.droppableId) {
            const quotes = reorder(
                managmentStore.moduleCreation.points[result.destination.droppableId.slice(5)].pages,
                result.source.index,
                result.destination.index
            );
            managmentStore.setModuleCreationPoints(result.destination.droppableId.slice(5), "pages", quotes)
            //console.log("pointsnotgood", result)
            return;

        }

        //Перетаскивание между точками 
        if (result.source.droppableId != 'list-pages' && result.destination.droppableId != result.source.droppableId) {
            let newArray = managmentStore.moduleCreation.points[Number(result.destination.droppableId.slice(5))].pages
            let newPage = managmentStore.moduleCreation.points[Number(result.source.droppableId.slice(5))].pages[result.source.index]
            newArray.splice(result.destination.index, 0, newPage)
            managmentStore.setModuleCreationPoints(Number(result.destination.droppableId.slice(5)), "pages", newArray)
            managmentStore.deletePageInPoint(result.source.droppableId.slice(5), result.source.index)
            console.log("points", result)
        }


        // Перетаскивание не произошо, место объекто не изменено
        if (result.destination.index === result.source.index) {
            return;
        }

    }

    const onBeforeCapture = () => {
        console.log("onBeforeCapture")
    };

    const onBeforeDragStart = () => {
        console.log("onBeforeDragStart")
        /*...*/
    };

    const onDragStart = () => {
        console.log("onDragStart")
        /*...*/
    };
    const onDragUpdate = () => {
        console.log("onDragUpdate")
        /*...*/
    };

    return (
        <DragDropContext
            onBeforeCapture={onBeforeCapture}
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <Grid
                className={classes.gridRoot}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                {/* Выбор страниц */}
                <Grid
                    item
                    xs={12} sm={12} md={5} lg={3} xl={3}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.pagesPart}
                >
                    <Droppable isDropDisabled droppableId="list-pages">
                        {(provided, snapshot) => (
                            <Grid
                                ref={provided.innerRef}
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                            >
                                {managmentStore.pageCreationList.pages.map((page, index) => (
                                    <Draggable
                                        key={page.id.toString()}
                                        draggableId={`list-pages-id-${index}`}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <Grid
                                                className={clsx(classes.pageBlock, { [classes.pageBlockTheory]: page.kind === "theory" }, { [classes.pageBlockPractice]: page.kind === "practice" }, { [classes.pageBlockTest]: page.kind === "task" })}
                                                container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Grid container wrap="nowrap" spacing={2}>
                                                    <Grid item xs zeroMinWidth>
                                                        <Tooltip className={classes.Tooltip} arrow title={`Название: ${page.name}`}>
                                                            <Typography className={classes.pageLabel} noWrap>{page.name}</Typography>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                                <Grid className={classes.pageBlockIcons}>
                                                    <Link
                                                        href={{
                                                            pathname: '/knowledge/page/[id]',
                                                            query: { id: page.id },
                                                        }}
                                                        passHref>
                                                        <Tooltip title="Посмотреть страницу">
                                                            <IconButton className={classes.IconButton} size="large">
                                                                <VisibilityIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                    <IconButton className={classes.IconButton} size="large">
                                                        <DragIndicatorIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </Grid>
                {/* Основная часть редактора */}
                <Grid
                    item
                    xs={12} sm={12} md={7} lg={9} xl={9}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.modulePart}
                >
                    {managmentStore.moduleCreation.points.map((point, index) => (
                        <Accordion
                            sx={{
                                // width: drawerWidth,
                                // flexShrink: 0,
                                [`& .MuiAccordion-root`]: { zIndex: -1, },
                            }}
                            // onMouseEnter={() => setExpanded1(true)}
                            // onMouseLeave={() => setExpanded1(false)}
                            key={index.toString()}
                            className={classes.Accordion}
                            expanded={managmentStore.moduleCreation.points[index].openAccordion} >
                            <AccordionSummary
                                expandIcon={<IconButton
                                    onClick={() => managmentStore.setModuleCreationPoints(index, "openAccordion", !managmentStore.moduleCreation.points[index].openAccordion)}
                                    size="large"><ExpandMoreIcon className={classes.icon} /></IconButton>}
                            >
                                <Grid className={classes.gridTextWrapper}>
                                    <Input
                                        classes={{
                                            input: classes.text
                                        }}
                                        type="text"
                                        disableUnderline
                                        multiline
                                        fullWidth
                                        value={managmentStore.moduleCreation.points[index].label}
                                        onChange={(event) => managmentStore.setModuleCreationPoints(index, "label", event.target.value)}
                                    />
                                </Grid>
                                <SpeedDial
                                    ariaLabel="SpeedDial tooltip example"
                                    className={classes.speedDial}
                                    // hidden={hidden}
                                    icon={<TuneIcon className={classes.iconSpeedDial} />}
                                    onClose={() => managmentStore.setModuleCreationPoints(index, "openSpeedDial", false)}
                                    onOpen={() => managmentStore.setModuleCreationPoints(index, "openSpeedDial", true)}
                                    open={managmentStore.moduleCreation.points[index].openSpeedDial}
                                    direction="left"
                                >
                                    <SpeedDialAction
                                        className={clsx(classes.speedDialAction)}
                                        tooltipPlacement="bottom"
                                        icon={<DeleteForeverIcon />}
                                        tooltipTitle={`Удалить точку`}
                                        //tooltipOpen
                                        onClick={() => managmentStore.deletePoint(index)}
                                    />
                                    <SpeedDialAction
                                        className={clsx(classes.speedDialAction)}
                                        tooltipPlacement="bottom"
                                        icon={<ArrowCircleDownIcon />}
                                        tooltipTitle={`Переместить точку ниже`}
                                        //tooltipOpen
                                        onClick={() => managmentStore.setPointDown(index)}
                                    />
                                    <SpeedDialAction
                                        className={clsx(classes.speedDialActionFirst)}
                                        tooltipPlacement="bottom"
                                        icon={<ArrowCircleUpIcon />}
                                        tooltipTitle={`Переместить точку выше`}
                                        onClick={() => managmentStore.setPointUp(index)}
                                    />

                                </SpeedDial>
                            </AccordionSummary>
                            <AccordionDetails className={classes.AccordionDetails}>
                                <Droppable droppableId={`list-${index}`}>
                                    {(provided, snapshot) => (
                                        <>
                                            <Grid
                                                ref={provided.innerRef}
                                                container
                                                direction="column"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                sx={{
                                                    minHeight: 64,
                                                }}
                                            >
                                                <ItemList index={index} />
                                                {provided.placeholder}

                                            </Grid>

                                        </>
                                    )}
                                </Droppable>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.gridAddButtonWrapper}
                    >
                        <Button variant="contained" onClick={() => managmentStore.pushNewPoint()}>
                            Добавить точку
                        </Button>
                    </Grid>
                </Grid>
            </Grid >
        </DragDropContext >
    );
}))

export default StepTwo