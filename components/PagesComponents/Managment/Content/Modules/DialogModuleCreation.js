import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import clsx from 'clsx';
import { Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';


import { inject, observer } from 'mobx-react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import StepOne from './DialogModuleCreation/StepOne';
import StepTwo from './DialogModuleCreation/StepTwo';
import StepThree from './DialogModuleCreation/StepThree';


const DialogModuleCreation = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Dialog
            sx={{
                zIndex: "10 !important",
                width: '100vw',
                height: '100vh',
            }}
            fullScreen
            open={managmentStore.moduleCreationList.dialogOpen}
            onClose={() => managmentStore.setModuleCreationList("dialogOpen", false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <AppBar sx={{
                position: 'relative',
                zIndex: 1,
            }}>
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid>
                            <Typography> Создание модуля </Typography>
                        </Grid>
                        <Grid>
                            <Tooltip title="Сохранить">
                                <IconButton onClick={() => managmentStore.saveModule()} size="large">
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Закрыть. Перед закрытием сохраните, иначе прогресс будет потерян">
                                <IconButton
                                    onClick={() => managmentStore.setModuleCreationList("dialogOpen", false)}
                                    size="large">
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            sx={{
                                marginLeft: "auto",
                            }}>
                            <Button sx={{
                                marginLeft: 0.5,
                                marginRight: 0.5,
                                color: 'text.main',
                            }} onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Назад
                            </Button>
                            <Button sx={{
                                marginLeft: 0.5,
                                marginRight: 0.5,
                                color: 'text.main',
                            }} onClick={handleNext} disabled={activeStep === 2}>
                                Вперёд
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* <DialogTitle id="scroll-dialog-title">

            </DialogTitle> */}
            <DialogContent sx={{
                margin: 0,
                padding: 0,
                bgcolor: 'background.1',
                zIndex: 1,
            }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    {activeStep == 0 && <StepOne />}
                    {activeStep == 1 && <StepTwo />}
                    {activeStep == 2 && <StepThree />}

                </Grid>
            </DialogContent>
        </Dialog >
    );
}));

export default DialogModuleCreation