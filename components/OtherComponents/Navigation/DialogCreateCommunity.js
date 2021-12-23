/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, Step, Stepper, Radio, StepLabel, StepContent, FormControl, InputLabel, Input, InputBase, MenuItem, Select, DialogTitle, DialogContent, DialogActions, Link, useTheme, IconButton, Tooltip, Drawer, Stack, Typography, Container } from "@mui/material";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CommunityType = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, uiStore, handleNext }) => {

        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography
                    sx={{
                        ml: 4
                    }}
                >
                    Сообщество - место, где вы ... ... ... ... ... ... ... ... ... ...
                </Typography>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: 96,
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 8,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/AdvancedCustomization.svg"}
                                quality={100}
                                width={100}
                                height={100}
                            />
                        </Box>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                mr: 'auto',
                            }}
                        >
                            <Typography
                                variant="Roboto500XiLabel"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: 24
                                }}
                            >
                                Пустой шаблон
                            </Typography>
                            <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Здесь нет каких-либо базовых настроек, иногда, это полезно
                            </Typography>
                        </Stack>
                        <ArrowForwardIcon sx={{ color: 'text.primary', ml: 'auto', mr: 1 }} fontSize="large" />
                    </Stack>
                </Button>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: 96,
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 8,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/Professor.svg"}
                                quality={100}
                                width={100}
                                height={100}
                            />
                        </Box>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                mr: 'auto',
                            }}
                        >
                            <Typography
                                variant="Roboto500XiLabel"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: 24
                                }}
                            >
                                Для Репетиторов
                            </Typography>
                            <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Идеальное место для взаимодействия с вашими учениками
                            </Typography>
                        </Stack>
                        <ArrowForwardIcon sx={{ color: 'text.primary', ml: 'auto', mr: 1 }} fontSize="large" />
                    </Stack>
                </Button>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: 96,
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 8,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/Connecting.svg"}
                                quality={100}
                                width={100}
                                height={100}
                            />
                        </Box>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                mr: 'auto',
                            }}
                        >
                            <Typography
                                variant="Roboto500XiLabel"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: 24
                                }}
                            >
                                Для Учебных групп
                            </Typography>
                            <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Учиться вместе гораздо интереснее! Не так ли?)
                            </Typography>
                        </Stack>
                        <ArrowForwardIcon sx={{ color: 'text.primary', ml: 'auto', mr: 1 }} fontSize="large" />
                    </Stack>
                </Button>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: 96,
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 8,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/Classroom.svg"}
                                quality={100}
                                width={100}
                                height={100}
                            />
                        </Box>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                mr: 'auto',
                            }}
                        >
                            <Typography
                                variant="Roboto500XiLabel"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: 24
                                }}
                            >
                                Для образовательных организаций
                            </Typography>
                            <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Технологии в сфере образования делают мир лучше
                            </Typography>
                        </Stack>
                        <ArrowForwardIcon sx={{ color: 'text.primary', ml: 'auto', mr: 1 }} fontSize="large" />
                    </Stack>
                </Button>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        pt: 2,
                    }}
                >
                    <Typography
                        textAlign={'center'}
                        sx={{
                            width: 400,
                            color: 'text.secondary',
                        }}
                    >
                        Выберите шаблон для вашей организаций, это поможет быстрее начать работать
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
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography
                    sx={{
                        ml: 4
                    }}
                >
                    Выберите функции, которые нужны вам
                </Typography>
                
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        width: '100%',
                        pt: 2,
                    }}
                >
                    <Typography
                        textAlign={'center'}
                        sx={{
                            width: 400,
                            color: 'text.secondary',
                        }}
                    >
                        В дальнейшем этот набор функций можно будет изменить и подробнее настроить
                    </Typography>
                </Stack>
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
                maxWidth="md"
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    // spacing={2}
                    sx={{
                        height: 64,
                        width: '100%',
                        p: 1,
                    }}
                >
                    <Typography sx={{ mt: 2, ml: 2, mr: 'auto' }} variant="h5">
                        Создание сообщества
                    </Typography>
                    <IconButton sx={{ color: 'text.secondary', ml: 'auto', mt: 2, mr: 1 }} onClick={() => setOpenDialogCC(false)}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <DialogContent>
                    {activeStep === 0 && <CommunityType handleNext={handleNext} />}
                    {activeStep === 1 && <CommunityFunctions handleNext={handleNext} />}
                </DialogContent>
            </Dialog >
        );
    })
);

export default DialogCreateCommunity;