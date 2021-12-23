/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, Step, Checkbox, Stepper, Radio, StepLabel, StepContent, FormControl, InputLabel, Input, InputBase, MenuItem, Select, DialogTitle, DialogContent, DialogActions, Link, useTheme, IconButton, Tooltip, Drawer, Stack, Typography, Container } from "@mui/material";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UndoIcon from '@mui/icons-material/Undo';

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
                    textAlign={'center'}
                    sx={{
                        ml: 4
                    }}
                >
                    Сообщество - место, где вы можете безопасно учить и учиться, используя цифровые технологии в процессе образования
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
                        Выберите шаблон для вашей организаций, это поможет быстрее начать учёбу
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
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Typography
                    textAlign={'center'}
                    sx={{
                        ml: 4
                    }}
                >
                    Сообщество - место, где вы можете безопасно учить и учиться, используя цифровые технологии в процессе образования
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
                        Выберите шаблон для вашей организаций, это поможет быстрее начать учёбу
                    </Typography>
                </Stack>
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
                sx={{
                    // height: '100%'
                }}
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
                    <Tooltip title="Назад">
                        <span>
                            <IconButton disabled={activeStep === 0} onClick={handleBack} sx={{ color: 'text.secondary', ml: 'auto', mt: 2, mr: 1 }}>
                                <UndoIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip title="Закрыть">
                        <IconButton sx={{ color: 'text.secondary', ml: 1, mt: 2, mr: 1 }} onClick={() => setOpenDialogCC(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <DialogContent>
                    <Box
                        sx={{
                            height: 570,
                            width: '100%',
                        }}
                    >
                        <AnimatePresence initial={false} exitBeforeEnter>
                            {activeStep === 0 && <Box
                                key='filter'
                                component={motion.div}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6, delay: 0, }}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    // position: 'absolute',
                                }}
                            >
                                <CommunityType handleNext={handleNext} />
                            </Box>}
                            {activeStep === 1 && <Box
                                key='day'
                                component={motion.div}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6, delay: 0, }}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    // position: 'absolute',
                                }}
                            >
                                <CommunityName handleNext={handleNext} />
                            </Box>}
                        </AnimatePresence>
                    </Box>

                </DialogContent>
            </Dialog >
        );
    })
);

export default DialogCreateCommunity;