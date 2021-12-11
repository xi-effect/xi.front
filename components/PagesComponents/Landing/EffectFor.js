import React from 'react';
import { useRouter } from 'next/router'
import { motion, LayoutGroup } from "framer-motion";
import Image from "next/image";

import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

const menu = [
    'Авторам',
    'Ученикам',
    'Организациям',
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
        if (tab === 0) return cardsAuthors
        if (tab === 1) return cardsStudents
        if (tab === 2) return cardsOrg
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
                        width: '912px',
                    }}
                >
                    Effect помогает эффективно получать знания и делиться ими в доступном формате
                </Typography>
            </Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: '784px',
                    height: '80px',
                    mt: '80px',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 100%)',
                    boxShadow: '0px 24px 65px rgba(29, 99, 255, 0.05)',
                    borderRadius: '63px',
                }}
            >
                {menu.map((item, index) => (
                    <Stack
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
                    </Stack>
                ))}
            </Stack>
            <Paper
                elevation={24}
                sx={{
                    zIndex: 10,
                    mt: "80px",
                    width: mobile ? 'calc(100% - 16px)' : 'calc(100% - 200px)',
                    ml: mobile ? "8px" : "100px",
                    mr: mobile ? "8px" : "100px",
                    bgcolor: "grey.400",
                    borderRadius: "20px",
                    minHeight: mobile ? '1200px' : '900px',
                    position: 'relative',
                }}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        mt: mobile ? '30px' : '80px',
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
                                width: '680px',
                                height: '340px',
                                bgcolor: "primary.main",
                                borderRadius: "20px",
                            }}
                        >
                            <Grid
                                item
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
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