import React from 'react';
import { useRouter } from 'next/router'
import { motion } from "framer-motion"

import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';


const FunctionsTabs = () => {
    const theme = useTheme();

    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down('xl'));


    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ zIndex: 1, p: 2, mt: 4, maxWidth: 1520, width: '100%', }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 400,
                }}
            >
                Effect помогает эффективно получать знания и делиться ими в доступном формате
            </Typography>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <Button variant="text">
                    Авторам
                </Button>
                <Button variant="text">
                    Обучающимся
                </Button>
                <Button variant="text">
                    Организациям
                </Button>
            </Stack>
        </Stack>
    );
}

export default FunctionsTabs