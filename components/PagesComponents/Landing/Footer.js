/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useRouter } from "next/router"
import Image from "next/image";
import { motion } from "framer-motion"
import { useMediaQuery, Link, Grid, Box, Typography, Container, IconButton } from "@mui/material";
import TermsOfUse from "./TermsOfUse";

function Footer() {
    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down("md"));

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(0);

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            sx={{
                width: "calc(100vw - 8px)",
                minHeight: mobile ? "325px" : "128px",
                bgcolor: "primary.main",
                mt: "100px",
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
                        width: "100%",
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
                            <Link sx={{ color: "text.primary", cursor: "pointer" }}> Наш блог </Link>
                            <Link sx={{ color: "text.primary", ml: 1.5, cursor: "pointer" }}> Справочник </Link>
                            <Link onClick={() => router.push(`/support`)} sx={{ color: "text.primary", ml: 1.5, cursor: "pointer" }}> Поддержка </Link>
                            <Link sx={{ color: "text.primary", ml: 1.5, cursor: "pointer" }}> Приложение </Link>
                        </Grid>
                        <Grid item
                            sx={{
                                ml: "auto", mr: 1
                            }}
                        >
                            <Typography sx={{ cursor: "default", }}> Социальные сети  </Typography>
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
                            <Typography> © 2022 xieffect.ru  </Typography>
                            <Link
                                sx={{ color: "text.primary", ml: 1.5, cursor: "pointer" }}
                                onClick={() => {
                                    setType(0)
                                    setOpen(true)
                                }}>
                                Пользовательское соглашение
                            </Link>
                            <Link
                                sx={{ color: "text.primary", ml: 1.5, cursor: "pointer" }}
                                onClick={() => {
                                    setType(1)
                                    setOpen(true)
                                }}>
                                Лицензионное соглашение
                            </Link>

                        </Grid>
                        <TermsOfUse open={open} setOpen={setOpen} type={type} />

                        <Grid item
                            sx={{
                                ml: "auto", mr: 1
                            }}
                        >
                            <IconButton onClick={() => window.open("https://discord.gg/aNQfXXb")}>
                                <Image
                                    alt="alt"
                                    src="/assets/landing/DiscordLogoWhite.svg"
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
                        width: "100%",
                    }}
                >
                    <Link sx={{ color: "text.primary", cursor: "pointer" }}> Наш блог </Link>
                    <Link sx={{ color: "text.primary", mt: 1, cursor: "pointer" }}> Справочник </Link>
                    <Link sx={{ color: "text.primary", mt: 1, cursor: "pointer" }}> Поддержка </Link>
                    <Link sx={{ color: "text.primary", mt: 1, cursor: "pointer" }}> Приложение </Link>
                    <Typography sx={{ mt: 2, cursor: "default", }}> Социальные сети  </Typography>
                    <IconButton sx={{ mt: 1 }} onClick={() => window.open("https://discord.gg/aNQfXXb")}>
                        <Image
                            alt="alt"
                            src="/assets/landing/DiscordLogoWhite.svg"
                            quality={100}
                            width={32}
                            height={32}
                        />
                    </IconButton>
                    <Link sx={{ color: "text.primary", mt: 2, cursor: "pointer" }}>  Пользовательское соглашение </Link>
                    <Link sx={{ color: "text.primary", mt: 1, cursor: "pointer" }}> Лицензионное соглашение</Link>
                    <Typography sx={{ mt: 3 }}> © 2022 xieffect.ru  </Typography>
                </Grid>}
            </Container>
        </Box>

    );

}

export default Footer;