/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, Stack, Tooltip, IconButton, MenuList, ListItemText, useMediaQuery } from '@mui/material';
import Image from "next/image";
import PlusOneIcon from '@mui/icons-material/PlusOne';

import { useSnackbar } from 'notistack';


const Home = inject('rootStore')(observer(({ rootStore }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                    // p: 1
                }}
            >
                Главная
            </Typography>
            <Tooltip arrow title="Создать профиль">
                <IconButton
                    // disableRipple
                    sx={{
                        height: 36,
                        width: 36,
                    }}
                    onClick={() => enqueueSnackbar('Эту функцию мы ещё только разрабатываем', {
                        variant: 'info',
                    })}
                >
                    <PlusOneIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    )
}));

export default Home;