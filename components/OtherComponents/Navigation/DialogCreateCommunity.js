/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, Step, Stepper, Radio, StepLabel, StepContent, FormControl, InputLabel, Input, InputBase, MenuItem, Select, DialogTitle, DialogContent, DialogActions, Link, useTheme, IconButton, Tooltip, Drawer, Stack, Typography } from "@mui/material";
import Image from "next/image";


const CommunityType = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, uiStore }) => {

        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Box
                    sx={{
                        width: 128,
                        height: 128,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/landing/OnlineLearning.svg"}
                        quality={100}
                        width={128}
                        height={128}
                    />
                </Box>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Radio />
                    <Typography
                        variant="subtitle1"
                    >
                        Школа
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        width: 128,
                        height: 128,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/landing/OnlineLearning.svg"}
                        quality={100}
                        width={128}
                        height={128}
                    />
                </Box>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Radio />
                    <Typography
                        variant="subtitle1"
                    >
                        Школа
                    </Typography>
                </Stack>
            </Stack>
        );
    })
);

const CommunityFunctions = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, }) => {

        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography>
                    В данной форме мы хотели бы спросить вас о платформе.
                </Typography>
            </Stack>
        );
    })
);

const CommunityName = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, uiStore }) => {

        return (
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography>
                    Здесь вы можете рассказать о технической ошибке.
                </Typography>
                <Input
                    sx={{ backgroundColor: 'background.2', width: "100%", }}
                    type='text'
                    value={uiStore.reportData.errorDescription ?? ''}
                    onChange={(e) => uiStore.setReportData("errorDescription", e.target.value)}
                    multiline
                    maxRows={5}
                    placeholder="Опишите ошибку"
                />
                <Input
                    sx={{ backgroundColor: 'background.2', width: "100%", }}
                    type='text'
                    value={uiStore.reportData.sitePart ?? ''}
                    onChange={(e) => uiStore.setReportData("sitePart", e.target.value)}
                    multiline
                    maxRows={5}
                    placeholder="Укажите, в какой части сайта она произошла. Можно, скопировать url-адрес в это поле"
                />
                <Input
                    sx={{ backgroundColor: 'background.2', width: "100%", }}
                    type='text'
                    value={uiStore.reportData.errorRepeat ?? ''}
                    onChange={(e) => uiStore.setReportData("errorRepeat", e.target.value)}
                    multiline
                    maxRows={5}
                    placeholder="Расскажите о том, как появилась ошибка - что вы делали перед тем, как появилась ошибка или как её воспроизвести"
                />
                <Input
                    sx={{ backgroundColor: 'background.2', width: "100%", }}
                    type='text'
                    value={uiStore.reportData.deviceInfo ?? ''}
                    onChange={(e) => uiStore.setReportData("deviceInfo", e.target.value)}
                    multiline
                    maxRows={5}
                    placeholder="С какого устройства вы пользуетесь порталом? Также укажите браузер"
                />
            </Stack>
        );
    })
);

const steps = [
    {
        label: 'Тип сообщества',
    },
    {
        label: 'Функционал',
    },
    {
        label: 'Название Сообщества',
    },
];

const DialogCreateCommunity = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, uiStore, openDialogCC, setOpenDialogCC }) => {
        const router = useRouter();

        const [activeStep, setActiveStep] = React.useState(0);

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };


        return (
            <Dialog
                open={openDialogCC ?? false}
                onClose={() => setOpenDialogCC(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        height: 64,
                        width: '100%',
                        p: 1,
                    }}
                >
                    <Typography sx={{ mt: 2, ml: 2 }} variant="h5">
                        Создание сообщества
                    </Typography>
                </Stack>
                <DialogContent>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel>
                                    {step.label}
                                </StepLabel>
                                <StepContent>
                                    {activeStep === 0 && <CommunityType />}
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                variant="contained"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                {index === steps.length - 1 ? 'Завершить' : 'Вперёд'}
                                            </Button>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Назад
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'text.main' }} onClick={() => setOpenDialogCC(false)}>Отмена</Button>
                    <Button variant="contained" onClick={null} autoFocus>
                        Создать
                    </Button>
                </DialogActions>
            </Dialog >
        );
    })
);

export default DialogCreateCommunity;