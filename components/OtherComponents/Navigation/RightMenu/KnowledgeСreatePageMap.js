/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, Box, useMediaQuery, ClickAwayListener, Divider, MenuList, MenuItem, ListItemText, ListItemIcon, Tooltip, Popper, IconButton, Link, Paper, useTheme, Stack, Typography, Grow } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from '@mui/icons-material/Info';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TitleIcon from '@mui/icons-material/Title';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import ImageIcon from '@mui/icons-material/Image';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import QuizIcon from '@mui/icons-material/Quiz';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import CodeIcon from '@mui/icons-material/Code';

import { motion, AnimatePresence } from "framer-motion"

const KnowledgeСreatePageMap = inject(
    "knowledgeStore",
    "managmentStore",
    "uiStore",
)(
    observer(({ knowledgeStore, uiStore, managmentStore }) => {

        const components = [
            { name: "Текст", icon: <TextFieldsIcon />, type: "text" },
            { name: "Заголовок", icon: <TitleIcon />, type: "h" },
            { name: "Markdown", icon: <LineStyleIcon />, type: "markdown" },
            { name: "Изображение", icon: <ImageIcon />, type: "img" },
            { name: "Опрос", icon: <QuestionAnswerIcon />, type: "quiz" },
            { name: "Замечание", icon: <NotificationsIcon />, type: "alert" },
            { name: "Разделитель", icon: <VerticalAlignCenterIcon />, type: "divider" },
            { name: "Список", icon: <ListAltIcon />, type: "list" },
            { name: "Численный ответ", icon: <QuizIcon />, type: "numanswer" },
            { name: "Код", icon: <CodeIcon />, type: "code" }
        ]

        return (
            <>
                {uiStore.knowledge.activeStep === 1 && <>
                    <Typography sx={{ ml: 1 }}> Компоненты: </Typography>
                    {components.map((component, index) => {

                        return (
                            <Stack
                                key={index.toString()}
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                // spacing={1}
                                component={motion.div}
                                sx={{
                                    width: '100%',
                                    cursor: 'default',
                                    "&:hover": {
                                        bgcolor: 'primary.light',
                                    }
                                }}
                            >
                                <IconButton sx={{ cursor: 'default', ml: 1 }}>
                                    {component.icon}
                                </IconButton>
                                <Typography sx={{ mr: 'auto' }}>
                                    {component.name}
                                </Typography>
                                <Tooltip placement="left" title="добавить">
                                    <IconButton onClick={() => managmentStore.pushNewComponent(component.type)} sx={{ ml: 'auto', mr: 1, cursor: 'pointer' }}>
                                        <PlusOneIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        )
                    }
                    )}
                </>}
            </>
        );
    })
);

export default KnowledgeСreatePageMap;