/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";

import { Grid, Tooltip, IconButton, Stack, Typography } from "@mui/material";
import { Droppable, Draggable } from "react-beautiful-dnd";

import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { motion } from "framer-motion"

const KnowledgeСreateModuleMap = inject(
    "managmentStore",
    "uiStore",
)(
    observer(({ uiStore, managmentStore }) => (
            <>
                {uiStore.knowledge.activeStepModuleCreate === 1 && <Droppable isDropDisabled droppableId="list-pages">
                        {(provided) => (
                            <Grid
                                ref={provided.innerRef}
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{
                                    height: "100%",
                                }}
                            >
                                {managmentStore.pageCreationList.pages.map((page, index) => (
                                    <Draggable
                                        key={page.id.toString()}
                                        draggableId={`list-pages-id-${index}`}
                                        index={index}>
                                        {(provided) => (
                                            <Stack
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
                                                <Typography sx={{ maxWidth: 250, ml: 1 }} noWrap>
                                                    {page.name}
                                                </Typography>
                                                <Tooltip placement="left" title="добавить">
                                                    <IconButton sx={{ ml: "auto", mr: 1, cursor: "pointer" }}>
                                                        <DragIndicatorIcon />
                                                    </IconButton>
                                                </Tooltip>
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
        ))
);

export default KnowledgeСreateModuleMap;