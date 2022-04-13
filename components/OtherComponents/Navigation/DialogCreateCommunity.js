/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, useMediaQuery, TextField, DialogContent, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
    .object({
        name: yup.string().min(1).max(100).required(),
    })
    .required();

const CommunityName = inject(
    "rootStore",
    "uiSt",
    "communityCreationSt",
)(
    observer(({ communityCreationSt }) => {
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

        const {
            control,
            handleSubmit,
            trigger,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(schema),
        });

        const onSubmit = (data) => {
            trigger();
            communityCreationSt.createCommunity(data, trigger);
        };

        console.log("errors", errors);

        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                component="form" onSubmit={handleSubmit(onSubmit)}
            >
                <Box
                    sx={{
                        width: mobile ? 232 : 394,
                        height: mobile ? 232 : 394,
                        ml: 1,
                        mr: 1,
                    }}
                >
                    <Image
                        alt="alt"
                        src="/assets/app/RemoteMeeting.svg"
                        quality={100}
                        width={mobile ? 232 : 394}
                        height={mobile ? 232 : 394}
                    />
                </Box>
                <Typography
                    variant="h6"
                    textAlign="center"
                    sx={{
                        ml: 4
                    }}
                >
                    Теперь нужно придумать название для вашего сообщества
                </Typography>
                <Typography
                    variant="suntitle1"
                    textAlign="center"
                    sx={{
                        ml: 4,
                        color: "text.secondary",
                    }}
                >
                    Например, это может быть название школы, группы, класса
                </Typography>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField
                            variant="filled"
                            error={errors?.name?.type}
                            type="text"
                            fullWidth
                            label="Название сообщества"
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: 'common.white',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                    color: 'common.white',
                                },
                                '& .MuiFilledInput-root': {
                                    bgcolor: 'rgba(0, 0, 0, 0.09)',
                                },
                            }}
                            helperText={errors?.name?.type === "max" && "Максимальная длина названия сообщества - 100 символов"}
                            {...field}
                        />
                    )}
                />
                <Button
                    type="submit"
                    sx={{
                        "&.MuiButton-root": {
                            fontFamily: "Open Sans, sans-serif",
                            fontStyle: "normal",
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "25px",
                            boxShadow: 6,
                            width: "280px",
                            height: "48px",
                            color: "text.primary",
                            bgcolor: "secondary.main",
                            borderRadius: "88px",
                            "&:hover": {
                                bgcolor: "secondary.main",
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

const DialogCreateCommunity = inject()(
    observer(({ openDialogCC, setOpenDialogCC }) => {
        const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

        return (
            <Dialog
                open={openDialogCC ?? false}
                onClose={() => setOpenDialogCC(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                fullScreen={!!mobile}
                maxWidth="md"
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        height: 64,
                        width: "100%",
                        p: 1,
                    }}
                >
                    <Typography sx={{ mt: 2, ml: 2, mr: "auto" }} variant="h5">
                        Создание сообщества
                    </Typography>
                    <Tooltip title="Закрыть">
                        <IconButton sx={{ color: "text.secondary", ml: 1, mt: 2, mr: 1 }} onClick={() => setOpenDialogCC(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <DialogContent>
                    <Box
                        sx={{
                            height: mobile ? 500 : 660,
                            width: "100%",
                        }}
                    >
                        <AnimatePresence initial={false} exitBeforeEnter>
                            <Box
                                key="day"
                                component={motion.div}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6, delay: 0, }}
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <CommunityName />
                            </Box>
                        </AnimatePresence>
                    </Box>

                </DialogContent>
            </Dialog >
        );
    })
);

export default DialogCreateCommunity;