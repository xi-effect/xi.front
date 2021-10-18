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

import StepOne from './DialogPageCreation/StepOne';
import StepTwo from './DialogPageCreation/StepTwo';
import StepThree from './DialogPageCreation/StepThree';

const PREFIX = 'DialogPageCreation';

const classes = {
    button: `${PREFIX}-button`,
    mobileStepper: `${PREFIX}-mobileStepper`,
    icon: `${PREFIX}-icon`,
    mainLabel: `${PREFIX}-mainLabel`,
    appBar: `${PREFIX}-appBar`,
    title: `${PREFIX}-title`,
    gridMain: `${PREFIX}-gridMain`,
    gridMainStepFour: `${PREFIX}-gridMainStepFour`,
    stepLabel: `${PREFIX}-stepLabel`,
    stepSecondLabel: `${PREFIX}-stepSecondLabel`,
    input: `${PREFIX}-input`,
    FormControl: `${PREFIX}-FormControl`,
    categoryLabel: `${PREFIX}-categoryLabel`,
    inputAddModule: `${PREFIX}-inputAddModule`,
    noOneModuleLabel: `${PREFIX}-noOneModuleLabel`,
    gridListItem: `${PREFIX}-gridListItem`,
    divider: `${PREFIX}-divider`,
    dialog: `${PREFIX}-dialog`,
    dialogTitle: `${PREFIX}-dialogTitle`,
    dialogContent: `${PREFIX}-dialogContent`,
    dialogContentText: `${PREFIX}-dialogContentText`,
    dialogActions: `${PREFIX}-dialogActions`
};

const StyledDialog = styled(Dialog)((
    {
        theme
    }
) => ({
    [`& .${classes.button}`]: {
        marginLeft: 4,
        marginRight: 4,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.mobileStepper}`]: {
        marginLeft: "auto",
        // width: "100%",
        color: theme => theme.palette.primary.contrastText,
        backgroundColor: theme => theme.palette.primary.main,
    },

    [`& .${classes.icon}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.mainLabel}`]: {
        fontSize: 20,
    },

    [`& .${classes.appBar}`]: {
        position: 'relative',
        zIndex: 1,
    },

    [`& .${classes.title}`]: {
        marginLeft: theme => theme.spacing(2),
        flex: 1,
    },

    [`& .${classes.gridMain}`]: {
        margin: 0,
        padding: 0,
        height: '100%',
        // width: 'calc(100vw-48px)',
    },

    [`& .${classes.gridMainStepFour}`]: {
        margin: 0,
        padding: 0,
        // width: '100vw',
        // marginTop: "-20px",
        // marginLeft: "-24px",
    },

    [`& .${classes.stepLabel}`]: {
        fontSize: 24,
        cursor: 'default',
    },

    [`& .${classes.stepSecondLabel}`]: {
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.input}`]: {
        width: "calc(100% - 64px)",
        // height: "32px",
        margin: 16,
    },

    [`& .${classes.FormControl}`]: {
        width: "calc(100% - 64px)",
        // height: "32px",
        margin: 16,
    },

    [`& .${classes.categoryLabel}`]: {
        paddingTop: 12,
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.inputAddModule}`]: {
        minWidth: "256px",
        // height: "32px",
        margin: 16,
    },

    [`& .${classes.noOneModuleLabel}`]: {
        paddingTop: 8,
        paddingLeft: 20,
    },

    [`& .${classes.gridListItem}`]: {
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 4,
        // borderRadius: 8,
        // border: `${theme.main.palette.content.border} solid 2px`,
        // '&:hover': {
        //     border: `${theme.main.palette.content.border} solid 2px`,
        // },
    },

    [`& .${classes.divider}`]: {
        marginTop: '-4px',
        color: theme => theme.palette.primary.contrastText,
        width: '100%',
        height: '2px',
    },

    [`& .${classes.dialog}`]: {
        zIndex: "10 !important",
        width: '100vw',
        height: '100vh',
    },

    [`& .${classes.dialogTitle}`]: {
        backgroundColor: theme => theme.palette.blueGrey["6"],
        color: theme => theme.palette.primary.contrastText,
        zIndex: 1,
    },

    [`& .${classes.dialogContent}`]: {
        margin: 0,
        padding: 0,
        backgroundColor: theme => theme.palette.blueGrey["6"],
        zIndex: 1,
    },

    [`& .${classes.dialogContentText}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.dialogActions}`]: {
        backgroundColor: theme => theme.palette.blueGrey["6"],
        zIndex: 1,

    }
}));


const DialogPageCreation = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore }) => {
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
            className={classes.dialog}
            fullScreen
            open={managmentStore.pageCreationList.dialogOpen}
            onClose={() => managmentStore.setPageCreationList("dialogOpen", false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Grid>
                            <Typography className={classes.mainLabel}> Создание страницы </Typography>
                        </Grid>
                        <Grid>
                            <Tooltip title="Сохранить">
                                <IconButton onClick={() => managmentStore.savePage()} size="large">
                                    <SaveIcon className={classes.icon} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Закрыть. Перед закрытием сохраните, иначе прогресс будет потерян">
                                <IconButton
                                    onClick={() => managmentStore.setPageCreationList("dialogOpen", false)}
                                    size="large">
                                    <CloseIcon className={classes.icon} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <MobileStepper
                            variant="dots"
                            steps={3}
                            sx={{
                                '& .MuiMobileStepper-dotActive': {
                                    color: theme => theme.palette.primary.contrastText,
                                    backgroundColor: theme => theme.palette.primary.contrastText,
                                },
                            }}
                            position="static"
                            activeStep={activeStep}
                            className={classes.mobileStepper}
                            nextButton={
                                <Button className={classes.button} onClick={handleNext} disabled={activeStep === 2}>
                                    Вперёд
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft />
                                    ) : (
                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button className={classes.button} onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />
                                    )}
                                    Назад
                                </Button>
                            }
                        />
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* <DialogTitle id="scroll-dialog-title">

            </DialogTitle> */}
            <DialogContent className={classes.dialogContent}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    className={clsx(classes.gridMain, {
                        [classes.gridMainStepFour]: activeStep == 1,
                    })}
                >
                    {activeStep == 0 && <StepOne />}
                    {activeStep == 1 && <StepTwo />}
                    {activeStep == 2 && <StepThree />}

                </Grid>
            </DialogContent>
            {/* <DialogActions className={classes.dialogActions}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <MobileStepper
                        variant="dots"
                        steps={3}
                        position="static"
                        activeStep={activeStep}
                        className={classes.mobileStepper}
                        nextButton={
                            <Button className={classes.button} onClick={handleNext} disabled={activeStep === 2}>
                                Вперёд
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button className={classes.button} onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Назад
                            </Button>
                        }
                    />
                </Grid>
            </DialogActions> */}
        </Dialog >
    );
}));

export default DialogPageCreation