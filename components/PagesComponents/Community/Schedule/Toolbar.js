import React from "react";
import Moment from 'react-moment';
import 'moment/locale/ru';
import {
    CircularProgress,
    Skeleton,
    Grid,
    Typography,
    useTheme,
    Box,
    IconButton,
    Stack,
    Tooltip,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

Moment.globalLocale = 'ru';

const GetTime = () => {
    const [time, setTime] = React.useState(Date.now());

    React.useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Moment format='ddd, D MMMM HH:mm' interval={0}>{time}</Moment>
    )
}

const Toolbar = inject("knowledgeStore")(
    observer(({ knowledgeStore }) => {


        return (
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                // spacing={1}
                sx={{
                    width: '100%',
                    height: 64,
                    pl: 4,
                }}
            >
                <Tooltip title="Добавить занятие">
                    <IconButton
                    >
                        <AddBoxIcon sx={{ fontSize: 30 }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Скопировать занятие">
                    <IconButton
                        sx={{
                            mr: 'aauto',
                            ml: 0,
                        }}
                    >
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Сегодня'>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            ml: 'auto',
                            color: 'text.secondary',
                            mr: 1,
                        }}>
                        <GetTime />
                    </Typography>
                </Tooltip>
                <Tooltip title="На неделю назад">
                    <IconButton sx={{
                        ml: 1,
                        mr: 0,
                    }}>
                        <KeyboardDoubleArrowLeftIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="На день назад">
                    <IconButton>
                        <ArrowLeftIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="На день вперёд">
                    <IconButton>
                        <ArrowRightIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="На неделю вперёд">
                    <IconButton sx={{
                        ml: 0,
                        mr: 4,
                    }}>
                        <KeyboardDoubleArrowRightIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        );
    })
);

export default Toolbar;
