/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, useTheme, Tab, Tabs, Radio, Switch, Button, Chip, FormControl, InputLabel, Input, Dialog, DialogContent, Stack, Tooltip, Box, IconButton, Popper, Grow, MenuList, Paper, ClickAwayListener, Divider, ListItemIcon, ListItemText, useMediaQuery, Container, DialogActions } from '@mui/material';
import Image from "next/image";

import CloseIcon from '@mui/icons-material/Close';
import UndoIcon from '@mui/icons-material/Undo';
import { useSnackbar } from 'notistack';
import QRCode from "react-qr-code";
import PropTypes from 'prop-types';

const DialogInvite = inject('rootStore')(observer(({ rootStore, openDialogInvite, setOpenDialogInvite }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));
    const [step, setStep] = React.useState(0);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialogInvite ?? false}
            onClose={() => setOpenDialogInvite(false)}
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
                    Создать приглешние в сообщество
                </Typography>
                <Tooltip title="Назад">
                    <span>
                        <IconButton sx={{ color: 'text.secondary', ml: 'auto', mt: 2, mr: 1 }}>
                            <UndoIcon />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title="Закрыть">
                    <IconButton sx={{ color: 'text.secondary', ml: 1, mt: 2, mr: 1 }} onClick={() => setOpenDialogInvite(false)}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
            <DialogContent>
                {step === 0 && <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        height: 660,
                        width: '100%',
                    }}
                >
                    <FormControl
                        fullWidth
                        sx={{
                            mt: 0,
                            pl: 1,
                            pr: 1,
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography sx={{ color: "text.primary" }}>
                                Лимит использования приглашения
                            </Typography>
                        </InputLabel>
                        <Input
                            sx={{ width: "100%", }}
                            label="Лимит использования приглашения"
                            type={"text"}
                        />
                    </FormControl>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            p: 2,
                            width: '100%',
                        }}
                    >
                        {[1, 5, 15, 30, 100, "Без лимита"].map((item, index) => (
                            <Chip
                                clickable
                                key={index.toString()}
                                onClick={null}
                                variant="filled"
                                // color="inherit"
                                label={item}
                                sx={{

                                    // height: 30,
                                    // width: 30,
                                    // borderRadius: 2,
                                    // border: '4px solid'
                                }}
                            />
                        ))}
                    </Stack>
                    <FormControl
                        fullWidth
                        sx={{
                            mt: 1,
                            pl: 1,
                            pr: 1,
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography sx={{ color: "text.primary" }}>
                                Время действия приглашения
                            </Typography>
                        </InputLabel>
                        <Input
                            sx={{ width: "100%", }}
                            label="Время действия приглашения"
                            type={"text"}
                        />
                    </FormControl>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            p: 2,
                            width: '100%',
                        }}
                    >
                        {["1 день", "3 дня", "1 месяц", "Без ограничений"].map((item, index) => (
                            <Chip
                                clickable
                                key={index.toString()}
                                onClick={null}
                                variant="filled"
                                // color="inherit"
                                label={item}
                                sx={{

                                    // height: 30,
                                    // width: 30,
                                    // borderRadius: 2,
                                    // border: '4px solid'
                                }}
                            />
                        ))}
                    </Stack>
                    <Typography
                        sx={{
                            pt: 2,
                            pl: 2,
                            width: '100%',
                        }}
                    >
                        Роль пользователя, которого вы приглашаете:
                    </Typography>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{
                            p: 2,
                            width: '100%',
                        }}
                    >
                        {["Администратор", "Модератор", "Учитель", "Ученик"].map((item, index) => (
                            <Chip
                                clickable
                                key={index.toString()}
                                onClick={null}
                                variant="filled"
                                // color="inherit"
                                label={item}
                                sx={{

                                    // height: 30,
                                    // width: 30,
                                    // borderRadius: 2,
                                    // border: '4px solid'
                                }}
                            />
                        ))}
                    </Stack>
                    <Button
                        onClick={() => setStep(1)}
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
                                mt: 'auto',
                            },
                        }}
                    >
                        Создать приглашение
                    </Button>
                </Stack>}
                {step === 1 && <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        height: 660,
                        width: '100%',
                    }}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height: 600,
                            width: 600,
                            bgcolor: '#FFF',
                        }}
                    >
                        <QRCode size={512} value={"123456"} />
                    </Stack>
                    <Button
                        onClick={() => setStep(0)}
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
                                mt: 'auto',
                            },
                        }}
                    >
                        Вернуться к настройкам
                    </Button>
                </Stack>}
            </DialogContent>
        </Dialog >
    )
}));

export default DialogInvite;