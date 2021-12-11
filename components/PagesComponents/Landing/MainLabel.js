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
            <Box
                sx={{
                    position: 'absolute',
                    top: -100,
                    left: 0,
                    width: "256px",
                    height: "256px",
                }}
            >
                <Image
                    alt="alt"
                    src={"/landing/violetShadow.svg"}
                    quality={100}
                    width={256}
                    height={256}
                />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: -100,
                    right: 0,
                    width: "256px",
                    height: "256px",
                }}
            >
                <Image
                    alt="alt"
                    src={"/landing/blueShadow.svg"}
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
                    zIndex: 10,
                    mt: "20px",
                    width: mobile ? 'calc(100% - 32px)' : 'calc(100% - 200px)',
                    ml: mobile ? "16px" : "100px",
                    mr: mobile ? "16px" : "100px",
                    boxShadow: "0px 24px 65px 0px rgba(29, 99, 255, 0.05)",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 100%)",
                    borderRadius: "20px",
                    minHeight: '431px',
                    position: 'relative',
                }}
            >

                <Box
                    sx={{
                        position: 'absolute',
                        top: -8,
                        right: 52,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/landing/BookmarkBlue.svg"}
                        quality={100}
                        width={38}
                        height={46}
                    />
                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        bottom: -40,
                        left: -40,
                        transform: "rotate(-10.58deg)",
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/landing/Hope.svg"}
                        quality={100}
                        width={126}
                        height={126}
                    />
                </Box>
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
                    variant="OpenSans400MainLabel"
                    sx={{
                        '&.MuiTypography-root': {
                            color: '#555569',
                            textAlign: 'center',
                            p: 2,
                        },
                        fontSize: {
                            sm: '16px',
                            md: '18px',
                            lg: '20px',
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
                            bgcolor: '#1D63FF',
                            borderRadius: '88px',
                            boxShadow: "0px 9px 22px -3px rgba(29, 99, 255, 0.4)",
                            '&:hover': {
                                bgcolor: '#1D63FF',
                            },
                        },
                        mt: '50px',
                        mb: '60px',
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
                        }}
                    >
                        Присоедениться
                    </Typography>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            color: "#1D63FF",
                            bgcolor: "#FFDB1D",
                            height: "46px",
                            width: "46px",
                            borderRadius: '50%',
                            ml: 'auto',
                            mr: '0px',
                        }}
                    >
                        <Image
                            alt="alt"
                            src={"/icons/ArrowRight.svg"}
                            quality={100}
                            width={24}
                            height={24}
                        />
                    </Stack>
                </Button>
            </Stack >
        </Box>

    );
}

export default MainLabel