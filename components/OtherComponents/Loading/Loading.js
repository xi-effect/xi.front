import React from 'react';
import { Grid, Typography, useMediaQuery, Box, useTheme } from '@mui/material';
import Image from 'next/image'
import { motion, AnimatePresence } from "framer-motion"
import { inject, observer } from 'mobx-react'

const Loading = inject('uiStore')(observer(({ uiStore }) => {
    const theme = useTheme();
    const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)")

    return (
        <AnimatePresence>
            {uiStore.load.loading && <Grid
                component={motion.div}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ position: 'absolute', height: "100vh", width: '100vw', zIndex: 99999, bgcolor: isDarkTheme ? "#424242" : '#fafafa', }}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 1, }}
            >
                <Typography sx={{ color: isDarkTheme ? "#fafafa" : '#424242', cursor: 'default' }} variant='h3' noWrap>Ξffect</Typography>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2, }}
                >
                    {isDarkTheme && <Image
                        alt="alt"
                        src={"/loaderWhite.gif"}
                        quality={90}
                        width={96}
                        height={96}
                        prirotiy
                    />}
                    {!isDarkTheme && <Image
                        alt="alt"
                        src={"/loaderDark.gif"}
                        quality={90}
                        width={96}
                        height={96}
                        prirotiy
                    />}
                </Box>
            </Grid>}
        </AnimatePresence>
    )
}));

export default Loading;
