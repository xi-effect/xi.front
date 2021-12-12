import React from 'react';
import { useRouter } from 'next/router'
import { motion, LayoutGroup } from "framer-motion";
import Image from "next/image";

import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const menu = [
    'Ученикам',
    'Учителям',
    'Родителям',
    'Авторам',
    'Организациям'
]

const cardsStudents = [
    {
        title: 'Для учеников',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для учеников',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для учеников',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
]

const cardsTeachers = [
    {
        title: 'Для учителей',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для учителей',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для учителей',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
]

const cardsParents = [
    {
        title: 'Для родителей',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для родителей',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для родителей',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
]

const cardsAuthors = [
    {
        title: 'Для авторов',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для авторов',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для авторов',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
]

const cardsOrg = [
    {
        title: 'Для организаций',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для организаций',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
    {
        title: 'Для организаций',
        label: 'Описание преимущества в несколько строк для примера, думаю подумаем над этим после',
    },
]

const EffectFor = () => {
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));
    const [tab, setTab] = React.useState(0)

    const getCards = () => {
        if (tab === 0) return cardsStudents
        if (tab === 1) return cardsTeachers
        if (tab === 2) return cardsParents
        if (tab === 3) return cardsAuthors
        if (tab === 4) return cardsOrg
    }

    return (
        <Stack
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
                <Grid
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
                    {getCards().map((item, index) => (
                        <Paper
                            key={index.toString()}
                            elevation={6}
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
                                            // color: '#272731',
                                            pt: '40px',
                                            pl: '32px',
                                            pr: '32px',
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
                                            color: 'text.secondary',
                                            pt: '20px',
                                            pl: '32px',
                                            pr: '32px',
                                            fontSize: {
                                                xs: '18px',
                                                sm: '18px',
                                                md: '18px',
                                                lg: '18px',
                                            },
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Grid >
            </Paper>
        </Stack >
    );
}

export default EffectFor;