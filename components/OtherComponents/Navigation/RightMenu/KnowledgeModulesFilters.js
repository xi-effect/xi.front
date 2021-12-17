/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, Box, useMediaQuery, Radio, ClickAwayListener, Divider, MenuList, Grid, MenuItem, ListItemText, ListItemIcon, Tooltip, Popper, IconButton, Link, Paper, useTheme, Stack, Typography, Grow } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from '@mui/icons-material/Info';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CodeIcon from '@mui/icons-material/Code';

import { motion, AnimatePresence } from "framer-motion"

const KnowledgeModulesFilters = inject(
    "knowledgeStore",
    "managmentStore",
    "uiStore",
)(
    observer(({ knowledgeStore, uiStore, managmentStore }) => {
        const theme = useTheme();
        const router = useRouter()

        return (
            <>
                <MenuList
                    // spacing={2}
                    sx={{
                        // p: 0.5,
                    }}
                >
                    <MenuItem
                        sx={{
                            p: 0,
                            pl: 0.5,
                        }}
                    >
                        <ListItemIcon>
                            <Radio
                                checked={knowledgeStore.moduleList.filters.global === "starred"}
                                onClick={() => {
                                    if (knowledgeStore.moduleList.filters.global == "starred") return knowledgeStore.setModuleListDataSecondary("filters", "global", null)
                                    if (knowledgeStore.moduleList.filters.global != "starred") return knowledgeStore.setModuleListDataSecondary("filters", "global", "starred")
                                }}
                                color="default"
                            />
                        </ListItemIcon>
                        <ListItemText>Избранные модули</ListItemText>
                    </MenuItem>
                    <MenuItem
                        sx={{
                            p: 0,
                            pl: 0.5,
                        }}
                    >
                        <ListItemIcon>
                            <Radio
                                checked={knowledgeStore.moduleList.filters.global === "started"}
                                onClick={() => {
                                    if (knowledgeStore.moduleList.filters.global != "started") return knowledgeStore.setModuleListDataSecondary("filters", "global", "started")
                                    if (knowledgeStore.moduleList.filters.global === "started") return knowledgeStore.setModuleListDataSecondary("filters", "global", null)
                                }}
                                color="default"
                            />
                        </ListItemIcon>
                        <ListItemText>Начатые модули</ListItemText>
                    </MenuItem>
                </MenuList>
            </>
        );
    })
);

export default KnowledgeModulesFilters;