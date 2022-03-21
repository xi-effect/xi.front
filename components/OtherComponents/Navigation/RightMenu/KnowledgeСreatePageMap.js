/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";

import { Grid, IconButton, Stack, Typography } from "@mui/material";

import TextFieldsIcon from "@mui/icons-material/TextFields";
import TitleIcon from "@mui/icons-material/Title";
import NotificationsIcon from "@mui/icons-material/Notifications";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import ImageIcon from "@mui/icons-material/Image";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import QuizIcon from "@mui/icons-material/Quiz";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CodeIcon from "@mui/icons-material/Code";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { motion } from "framer-motion"

const KnowledgeСreatePageMap = inject(
    "uiSt",
)(
    observer(({ uiSt }) => {

        const components = [
            { name: "Текст", icon: <TextFieldsIcon />, type: "text" },
            { name: "Заголовок", icon: <TitleIcon />, type: "h" },
            { name: "Markdown", icon: <LineStyleIcon />, type: "markdown" },
            { name: "Разделитель", icon: <VerticalAlignCenterIcon />, type: "divider" },
            { name: "Опрос", icon: <QuestionAnswerIcon />, type: "quiz" },
            { name: "Замечание", icon: <NotificationsIcon />, type: "alert" },
            { name: "Список", icon: <ListAltIcon />, type: "list" },
            { name: "Численный ответ", icon: <QuizIcon />, type: "numanswer" },
            { name: "Код", icon: <CodeIcon />, type: "code" },
            { name: "Изображение", icon: <ImageIcon />, type: "img" },
        ]

        return (
            <>
                {uiSt.knowledge.activeStep === 1 && <Droppable isDropDisabled droppableId="list-components">
                    {(provided) => (
                        <Grid
                            ref={provided.innerRef}
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            sx={{
                                height: "100%",
                            }}
                        >
                            <Typography variant="subtitle1" sx={{ ml: 0.5 }}>Компоненты:</Typography>
                            {components.map((component, index) => (
                                <Draggable
                                    key={index.toString()}
                                    draggableId={`list-components-id-${index}`}
                                    index={index}>
                                    {(provided, snapshot) => (
                                        <Stack
                                            // onDoubleClick={() => managmentSt.pushNewComponent(component.type)}
                                            key={index.toString()}
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            // spacing={1}
                                            component={motion.div}
                                            sx={{
                                                zIndex: 100,
                                                width: "100%",
                                                cursor: "default",
                                                // bgcolor: "primary.dark",
                                                "&:hover": {
                                                    bgcolor: "primary.main",
                                                }
                                            }}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <IconButton sx={{ ml: 1, mr: 1, cursor: "pointer" }}>
                                                {component.icon}
                                            </IconButton>
                                            <Typography sx={{ maxWidth: 250, ml: 1 }} noWrap>
                                                {component.name}
                                            </Typography>
                                            <IconButton sx={{ ml: "auto", mr: 1, cursor: "pointer" }}>
                                                <DragIndicatorIcon />
                                            </IconButton>
                                        </Stack>
                                    )}
                                </Draggable>
                            ))
                            }
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable >}
            </>
        );
    })
);

export default KnowledgeСreatePageMap;