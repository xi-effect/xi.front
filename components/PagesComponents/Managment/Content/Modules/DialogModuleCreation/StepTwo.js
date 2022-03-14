import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Stack, SpeedDial, SpeedDialAction, Input, Button, Grid, Box, Typography, Tooltip } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { inject, observer } from "mobx-react"
import TuneIcon from "@mui/icons-material/Tune";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import QuizIcon from "@mui/icons-material/Quiz";


const ItemList = inject("managmentStore")(observer(({ managmentStore, index }) => {

    const value = managmentStore.moduleCreation.points[index].pages
    return <>
        {value.length === 0 && <Typography sx={{ color: "#fff" }}> Перетащите страницу сюда </Typography>}
        {value.length !== 0 && value.map((page, pageIndex) => (
            <Draggable
                key={pageIndex.toString()}
                draggableId={`list-${index}-${pageIndex}`}
                index={pageIndex}>
                {(provided) => (
                    <Grid
                        sx={{
                            zIndex: 100,
                            position: "relative",
                            backgroundColor: "background.1",
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
                                        // marginTop: 16,
                                        marginLeft: 1,
                                        marginRight: "128px",
                                        fontSize: "20px",
                                        color: "text.main",
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
                                    pathname: "/knowledge/page/[id]",
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

const StepTwo = inject("managmentStore")(observer(({ managmentStore }) => (
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
                    "&.MuiPaper-root": { zIndex: 0, width: "100%", minWidth: 400 },
                    bgcolor: "primary.dark",

                }}
                key={index.toString()}
                expanded={point.openAccordion} >
                <AccordionSummary
                    expandIcon={<IconButton
                        onClick={() => managmentStore.setModuleCreationPoints(index, "openAccordion", !managmentStore.moduleCreation.points[index].openAccordion)}
                        size="large"><ExpandMoreIcon /></IconButton>}
                >
                    <Grid sx={{ width: "calc(100% - 88px)", }}>
                        <Input
                            sx={{
                                width: "100%",
                                color: "text.main",
                            }}
                            type="text"
                            disableUnderline
                            multiline
                            fullWidth
                            value={point.label}
                            onChange={(event) => managmentStore.setModuleCreationPoints(index, "label", event.target.value)}
                        />
                    </Grid>
                    <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        sx={{
                            height: 36,
                            width: 36,
                            mt: 0.5,
                        }}
                        icon={<TuneIcon />}
                        onClose={() => managmentStore.setModuleCreationPoints(index, "openSpeedDial", false)}
                        onOpen={() => managmentStore.setModuleCreationPoints(index, "openSpeedDial", true)}
                        open={point.openSpeedDial}
                        direction="left"
                    >
                        <SpeedDialAction
                            tooltipPlacement="bottom"
                            icon={<DeleteForeverIcon />}
                            tooltipTitle="Удалить точку"
                            onClick={() => managmentStore.deletePoint(index)}
                        />
                        <SpeedDialAction
                            tooltipPlacement="bottom"
                            icon={<ArrowCircleDownIcon />}
                            tooltipTitle="Переместить точку ниже"
                            onClick={() => managmentStore.setPointDown(index)}
                        />
                        <SpeedDialAction
                            tooltipPlacement="bottom"
                            icon={<ArrowCircleUpIcon />}
                            tooltipTitle="Переместить точку выше"
                            onClick={() => managmentStore.setPointUp(index)}
                        />

                    </SpeedDial>
                    <Tooltip title={point.type === "theory" ? "Теоритическая точка" : "Практическая точка"}>
                        <IconButton onClick={() => {
                            if (point.type === "theory") {
                                return managmentStore.setModuleCreationPoints(index, "type", "practice")
                            }
                            if (point.type === "practice") {
                                return managmentStore.setModuleCreationPoints(index, "type", "theory")
                            }
                            return null
                        }} sx={{ ml: 3 }}>
                            {point.type === "theory" && <LibraryBooksIcon />}
                            {point.type === "practice" && <QuizIcon />}
                        </IconButton>
                    </Tooltip>
                </AccordionSummary>
                <AccordionDetails>
                    <Droppable droppableId={`list-${index}`}>
                        {(provided) => (
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
                    src="/assets/app/Teacher.svg"
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
)))

export default StepTwo

