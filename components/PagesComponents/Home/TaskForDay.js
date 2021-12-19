/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Button, Paper, Stack, Box, Grid, Divider, Typography, useTheme, IconButton } from '@mui/material';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from "framer-motion"
import moment from 'moment';

const tasks = [
    {
        startTime: '2012-01-26T07:00:00.000+04:00',
        endTime: '2012-01-26T07:20:00.000+04:00',
        label: 'Зарядка и умывание',
        type: 'live',
    },
    {
        startTime: '2012-01-26T07:30:00.000+04:00',
        endTime: '2012-01-26T07:45:00.000+04:00',
        label: 'Медитация',
        type: 'live',
    },
    {
        startTime: '2012-01-26T08:00:00.000+04:00',
        endTime: '2012-01-26T08:30:00.000+04:00',
        label: 'Завтрак',
        type: 'live',
    },
    {
        startTime: '2012-01-26T09:00:00.000+04:00',
        endTime: '2012-01-26T09:45:00.000+04:00',
        label: 'Математика',
        type: 'school',
    },
    {
        startTime: '2012-01-26T10:00:00.000+04:00',
        endTime: '2012-01-26T10:45:00.000+04:00',
        label: 'Литература',
        type: 'school',
    },
    {
        startTime: '2012-01-26T11:00:00.000+04:00',
        endTime: '2012-01-26T12:45:00.000+04:00',
        label: 'История',
        type: 'school',
    },

    {
        startTime: '2012-01-26T13:45:00.000+04:00',
        endTime: '2012-01-26T16:00:00.000+04:00',
        label: 'Обед',
        type: 'live',
    },
    {
        startTime: '2012-01-26T16:45:00.000+04:00',
        endTime: '2012-01-26T19:00:00.000+04:00',
        label: 'Кружок исторических реконструкций',
        type: 'club',
    },
    {
        startTime: '2012-01-26T20:45:00.000+04:00',
        endTime: '2012-01-26T21:00:00.000+04:00',
        label: 'Домашнее задание. Информатика',
        type: 'homework',
    },
]

// const timeline = [
//     "6:00",
//     "7:00",
//     "8:00",
//     "9:00",
//     "10:00",
//     "11:00",
//     "12:00",
//     "13:00",
//     "14:00",
//     "15:00",
//     "16:00",
//     "17:00",
//     "18:00",
//     "19:00",
//     "20:00",
//     "21:00",
//     "22:00",
// ]

const Task = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore, task, nextTask }) => {
    // console.log(task.startTime)
    // console.log(task.endTime)
    const dateStart = moment(task.startTime)
    let dateStartNext = null
    if (nextTask) dateStartNext = moment(nextTask.startTime)
    const dateEnd = moment(task.endTime)

    const gM = (m) => {
        if (m < 10) return '0' + m
        return m
    }

    const getHourEndStr = (hours) => {
        let h = hours % 100
        if (Math.floor(h / 10) == 1) return "ов"
        else if (h % 10 == 1) return ""
        else if (h % 10 > 1 && h % 10 < 5) return "а"
        else return "ов"
    }

    const getTaskColor = (t) => {
        if (t === 'live') return '#ff9800'
        if (t === 'school') return '#cddc39'
        if (t === 'club') return '#2196f3'
        if (t === 'homework') return '#e91e63'
    }

    const getTaskLabel = (t) => {
        if (t === 'live') return 'жизнь'
        if (t === 'school') return 'школа'
        if (t === 'club') return 'дополнительные занятия'
        if (t === 'homework') return 'домашняя работа'
    }

    const getBreak = () => {
        let diff = dateStartNext.diff(dateEnd, 'minutes')
        if (diff < 60 && diff != 0) return `${diff} минут`
        if (diff % 60 === 0) return `${diff / 60} час${getHourEndStr(diff / 60)}`
        return `${Math.floor(diff / 60)} час${getHourEndStr(Math.floor(diff / 60))} ${diff % 60} минут`
        // if (hoursB == 1 && minutesB == 0) return `${hoursB} часов`

    }

    return (
        <>
            <Box
                sx={{
                    mt: 2,
                    width: 'calc(100% - 100px)',
                    position: 'relative',
                    ml: 0.5,
                }}
            >
                <Typography
                    varinat="subtitle1"
                    sx={{
                        color: 'text.secondary',
                        position: 'absolute',
                        top: "0px",
                        left: "-46px",
                    }}
                >
                    {`${dateStart.get('hour')}:${gM(dateStart.get('minute'))}`}

                </Typography>
                <Typography
                    varinat="subtitle1"
                    sx={{
                        color: 'text.secondary',
                        position: 'absolute',
                        bottom: "-4px",
                        left: "-46px",
                    }}
                >
                    {`${dateEnd.get('hour')}:${gM(dateEnd.get('minute'))}`}
                </Typography>
                <Paper
                    elevation={6}
                    // direction="row"
                    // justifyContent="flex-start"
                    // alignItems="center"
                    sx={{
                        // position: 'absolute',
                        // top: 60 * (dateStart.getHours() - 6) + dateStart.getMinutes(),
                        height: 60 * (dateEnd.get('hour') - dateStart.get('hour')) + (dateEnd.get('minute') - dateStart.get('minute')),
                        minHeight: "64px",
                        width: '100%',
                        // minWidth: 300,
                        // bgcolor: 'primary.main',
                        borderRadius: 2,
                        ml: 0.5,
                        "&:before": {
                            position: "absolute",
                            content: '""',
                            top: 0,
                            left: 2,
                            right: 0,
                            width: "10px",
                            height: "100%",
                            borderRadius: 2,
                            background: getTaskColor(task.type),
                        },
                        // mt: 1.5,
                        // ml: 1,
                    }}
                >
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    // spacing={1}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: getTaskColor(task.type),
                                ml: 2,
                            }}
                        >
                            {`${getTaskLabel(task.type)}`}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                // color: getTaskColor(task.type),
                                width: 'calc(100% - 12px)',
                                ml: 2,
                            }}
                            noWrap
                        >
                            {task.label}
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
            {nextTask != null && <Divider sx={{ color: 'text.secondary', fontSize: 14, mt: 2 }}> {`перерыв ${getBreak()}`}</Divider>}
        </>
    )
}));


const TaskForDay = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore, }) => {
    const theme = useTheme();


    return (
        <>
            <Typography
                variant='OpenSans600WhyLabel'
                sx={{
                    fontSize: 22,
                    ml: 2,
                }}
            >
                Задачи на день:
            </Typography>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    height: '100%',
                    width: '100%',
                }}
            >
                {tasks.map((task, index) => (
                    <Task key={index.toString()} task={task} nextTask={index + 1 <= tasks.length ? tasks[index + 1] : null} />
                ))}
            </Stack>
        </>
    )
}));


export default TaskForDay;