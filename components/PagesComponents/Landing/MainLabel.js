import React from 'react';
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


const MainLabel = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ zIndex: 1, p: 2, mt: 14, maxWidth: 1520, width: '100%', }}
        >
            <Typography
                variant="h4"
                sx={{
                fontWeight: 400,
                }}
            >
                Effect - платформа путеводитель в мире знаний
            </Typography>
            <Typography
                variant="subtitle"
                sx={{
                fontWeight: 400,
                mt: 2,
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
                    color: 'text.main',
                    fontWeight: 500,
                    mt: 5,
                }}
            >
                Зарегистрироваться
            </Button>
        </Stack>
    );
}

export default MainLabel