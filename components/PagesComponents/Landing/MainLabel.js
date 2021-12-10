import React from 'react';
import { useRouter } from 'next/router'
import Image from "next/image";
import { motion } from "framer-motion"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


const MainLabel = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


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
                    width: 'calc(100% - 200px)',
                    ml: "100px",
                    mr: "100px",
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
                    variant="h1"
                    sx={{
                        '&.MuiTypography-root': {
                            color: '#272731',
                            fontFamily: 'Open Sans',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            fontSize: '60px',
                            lineHeight: '71px',
                            letterSpacing: '-1%',
                            textAlign: 'center',
                            p: 2,
                        }
                    }}
                >
                    Effect - платформа путеводитель в мире знаний
                </Typography>
                <Typography
                    variant="subtitle"
                    sx={{
                        '&.MuiTypography-root': {
                            color: '#555569',
                            fontFamily: 'Open Sans',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            fontSize: '20px',
                            lineHeight: '27px',
                            textAlign: 'center',
                            p: 2,
                        }
                    }}
                >
                    Делитесь своим опытом и изучайте новое в одном месте
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