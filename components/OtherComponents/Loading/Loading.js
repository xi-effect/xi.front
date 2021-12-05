import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image'
import { motion } from "framer-motion"

const Loading = () => {
    const theme = useTheme();


    return (
        <Grid
            component={motion.div}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ position: 'absolute', height: "100vh", width: '100vw', zIndex: 99999, bgcolor: '#fff', }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
        >
            <Typography sx={{ color: '#000', cursor: 'default' }} variant='h3' noWrap>Ξffect</Typography>
            <Image
                alt="alt"
                src={"/loader.gif"}
                quality={100}
                width={96}
                height={96}
            />
        </Grid>
    );
};

export default Loading;
