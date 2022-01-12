/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, Box, useMediaQuery, ClickAwayListener, Divider, MenuList, Grid, MenuItem, ListItemText, ListItemIcon, Tooltip, Popper, IconButton, Link, Paper, useTheme, Stack, Typography, Grow } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from '@mui/icons-material/Info';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CodeIcon from '@mui/icons-material/Code';

import { motion, AnimatePresence } from "framer-motion"

const KnowledgeСreateModuleMap = inject(
    "knowledgeStore",
    "managmentStore",
    "uiStore",
)(
    observer(({ knowledgeStore, uiStore, managmentStore }) => {
        const theme = useTheme();
        const router = useRouter()

        return (
            <>
                {uiStore.knowledge.activeStepModuleCreate === 1 && <>
                    <Droppable isDropDisabled droppableId="list-pages">
                        {(provided, snapshot) => (
                            <Grid
                                ref={provided.innerRef}
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{
                                    height: '100%',
                                }}
                            >
                                {managmentStore.pageCreationList.pages.map((page, index) => (
                                    <Draggable
                                        key={page.id.toString()}
                                        draggableId={`list-pages-id-${index}`}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <Stack
                                                key={index.toString()}
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                // spacing={1}
                                                component={motion.div}
                                                sx={{
                                                    zIndex: 100,
                                                    width: '100%',
                                                    cursor: 'default',
                                                    // bgcolor: 'primary.dark',
                                                    "&:hover": {
                                                        bgcolor: 'primary.main',
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
                                                    <IconButton onClick={() => managmentStore.pushNewComponent(component.type)} sx={{ ml: 'auto', mr: 1, cursor: 'pointer' }}>
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
                    </Droppable >
                </>}
            </>
        );
    })
);

export default KnowledgeСreateModuleMap;