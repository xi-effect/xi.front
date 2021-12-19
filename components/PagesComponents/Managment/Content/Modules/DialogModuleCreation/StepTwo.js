import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import clsx from 'clsx';
import { ToggleButton, Accordion, Drawer, AccordionDetails, AccordionSummary, Stack, ToggleButtonGroup, SpeedDial, SpeedDialIcon, SpeedDialAction, Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';


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
                        sx={{
                            zIndex: 100,
                            position: "relative",
                            backgroundColor: 'background.1',
                            height: 64,
                            width: "calc(100% - 16px)",
                            margin: 1,
                            borderRadius: 1,
                        }}
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
                                <Tooltip arrow title={`Название: ${page.name}`}>
                                    <Typography sx={{
                                        cursor: "default",
                                        //marginTop: 16,
                                        marginLeft: 1,
                                        marginRight: "128px",
                                        fontSize: "20px",
                                        color: 'text.main',
                                    }} noWrap>{page.name}</Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid sx={{
                            position: "absolute",
                            top: 8,
                            right: "2px",
                        }}>
                            <Link
                                href={{
                                    pathname: '/knowledge/page/[id]',
                                    query: { id: page.id },
                                }}
                                passHref>
                                <Tooltip title="Посмотреть страницу">
                                    <IconButton size="large">
                                        <VisibilityIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <IconButton
                                onClick={() => managmentStore.deletePageInPoint(index, pageIndex)}
                                size="large">
                                <DeleteForeverIcon />
                            </IconButton>
                            <IconButton size="large">
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

    console.log("pagesStepTwo", managmentStore.pageCreationList.pages)

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
                width: "100%",
                height: "calc(100vh - 64px)",
                p: 4,
            }}
        >
            {/* Выбор страниц */}
            {/* Основная часть редактора */}
            {managmentStore.moduleCreation.points.map((point, index) => (
                <Accordion
                    sx={{
                        '&.MuiPaper-root': { zIndex: 0, width: "100%", minWidth: 400 },
                        bgcolor: 'primary.dark',

                    }}
                    key={index.toString()}
                    expanded={managmentStore.moduleCreation.points[index].openAccordion} >
                    <AccordionSummary
                        expandIcon={<IconButton
                            onClick={() => managmentStore.setModuleCreationPoints(index, "openAccordion", !managmentStore.moduleCreation.points[index].openAccordion)}
                            size="large"><ExpandMoreIcon /></IconButton>}
                    >
                        <Grid sx={{ width: "calc(100% - 58px)", }}>
                            <Input
                                sx={{
                                    width: "100%",
                                    color: 'text.main',
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
                            sx={{
                                height: 36,
                                width: 36,
                            }}
                            icon={<TuneIcon />}
                            onClose={() => managmentStore.setModuleCreationPoints(index, "openSpeedDial", false)}
                            onOpen={() => managmentStore.setModuleCreationPoints(index, "openSpeedDial", true)}
                            open={managmentStore.moduleCreation.points[index].openSpeedDial}
                            direction="left"
                        >
                            <SpeedDialAction
                                tooltipPlacement="bottom"
                                icon={<DeleteForeverIcon />}
                                tooltipTitle={`Удалить точку`}
                                onClick={() => managmentStore.deletePoint(index)}
                            />
                            <SpeedDialAction
                                tooltipPlacement="bottom"
                                icon={<ArrowCircleDownIcon />}
                                tooltipTitle={`Переместить точку ниже`}
                                onClick={() => managmentStore.setPointDown(index)}
                            />
                            <SpeedDialAction
                                tooltipPlacement="bottom"
                                icon={<ArrowCircleUpIcon />}
                                tooltipTitle={`Переместить точку выше`}
                                onClick={() => managmentStore.setPointUp(index)}
                            />

                        </SpeedDial>
                    </AccordionSummary>
                    <AccordionDetails>
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
                                            zIndex: 100,
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
            {managmentStore.moduleCreation.points.length === 0 && <>
                <Box
                    sx={{
                        mt: 8,
                        width: 256,
                        height: 256,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/app/Teacher.svg"}
                        quality={100}
                        width={256}
                        height={256}
                    />
                </Box>
                <Typography>
                    Здесь пусто, добавьте точку, чтобы начать работать
                </Typography>
            </>}
            <Button sx={{ mt: 6 }} variant="contained" onClick={() => managmentStore.pushNewPoint()}>
                Добавить точку
            </Button>
        </Stack >
    );
}))

export default StepTwo


{/* <Grid
                    item
                    xs={12} sm={12} md={5} lg={3} xl={3}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        height: "calc(100vh - 64px)",
                        backgroundColor: 'background.1',
                    }}
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
                                                sx={{
                                                    position: "relative",
                                                    backgroundColor: 'background.2',
                                                    height: "64px",
                                                    width: "calc(100% - 16px)",
                                                    margin: 1,
                                                    borderRadius: 1,
                                                }}
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
                                                        <Tooltip arrow title={`Название: ${page.name}`}>
                                                            <Typography
                                                                sx={{
                                                                    marginLeft: 1,
                                                                    marginRight: "82px",
                                                                    fontSize: "20px",
                                                                    color: 'text.main',
                                                                }}
                                                                noWrap>{page.name}</Typography>
                                                        </Tooltip>
                                                    </Grid>
                                                </Grid>
                                                <Grid sx={{
                                                    position: "absolute",
                                                    top: 8,
                                                    right: "2px",
                                                }}>
                                                    <Link
                                                        href={{
                                                            pathname: '/knowledge/page/[id]',
                                                            query: { id: page.id },
                                                        }}
                                                        passHref>
                                                        <Tooltip title="Посмотреть страницу">
                                                            <IconButton size="large">
                                                                <VisibilityIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Link>
                                                    <IconButton size="large">
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
                </Grid> */}