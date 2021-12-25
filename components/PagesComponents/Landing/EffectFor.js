import React from 'react';
import { useRouter } from 'next/router'
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';

const menu = [
    'Ученикам',
    'Учителям',
    'Родителям',
    'Авторам',
    'Организациям'
]

const content = [
    [
        {
            title: 'Современность',
            label: 'Платформа вам точно понравится! Красивый дизайн, удобный интерфейс, множество крутых функций, кастомизация и возможность использовая с любых устройств',
        },
        {
            title: 'Практичность',
            label: 'Платформа станет для вас не просто местом для образования. У вас есть возможность использовать её в повседневной жизни, например, для общения с друзьями или планирования задач',
        },
        {
            title: 'Безопасность',
            label: 'Первостепенной задачей для команды платформы является безопасность всех её пользователей и их анонимность. На платформе используется система никнеймов, а ваше настоящее имя знают только те, с кем вы знакомы в жизне лично',
        },
    ],
    [
        {
            title: 'Простота',
            label: 'Разобраться в платформе не сложно, у нас всё максимально просто, интуитивно и логично. А после этого платформой будет легко пользоваться',
        },
        {
            title: 'Функциональность',
            label: 'Мы собрали все привычные вам сервисы, с которыми вы работали в процессе образования в одном месте, улучшили их и создали новые',
        },
        {
            title: 'Забота',
            label: 'Платформа заботится о соблюдении баланса между работой и отдыхом. Вы можете настроить ваши рабочие часы и получать уведомления только в это время',
        },
    ],
    [
        {
            title: 'Открытость',
            label: 'Вы сможете свободно наблюдать за процессом образования вашего ребёнка, не мешая этому процессу, при необоходимости общаясь с учителями',
        },
        {
            title: 'Аналитика',
            label: 'Благодаря цифровым технологиям вы сможете лучше понимать вашего ребёнка, его навыки, умения, стремления, а также сможете вовремя узнавать о проблемах в обучении',
        },
        {
            title: 'Комфорт',
            label: 'Вы можете переложить часть своих обязанностей на платформу. Мы будем следить за успеваемостью вашего ребёнка, предоставлять вам удобные отчёты о его достижениях и при небоходимости подключать вас в процесс образования, если у ребёнка возникнут трудности',
        },
    ],
    [
        {
            title: 'Редактор',
            label: '',
        },
        {
            title: 'Настройки',
            label: '',
        },
        {
            title: 'Публичность',
            label: '',
        },
    ],
    [
        {
            title: 'Оболочка',
            label: 'Платформа не вмешивается в само обучение в вашей организации. Не навязвает вам программу обучения. Мы лишь даём вам набор цифровых инструментов, которые сделают ваш рабочий процесс лучше',
        },
        {
            title: 'Автоматизация',
            label: 'Множество сервисов на платформе направлены на автоматизацию рутины в образовательном процессе.',
        },
        {
            title: 'Безопасность',
            label: 'Платформа закрытого типа - просто так войти не получится, нужно приглашение. Образовательные сообщества внутри платформы отделены друг от друга, а умная система приглашений не позволит посторонним вмешиваться в работу платформы',
        },
    ]
]

