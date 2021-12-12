import React from 'react';
import { useRouter } from 'next/router'
import Image from "next/image";
import { motion } from "framer-motion"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography, Container, IconButton } from '@mui/material';


const Footer = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));


    return (
        <Box
            sx={{
                width: 'calc(100vw - 8px)',
                minHeight: mobile ? '325px' : '128px',
                // height: '100%',
                bgcolor: 'primary.main',
                // position: 'absolute',
                // bottom: '-210px',
                mt: '100px',
                zIndex: 0,
            }}
        >
            <Container>
                {!mobile && <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        maxWidth: 1920,
                        p: 2,
                        width: '100%',
                    }}
                >
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            height: 48,
                        }}
                    >
                        <Grid item>
                            <Link sx={{ color: 'text.primary', cursor: 'pointer' }}> Наш блог </Link>
                            <Link sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}> Справочник </Link>
                            <Link sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}> Поддержка </Link>
                            <Link sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}> Приложение </Link>
                        </Grid>
                        <Grid item
                            sx={{
                                ml: 'auto', mr: 1
                            }}
                        >
                            <Typography> Социальные сети  </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            height: 48,
                        }}
                    >
                        <Grid
                            item
                            container
                            direction="row"
                            sx={{
                                maxWidth: 700,
                            }}
                        >
                            <Typography> © 2022 xieffect.netlify.app  </Typography>
                            <Link sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}> Пользовательское соглашение </Link>
                            <Link sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}> Лицензионное соглашение </Link>
                        </Grid>
                        <Grid item
                            sx={{
                                ml: 'auto', mr: 1
                            }}
                        >
                            <IconButton onClick={() => window.open('https://discord.gg/aNQfXXb')}>
                                <Image
                                    alt="alt"
                                    src={"/landing/DiscordLogoWhite.svg"}
                                    quality={100}
                                    width={32}
                                    height={32}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>}
                {mobile && <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        maxWidth: 1920,
                        p: 2,
                        width: '100%',
                    }}
                >
                    <Link sx={{ color: 'text.primary', cursor: 'pointer' }}> Наш блог </Link>
                    <Link sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}> Справочник </Link>
                    <Link sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}> Поддержка </Link>
                    <Link sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}> Приложение </Link>
                    <Typography sx={{ mt: 2 }}> Социальные сети  </Typography>
                    <IconButton sx={{ mt: 1 }} onClick={() => window.open('https://discord.gg/aNQfXXb')}>
                        <Image
                            alt="alt"
                            src={"/landing/DiscordLogoWhite.svg"}
                            quality={100}
                            width={32}
                            height={32}
                        />
                    </IconButton>
                    <Link sx={{ color: 'text.primary', mt: 2, cursor: 'pointer' }}> Пользовательское соглашение </Link>
                    <Link sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}> Лицензионное соглашение </Link>
                    <Typography sx={{mt: 3}}> © 2022 xieffect.netlify.app  </Typography>
                </Grid>}
            </Container>
        </Box>
    );
}

export default Footer;