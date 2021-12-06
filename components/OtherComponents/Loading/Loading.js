import React from 'react';
import { Grid, Typography, useMediaQuery, Box, useTheme } from '@mui/material';
import Image from 'next/image'
import { motion } from "framer-motion"

const Loading = () => {
    const theme = useTheme();
    const isDarkTheme = useMediaQuery("(prefers-color-scheme: dark)")

    return (
        <Grid
            component={motion.div}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'absolute', height: "100vh", width: '100vw', zIndex: 99999, bgcolor: isDarkTheme ? "#424242" : '#fafafa', }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <Typography sx={{ color: isDarkTheme ? "#fafafa" : '#424242', cursor: 'default' }} variant='h3' noWrap>Ξffect</Typography>
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {isDarkTheme && <Image
                    alt="alt"
                    src={"/loaderWhite.gif"}
                    quality={90}
                    width={96}
                    height={96}
                    priority
                />}
                {!isDarkTheme && <Image
                    alt="alt"
                    src={"/loaderDark.gif"}
                    quality={90}
                    width={96}
                    height={96}
                    priority
                />}
            </Box>
        </Grid>
    );
};

export default Loading;
