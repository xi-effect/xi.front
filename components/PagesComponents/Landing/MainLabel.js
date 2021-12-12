import React from 'react';
import { useRouter } from 'next/router'
import Image from "next/image";
import { motion } from "framer-motion"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


const MainLabel = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));


    return (
        <Box
            sx={{
                position: 'relative',
                width: 'calc(100% - 64px)',
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    zIndex: 10,
                    mt: "20px",
                    width: mobile ? 'calc(100% - 16px)' : 'calc(100% - 200px)',
                    ml: mobile ? "8px" : "100px",
                    mr: mobile ? "8px" : "100px",
                    bgcolor: "grey.400",
                    borderRadius: "20px",
                    minHeight: mobile ? '900px' : '500px',
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
                        src={"/landing/Knowledge.svg"}
                        quality={100}
                        width={256}
                        height={256}
                    />
                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: mobile ? '330px' : '-20px',
                        right: 0,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/landing/OnlineLearning.svg"}
                        quality={100}
                        width={256}
                        height={256}
                    />
                </Box>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{

                    }}
                >
                    <Typography
                        // component={"h1"}
                        variant="OpenSans700MainLabel"
                        sx={{
                            '&.MuiTypography-root': {
                                color: '#272731',
                                textAlign: 'center',
                                p: 2,

                            },
                            fontSize: {
                                xs: '28px',
                                sm: '36px',
                                md: '44px',
                                lg: '60px',
                            },
                            lineHeight: {
                                xs: '44px',
                                sm: '44px',
                                md: '71px',
                                lg: '71px',
                            },
                            mt: mobile ? "20px" : "5px",
                        }}
                    >
                        Effect - платформа для построения образовательных процессов
                    </Typography>
                    <Typography
                        // component={"h2"}
                        variant="OpenSans500MainLabel"
                        sx={{
                            '&.MuiTypography-root': {
                                color: '#555569',
                                textAlign: 'center',
                                p: 2,
                            },
                            fontSize: {
                                sm: '20px',
                                md: '22px',
                                lg: '24px',
                            },
                        }}
                    >
                        Создавайте образовательные сообщества и настраивайте образовательные процессы
                    </Typography>
                    <Button
                        onClick={() => {
                            router.push({
                                pathname: '/registration',
                            })
                        }}
                        sx={{
                            '&.MuiButton-root': {
                                width: '272px',
                                height: '60px',
                                color: 'text.main',
                                bgcolor: 'primary.main',
                                borderRadius: '88px',
                                boxShadow: 24,
                                '&:hover': {
                                    bgcolor: 'primary.main',
                                },
                            },
                            mt: mobile ? '260px' : '90px',
                            mb: '90px',
                        }}
                    >
                        <Typography
                            sx={{
                                '&.MuiTypography-root': {
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    fontSize: '18px',
                                    lineHeight: '25px',
                                },
                                ml: '32px',
                                color: 'text.primary',
                            }}
                        >
                            Присоедениться
                        </Typography>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                color: "text.primary",
                                bgcolor: "secondary.main",
                                height: "46px",
                                width: "46px",
                                borderRadius: '50%',
                                ml: 'auto',
                                mr: '0px',
                            }}
                        >
                            <ArrowForwardIcon />
                        </Stack>
                    </Button>
                </Stack >
            </Paper>

        </Box>

    );
}

export default MainLabel