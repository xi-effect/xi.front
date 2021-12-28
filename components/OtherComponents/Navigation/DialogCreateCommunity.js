/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, Step, Checkbox, Stepper, useMediaQuery, StepLabel, StepContent, FormControl, InputLabel, Input, InputBase, MenuItem, Select, DialogTitle, DialogContent, DialogActions, Link, useTheme, IconButton, Tooltip, Drawer, Stack, Typography, Container } from "@mui/material";
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import UndoIcon from '@mui/icons-material/Undo';
import QrReader from 'react-qr-scanner'

const CommunityType = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, uiStore, setActiveStep, handleNext }) => {
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Typography
                    textAlign={'center'}
                    sx={{
                    }}
                >
                    Сообщество - место, где вы можете безопасно учить и учиться, используя цифровые технологии в процессе образования
                </Typography>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: mobile ? 64 : 96,
                        bgcolor: 'primary.dark',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 4,
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
                                width: mobile ? 68 : 100,
                                height: mobile ? 68 : 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/AdvancedCustomization.svg"}
                                quality={100}
                                width={mobile ? 68 : 100}
                                height={mobile ? 68 : 100}
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
                                textAlign={'left'}
                                variant="h6"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: mobile ? 16 : 24
                                }}
                            >
                                Пустой шаблон
                            </Typography>
                            {!mobile && <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Здесь нет каких-либо базовых настроек, иногда, это полезно
                            </Typography>}
                        </Stack>
                        <ArrowForwardIcon sx={{ color: 'text.primary', ml: 'auto', mr: 1 }} fontSize="large" />
                    </Stack>
                </Button>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: mobile ? 64 : 96,
                        bgcolor: 'primary.dark',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 4,
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
                                width: mobile ? 68 : 100,
                                height: mobile ? 68 : 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/Professor.svg"}
                                quality={100}
                                width={mobile ? 68 : 100}
                                height={mobile ? 68 : 100}
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
                                textAlign={'left'}
                                variant="h6"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: mobile ? 16 : 24
                                }}
                            >
                                Репетиторам
                            </Typography>
                            {!mobile && <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Идеальное место для взаимодействия с вашими учениками
                            </Typography>}
                        </Stack>
                        <ArrowForwardIcon sx={{ color: 'text.primary', ml: 'auto', mr: 1 }} fontSize="large" />
                    </Stack>
                </Button>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: mobile ? 64 : 96,
                        bgcolor: 'primary.dark',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 4,
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
                                width: mobile ? 68 : 100,
                                height: mobile ? 68 : 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/Connecting.svg"}
                                quality={100}
                                width={mobile ? 68 : 100}
                                height={mobile ? 68 : 100}
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
                                textAlign={'left'}
                                variant="h6"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: mobile ? 16 : 24
                                }}
                            >
                                Учебным группам
                            </Typography>
                            {!mobile && <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Учиться вместе гораздо интереснее! Не так ли?)
                            </Typography>}
                        </Stack>
                        <ArrowForwardIcon sx={{ color: 'text.primary', ml: 'auto', mr: 1 }} fontSize="large" />
                    </Stack>
                </Button>
                <Button
                    onClick={() => handleNext(1)}
                    sx={{
                        width: '100%',
                        height: mobile ? 64 : 96,
                        bgcolor: 'primary.dark',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        },
                        borderRadius: 4,
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
                                width: mobile ? 68 : 100,
                                height: mobile ? 68 : 100,
                                ml: 1,
                                mr: 1,
                            }}
                        >
                            <Image
                                alt="alt"
                                src={"/app/Classroom.svg"}
                                quality={100}
                                width={mobile ? 68 : 100}
                                height={mobile ? 68 : 100}
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
                                textAlign={'left'}
                                variant="h6"
                                sx={{
                                    color: 'text.primary',
                                    fontSize: mobile ? 16 : 24
                                }}
                            >
                                Образовательным организациям
                            </Typography>
                            {!mobile && <Typography
                                textAlign={'left'}
                                sx={{
                                    color: 'text.secondary'
                                }}
                                variant="subtitle1"
                            >
                                Технологии в сфере образования делают мир лучше
                            </Typography>}
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
                <Button
                    onClick={() => setActiveStep(2)}
                    sx={{
                        '&.MuiButton-root': {
                            fontFamily: 'Open Sans, sans-serif',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '18px',
                            lineHeight: '25px',
                            boxShadow: 6,
                            width: '340px',
                            height: '48px',
                            color: 'text.primary',
                            bgcolor: 'secondary.main',
                            borderRadius: '88px',
                            '&:hover': {
                                bgcolor: 'secondary.main',
                            },
                            mt: 4,
                            mb: 2,
                        },
                    }}
                >
                    Присоедениться к сообществу
                </Button>
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
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
            >
                <Box
                    sx={{
                        width: mobile ? 256 : 420,
                        height: mobile ? 256 : 420,
                        ml: 1,
                        mr: 1,
                    }}
                >
                    <Image
                        alt="alt"
                        src={"/app/RemoteMeeting.svg"}
                        quality={100}
                        width={mobile ? 256 : 420}
                        height={mobile ? 256 : 420}
                    />
                </Box>
                <Typography
                    variant="h6"
                    textAlign={'center'}
                    sx={{
                        ml: 4
                    }}
                >
                    Теперь нужно придумать название для вашего сообщества
                </Typography>
                <Typography
                    variant="suntitle1"
                    textAlign={'center'}
                    sx={{
                        ml: 4,
                        color: 'text.secondary',
                    }}
                >
                    Например, это может быть название школы, группы, класса
                </Typography>
                <FormControl
                    fullWidth
                    sx={{
                        mt: -2,
                        pl: 1,
                        pr: 1,
                    }}
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                        <Typography sx={{ color: "text.primary" }}>
                            Название сообщества
                        </Typography>
                    </InputLabel>
                    <Input
                        sx={{ width: "100%", }}
                        label="Название сообщества"
                        type={"text"}
                    // endAdornment={
                    //     <InputAdornment sx={{ mr: 2 }} position="end">
                    //         <IconButton
                    //             aria-label="toggle password visibility"
                    //             onClick={() => setShowPassword(!showPassword)}
                    //             // onMouseDown={handleMouseDownPassword}
                    //             edge="end"
                    //             size="large"
                    //         >
                    //             {showPassword ? (
                    //                 <Visibility sx={{ color: "text.secondary" }} />
                    //             ) : (
                    //                 <VisibilityOff sx={{ color: "text.secondary" }} />
                    //             )}
                    //         </IconButton>
                    //     </InputAdornment>
                    // }
                    />
                </FormControl>
                <Button
                    sx={{
                        '&.MuiButton-root': {
                            fontFamily: 'Open Sans, sans-serif',
                            fontStyle: 'normal',
                            fontWeight: 600,
                            fontSize: '18px',
                            lineHeight: '25px',
                            boxShadow: 6,
                            width: '280px',
                            height: '48px',
                            color: 'text.primary',
                            bgcolor: 'secondary.main',
                            borderRadius: '88px',
                            '&:hover': {
                                bgcolor: 'secondary.main',
                            },
                            mt: 4,
                        },
                    }}
                >
                    Создать сообщество
                </Button>
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