const EffectFor = () => {

    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    const [tab, setTab] = React.useState(0)

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setTab(prev => {
                return prev === content.length - 1 ? prev = 0 : prev + 1
            })
        },
        onSwipedRight: () => {
            setTab(prev => {
                return prev === 0 ? prev = content.length - 1 : prev - 1
            })
        },
    });

    const getCards = () => {
        if (tab === 0) return cardsStudents
        if (tab === 1) return cardsTeachers
        if (tab === 2) return cardsParents
        if (tab === 3) return cardsAuthors
        if (tab === 4) return cardsOrg
    }

    return (
        <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ zIndex: 1, p: 2, mt: '330px', width: '100%', }}
        >
            <Box
                sx={{

                }}
            >
                <Typography
                    component={"h3"}
                    variant="IBMPlexSans700WhyLabel"
                    sx={{
                        cursor: 'default',
                        textAlign: 'center',
                        maxWidth: '912px',
                        fontSize: {
                            xs: '28px',
                            sm: '30px',
                            md: '36px',
                            lg: '40px',
                        },
                    }}
                >
                    Effect помогает эффективно получать знания и делиться ими в доступном формате
                </Typography>
            </Box>
            {!mobile && <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    maxWidth: '1250px',
                    minHeight: '80px',
                    mt: '80px',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 100%)',
                    boxShadow: '0px 24px 65px rgba(29, 99, 255, 0.05)',
                    borderRadius: '63px',
                }}
            >
                {menu.map((item, index) => (
                    <Grid
                        item
                        container
                        key={index.toString()}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => setTab(index)}
                        sx={{
                            color: tab === index ? '#FFFFFF' : '#555569',
                            bgcolor: tab === index ? 'primary.main' : 'transparent',
                            boxShadow: tab === index ? 12 : 'none',
                            width: '232px',
                            height: '64px',
                            borderRadius: '88px',
                            fontFamily: 'Open Sans',
                            fontWeight: 600,
                            fontSize: '20px',
                            lineHeight: '27px',
                            mr: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        {item}
                    </Grid>
                ))}
            </Grid>}
            {mobile && <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    maxWidth: '400px',
                    minHeight: '80px',
                    mt: '80px',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 100%)',
                    boxShadow: '0px 24px 65px rgba(29, 99, 255, 0.05)',
                    borderRadius: '63px',
                }}
            >
                <Grid item>
                    <IconButton
                        sx={{
                            color: 'secondary.light',
                            mr: 2,
                        }}
                        onClick={() => {
                            if (tab === 0) setTab(4)
                            if (tab != 0) setTab(tab - 1)
                        }}>
                        <ArrowBackIosNewIcon fontSize='large' />
                    </IconButton>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    onClick={() => setTab(index)}
                    sx={{
                        color: '#FFFFFF',
                        bgcolor: 'primary.main',
                        boxShadow: 12,
                        width: '200px',
                        height: '64px',
                        borderRadius: '88px',
                        fontFamily: 'Open Sans',
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '27px',
                        mr: '3px',
                        cursor: 'pointer',
                    }}
                >
                    {(tab === 0) && 'Ученикам'}
                    {(tab === 1) && 'Учителям'}
                    {(tab === 2) && 'Родителям'}
                    {(tab === 3) && 'Авторам'}
                    {(tab === 4) && 'Организациям'}
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{
                            color: 'secondary.light',
                            ml: 2,
                        }}
                        onClick={() => {
                            if (tab === 4) setTab(0)
                            if (tab != 4) setTab(tab + 1)
                        }}>
                        <ArrowForwardIosIcon fontSize='large' />
                    </IconButton>
                </Grid>
            </Grid>}
            <Paper
                {...handlers}
                elevation={24}
                sx={{
                    zIndex: 10,
                    mt: mobile ? "40px" : "80px",
                    width: mobile ? 'calc(100% - 16px)' : 'calc(100% - 200px)',
                    ml: mobile ? "8px" : "100px",
                    mr: mobile ? "8px" : "100px",
                    bgcolor: "grey.400",
                    borderRadius: "20px",
                    minHeight: mobile ? '1350px' : '900px',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: 0,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/landing/Learning.svg"}
                        quality={100}
                        width={256}
                        height={256}
                    />
                </Box>
                {!mobile && <Box
                    sx={{
                        position: 'absolute',
                        bottom: mobile ? '330px' : '-20px',
                        right: 0,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/landing/BookLover.svg"}
                        quality={100}
                        width={256}
                        height={256}
                    />
                </Box>}
                <AnimatePresence initial={false} exitBeforeEnter>
                    {tab === 0 && <Grid
                        key="firtstCard"
                        component={motion.div}
                        initial={{ opacity: 0, x: mobile ? 10 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mobile ? -10 : -100 }}
                        transition={{ duration: 0.5, }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            // mt: mobile ? '30px' : '80px',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        {content[0].map((item, index) => (
                            <Paper
                                component={motion.div}
                                // animate={{ opacity: 1, x: 0 }}
                                // initial={{ opacity: 0, x: 100 }}
                                // exit={{ opacity: 0, x: -100 }}
                                key={index.toString()}
                                elevation={6}
                                whileHover={{ y: -20 }}
                                sx={{
                                    zIndex: 10,
                                    ml: 2,
                                    mr: 2,
                                    mt: 2,
                                    mb: 2,
                                    width: '100%',
                                    maxWidth: '680px',
                                    height: '340px',
                                    bgcolor: "primary.main",
                                    borderRadius: "20px",
                                }}
                            >
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                >
                                    <Grid item>
                                        <Typography
                                            component={"h4"}
                                            variant='IBMPlexSans700WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                // color: '#272731',
                                                pt: mobile ? '20px' : '40px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                textAlign: 'center',
                                                fontSize: {
                                                    xs: '28px',
                                                    sm: '30px',
                                                    md: '36px',
                                                    lg: '40px',
                                                },
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            component={"p"}
                                            variant='OpenSans400WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                color: 'text.secondary',
                                                pt: mobile ? '10px' : '20px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                fontSize: {
                                                    xs: '16px',
                                                    sm: '16px',
                                                    md: '22px',
                                                    lg: '22px',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid >}
                    {tab === 1 && <Grid
                        key="secondCard"
                        component={motion.div}
                        initial={{ opacity: 0, x: mobile ? 10 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mobile ? -10 : -100 }}
                        transition={{ duration: 0.5, }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            // mt: mobile ? '30px' : '80px',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        {content[1].map((item, index) => (
                            <Paper
                                component={motion.div}
                                key={index.toString()}
                                elevation={6}
                                whileHover={{ y: -20 }}
                                sx={{
                                    zIndex: 10,
                                    ml: 2,
                                    mr: 2,
                                    mt: 2,
                                    mb: 2,
                                    width: '100%',
                                    maxWidth: '680px',
                                    height: '340px',
                                    bgcolor: "primary.main",
                                    borderRadius: "20px",
                                }}
                            >
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx={{
                                    }}
                                >
                                    <Grid item>
                                        <Typography
                                            component={"h4"}
                                            variant='IBMPlexSans700WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                // color: '#272731',
                                                pt: mobile ? '20px' : '40px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                textAlign: 'center',
                                                fontSize: {
                                                    xs: '28px',
                                                    sm: '30px',
                                                    md: '36px',
                                                    lg: '40px',
                                                },
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            component={"p"}
                                            variant='OpenSans400WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                color: 'text.secondary',
                                                pt: mobile ? '10px' : '20px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                fontSize: {
                                                    xs: '16px',
                                                    sm: '16px',
                                                    md: '22px',
                                                    lg: '22px',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid >}
                    {tab === 2 && <Grid
                        key="thirdCard"
                        component={motion.div}
                        initial={{ opacity: 0, x: mobile ? 10 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mobile ? -10 : -100 }}
                        transition={{ duration: 0.5, }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            // mt: mobile ? '30px' : '80px',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        {content[2].map((item, index) => (
                            <Paper
                                component={motion.div}
                                key={index.toString()}
                                elevation={6}
                                whileHover={{ y: -20 }}
                                sx={{
                                    zIndex: 10,
                                    ml: 2,
                                    mr: 2,
                                    mt: 2,
                                    mb: 2,
                                    width: '100%',
                                    maxWidth: '680px',
                                    height: '340px',
                                    bgcolor: "primary.main",
                                    borderRadius: "20px",
                                }}
                            >
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx={{
                                    }}
                                >
                                    <Grid item>
                                        <Typography
                                            component={"h4"}
                                            variant='IBMPlexSans700WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                // color: '#272731',
                                                pt: mobile ? '20px' : '40px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                textAlign: 'center',
                                                fontSize: {
                                                    xs: '28px',
                                                    sm: '30px',
                                                    md: '36px',
                                                    lg: '40px',
                                                },
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            component={"p"}
                                            variant='OpenSans400WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                color: 'text.secondary',
                                                pt: mobile ? '10px' : '20px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                fontSize: {
                                                    xs: '16px',
                                                    sm: '16px',
                                                    md: '22px',
                                                    lg: '22px',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid >}
                    {tab === 3 && <Grid
                        key="fourthCard"
                        component={motion.div}
                        initial={{ opacity: 0, x: mobile ? 10 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mobile ? -10 : -100 }}
                        transition={{ duration: 0.5, }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            // mt: mobile ? '30px' : '80px',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        {content[3].map((item, index) => (
                            <Paper
                                component={motion.div}
                                key={index.toString()}
                                elevation={6}
                                whileHover={{ y: -20 }}
                                sx={{
                                    zIndex: 10,
                                    ml: 2,
                                    mr: 2,
                                    mt: 2,
                                    mb: 2,
                                    width: '100%',
                                    maxWidth: '680px',
                                    height: '340px',
                                    bgcolor: "primary.main",
                                    borderRadius: "20px",
                                }}
                            >
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx={{
                                    }}
                                >
                                    <Grid item>
                                        <Typography
                                            component={"h4"}
                                            variant='IBMPlexSans700WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                // color: '#272731',
                                                pt: mobile ? '20px' : '40px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                textAlign: 'center',
                                                fontSize: {
                                                    xs: '28px',
                                                    sm: '30px',
                                                    md: '36px',
                                                    lg: '40px',
                                                },
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            component={"p"}
                                            variant='OpenSans400WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                color: 'text.secondary',
                                                pt: mobile ? '10px' : '20px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                fontSize: {
                                                    xs: '16px',
                                                    sm: '16px',
                                                    md: '22px',
                                                    lg: '22px',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid >}
                    {tab === 4 && <Grid
                        key="fifthCard"
                        component={motion.div}
                        initial={{ opacity: 0, x: mobile ? 10 : 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: mobile ? -10 : -100 }}
                        transition={{ duration: 0.5, }}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            // mt: mobile ? '30px' : '80px',
                            width: '100%',
                            zIndex: 10,
                        }}
                    >
                        {content[4].map((item, index) => (
                            <Paper
                                component={motion.div}
                                key={index.toString()}
                                elevation={6}
                                whileHover={{ y: -20 }}
                                sx={{
                                    zIndex: 10,
                                    ml: 2,
                                    mr: 2,
                                    mt: 2,
                                    mb: 2,
                                    width: '100%',
                                    maxWidth: '680px',
                                    height: '340px',
                                    bgcolor: "primary.main",
                                    borderRadius: "20px",
                                }}
                            >
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                    sx={{
                                    }}
                                >
                                    <Grid item>
                                        <Typography
                                            component={"h4"}
                                            variant='IBMPlexSans700WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                // color: '#272731',
                                                pt: mobile ? '20px' : '40px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                textAlign: 'center',
                                                fontSize: {
                                                    xs: '28px',
                                                    sm: '30px',
                                                    md: '36px',
                                                    lg: '40px',
                                                },
                                            }}
                                        >
                                            {item.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            component={"p"}
                                            variant='OpenSans400WhyLabel'
                                            sx={{
                                                cursor: 'default',
                                                color: 'text.secondary',
                                                pt: mobile ? '10px' : '20px',
                                                pl: mobile ? '16px' : '32px',
                                                pr: mobile ? '16px' : '32px',
                                                fontSize: {
                                                    xs: '16px',
                                                    sm: '16px',
                                                    md: '22px',
                                                    lg: '22px',
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </Grid >}
                </AnimatePresence>

            </Paper>
        </Stack >
    );
}

export default EffectFor;