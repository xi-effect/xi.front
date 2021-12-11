import React from 'react';
import { useRouter } from 'next/router'
import { motion, LayoutGroup } from "framer-motion";

import { Stack, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

const menu = [
    'Авторам',
    'Ученикам',
    'Организациям',
]

const EffectFor = () => {

    const [tab, setTab] = React.useState(0)
    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ zIndex: 1, p: 2, mt: '330px', width: '100%', }}
        >
            <Box
                sx={{

                }}
            >
                <Typography
                    component={"h3"}
                    variant="IBMPlexSans700WhyLabel"
                    sx={{
                        color: '#272731',
                        textAlign: 'center',
                        width: '912px',
                    }}
                >
                    Effect помогает эффективно получать знания и делиться ими в доступном формате
                </Typography>
            </Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    width: '784px',
                    height: '80px',
                    mt: '80px',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 100%)',
                    boxShadow: '0px 24px 65px rgba(29, 99, 255, 0.05)',
                    borderRadius: '63px',
                }}
            >
                {menu.map((item, index) => (
                    <Stack
                        key={index.toString()}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => setTab(index)}
                        sx={{
                            color: tab === index ? '#FFFFFF' : '#555569',
                            background: tab === index ? '#1D63FF' : 'transparent',
                            boxShadow: tab === index ? '0px 3px 10px rgba(29, 99, 255, 0.5)' : 'none',
                            width: '232px',
                            height: '64px',
                            borderRadius: '88px',
                            fontFamily: 'Open Sans',
                            fontWeight: 600,
                            fontSize: '20px',
                            lineHeight: '27px',
                            mr: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        {item}
                    </Stack>
                ))}
            </Stack>
        </Stack >
    );
}

export default EffectFor;