const CommunityEnter = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, uiStore }) => {
        const [result, setResult] = React.useState("Код пока не найден")

        const handleScan = (data) => {
            console.log(data)
            setResult(data)
        }
        const handleError = (err) => {
            console.error(err)
        }

        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    // height: '100%'
                }}
            // spacing={2}
            >
                <Typography
                    variant="h6"
                    textAlign={'center'}
                    sx={{
                    }}
                >
                    Считайте QR-код, который вам дал администратор сообщества
                </Typography>
                <QrReader
                    // delay={10000}
                    style={{
                        height: 400,
                        width: '100%',
                    }}
                    facingMode="front"
                    legacyMode
                    onError={handleError}
                    onScan={handleScan}
                />
                <Typography
                    variant="subtitle1"
                    textAlign={'center'}
                    sx={{
                        color: 'text.secondary'
                    }}
                >
                    {result}
                </Typography>
            </Stack>
        );
    })
);

const DialogCreateCommunity = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, knowledgeStore, uiStore, openDialogCC, setOpenDialogCC }) => {
        const router = useRouter();
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

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
                fullScreen={mobile ? true : false}
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
                            height: mobile ? 500 : 660,
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
                                <CommunityType setActiveStep={setActiveStep} handleNext={handleNext} />
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
                            {activeStep === 2 && <Box
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
                                <CommunityEnter handleNext={handleNext} />
                            </Box>}
                        </AnimatePresence>
                    </Box>

                </DialogContent>
            </Dialog >
        );
    })
);

export default DialogCreateCommunity;