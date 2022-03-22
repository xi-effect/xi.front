import React from "react";
import { Grid, Typography, useMediaQuery, Stack, Box } from "@mui/material";
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { inject, observer } from "mobx-react"
import { useRouter } from 'next/router'

const Loading = inject("uiSt")(observer(({ uiSt }) => {
    const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)")
    const router = useRouter()

    return (
        <AnimatePresence>
            {uiSt.load.loading && <Grid
                component={motion.div}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ position: "absolute", height: "100vh", width: "100vw", zIndex: 99999, bgcolor: isDarkTheme ? "#26282B" : "#fafafa", }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 1, }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="baseline"
                >
                    <Typography
                        component="h1"
                        onClick={() => {
                            router.push({
                                pathname: "/",
                            })
                        }}

                        variant="Roboto500XiLabel"
                        sx={{
                            mt: "1px",
                            cursor: "pointer",
                            color: "secondary.main",
                            fontSize: {
                                sm: "28px",
                                md: "34px",
                                lg: "40px",
                            },
                        }}
                    >
                        Ξ
                    </Typography>
                    <Typography
                        component="h1"
                        onClick={() => {
                            router.push({
                                pathname: "/",
                            })
                        }}

                        variant="IBMPlexMono500XiLabelEnd"
                        sx={{
                            "&.MuiTypography-root": {
                                cursor: "pointer",
                                color: "secondary.main",
                            },
                            fontSize: {
                                sm: "28px",
                                md: "34px",
                                lg: "40px",
                            },
                        }}
                    >
                        ffect
                    </Typography>
                </Stack>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, }}
                >
                    {isDarkTheme && <Image
                        alt="alt"
                        src="/loaderForDarkTheme.gif"
                        quality={90}
                        width={96}
                        height={96}
                        priority
                    />}
                    {!isDarkTheme && <Image
                        alt="alt"
                        src="/loaderForWhiteTheme.gif"
                        quality={90}
                        width={96}
                        height={96}
                        priority
                    />}
                </Box>
            </Grid>}
        </AnimatePresence>
    )
}));

export default Loading;
