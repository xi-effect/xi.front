/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, DialogContent, DialogActions, Stack, Typography } from "@mui/material";

const InfoPage = inject(
    "rootStore",
    "knowledgeSt",
    "uiSt",
)(
    observer(({ knowledgeSt }) => (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        // spacing={2}
        >
            <Typography
                variant="subtitle1"
                sx={{
                    color: "text.secondary"
                }}
            >
                Страница
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.page.name}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    mt: 1,
                    color: "text.secondary"
                }}
            >
                Описание
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.page.description}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    mt: 1,
                    color: "text.secondary"
                }}
            >
                Тема
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.page.theme}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    mt: 1,
                    color: "text.secondary"
                }}
            >
                Тип
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.page.kind}
            </Typography>
        </Stack>
    ))
);

const InfoModule = inject(
    "rootStore",
    "knowledgeSt",
    "uiSt",
)(
    observer(({ knowledgeSt }) => (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
        >
            <Typography
                variant="subtitle1"
                sx={{
                    color: "text.secondary"
                }}
            >
                Страница
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.module.name}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    mt: 1,
                    color: "text.secondary"
                }}
            >
                Описание
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.module.description}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    mt: 1,
                    color: "text.secondary"
                }}
            >
                Тема
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.module.theme}
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    mt: 1,
                    color: "text.secondary"
                }}
            >
                Тип
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "text.main"
                }}
            >
                {knowledgeSt.module.type}
            </Typography>
        </Stack>
    ))
);


const InfoDialog = inject(
    "rootStore",
    "knowledgeSt",
    "uiSt",
)(
    observer(({ openDialog, setOpenDialog }) => {
        const router = useRouter();

        return (
            <Dialog
                open={openDialog ?? false}
                onClose={() => setOpenDialog(false)}
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
                        width: "100%",
                        p: 1,
                    }}
                >
                    <Typography sx={{ mt: 2, ml: 2 }} variant="h5">
                        Информация
                    </Typography>
                </Stack>
                <DialogContent>
                    <AnimatePresence>
                        {router.pathname.includes("/knowledge/page") &&
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <InfoPage />
                            </Box>}
                        {router.pathname.includes("/knowledge/module") &&
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <InfoModule />
                            </Box>}
                    </AnimatePresence>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setOpenDialog(false)} autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog >
        );
    })
);

export default InfoDialog;