import React from "react";
import { Grid, useMediaQuery, Box } from "@mui/material";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { inject, observer } from "mobx-react";
import XiLogo from "kit/XiLogo";

const Loading = inject("uiSt")(observer(({ uiSt }) => {
    const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)");

    return (
        <AnimatePresence>
            {uiSt.load.loading && <Grid
                component={motion.div}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ position: "fixed", height: '100vh', width: "100vw", zIndex: 99999, bgcolor: isDarkTheme ? "#26282B" : "#fafafa", overflow: "hidden" }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 1, }}
            >
                <XiLogo />
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
    );
}));

export default Loading;
