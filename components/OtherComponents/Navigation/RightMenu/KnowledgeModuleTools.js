/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, Box, useMediaQuery, ClickAwayListener, Divider, MenuList, MenuItem, ListItemText, ListItemIcon, Tooltip, Popper, IconButton, Link, Paper, useTheme, Stack, Typography, Grow } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from '@mui/icons-material/Info';
import TaskIcon from '@mui/icons-material/Task';

import { motion, AnimatePresence } from "framer-motion"

const KnowledgeModuleTools = inject(
    "knowledgeStore",
)(
    observer(({ knowledgeStore, goNext, setOpenDialog }) => {
        const theme = useTheme();
        const router = useRouter()

        return (
            <>
                <>
                    {knowledgeStore.moduleCompleted.isFinished && router.pathname.includes('/knowledge/module/results') && !(router.pathname === '/knowledge/module/results') && <Button
                        sx={{
                            color: 'text.primary',
                            width: 152,
                            alignItems: 'space-between',
                        }}
                        onClick={() => router.push('/knowledge/module/results')} size="large"
                    >
                        К результатам
                    </Button>}
                    {router.pathname === '/knowledge/module/results' && <Button
                        sx={{
                            color: 'text.primary',
                            width: 142,
                            alignItems: 'space-between',
                        }}
                        onClick={() => router.push('/knowledge/modules/')} size="large"
                    >
                        Закрыть тест
                    </Button>}
                    {knowledgeStore.module.type === 'test' && !(router.pathname.includes('/knowledge/module/results')) && <Button
                        sx={{
                            color: 'text.primary',
                            width: 142,
                            alignItems: 'space-between',
                        }}
                        onClick={() => knowledgeStore.getTestModuleResults()} size="large"
                    >
                        Завершить <TaskIcon sx={{ ml: 'auto', mr: 0 }} />
                    </Button>}
                    <Button
                        sx={{
                            color: 'text.primary',
                            width: 142,
                            alignItems: 'space-between',
                        }}
                        onClick={() => setOpenDialog(true)} size="large"
                    >
                        Инфо <InfoIcon sx={{ ml: 'auto', mr: 0 }} />
                    </Button>
                    {!(router.pathname === '/knowledge/module/results') && <Button
                        sx={{
                            color: 'text.primary',
                            width: 142,
                            alignItems: 'space-between',
                        }}
                        onClick={goNext}
                        size="large"
                    >
                        Вперёд <DoubleArrowIcon sx={{ ml: 'auto', mr: 0 }} />
                    </Button>}
                </>
                {(knowledgeStore.moduleCompleted.isFinished || !(knowledgeStore.module["map"] != undefined) || knowledgeStore.module["map"].length === 0) && <>

                </>}
            </>
        );
    })
);

export default KnowledgeModuleTools;