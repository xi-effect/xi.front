/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, FormControl, InputLabel, Input, InputBase, MenuItem, Select, DialogTitle, DialogContent, DialogActions, Link, useTheme, IconButton, Tooltip, Drawer, Stack, Typography } from "@mui/material";


const ReportGeneral = inject(
    "rootStore",
    "knowledgeStore",
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
                    Здесь вы можете написать разработчикам. Это свободная форма.
                </Typography>
                <Input
                    sx={{ backgroundColor: 'background.2', width: "100%", }}
                    type='text'
                    // value={messageStore.chat.newMessage}
                    // onChange={(e) => messageStore.setChat("newMessage", e.target.value)}
                    multiline
                    maxRows={5}
                    placeholder="Текст отзыва"
                />
            </Stack>
        );
    })
);

const ReportDetailed = inject(
    "rootStore",
    "knowledgeStore",
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

const ReportBug = inject(
    "rootStore",
    "knowledgeStore",
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
                    Здесь вы можете рассказать о технической ошибке.
                </Typography>
            </Stack>
        );
    })
);


const ReportContent = inject(
    "rootStore",
    "knowledgeStore",
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
                    Здесь вы можете отправить жалобу на контент. Укажите как можно больше информации о контенте и содержании жалобы
                </Typography>
            </Stack>
        );
    })
);


const ReportDialog = inject(
    "rootStore",
    "knowledgeStore",
)(
    observer(({ rootStore, knowledgeStore, open, setOpen }) => {
        const router = useRouter();
        const [type, setType] = React.useState('general');

        const handleChange = (event) => {
            setType(event.target.value);
        };

        return (
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
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
                        Отзыв
                    </Typography>
                    <FormControl margin="normal" variant="standard" sx={{ ml: 1, mr: 1, minWidth: 240 }}>
                        <InputLabel id="demo-simple-select-standard-label">Тип отзыва</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={type}
                            onChange={handleChange}
                            label="Тип отзыва"
                        >
                            <MenuItem value={"general"}> Cтандартный </MenuItem>
                            <MenuItem value={"detailed"}> Развёрнутый отзыв </MenuItem>
                            <MenuItem value={"bug-report"}> Рассказать об программной ошибке (баге) </MenuItem>
                            <MenuItem value={"content-report"}> Рассказать об ошибке в контенте </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <DialogContent>
                    <AnimatePresence>
                        {type === "general" &&
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ReportGeneral />
                            </Box>}
                        {type === "detailed" &&
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ReportDetailed />
                            </Box>}

                        {type === "bug-report" &&
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ReportBug />
                            </Box>}
                        {type === "content-report" &&
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ReportContent />
                            </Box>}
                    </AnimatePresence>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'text.main' }} onClick={() => setOpen(false)}>Отмена</Button>
                    <Button variant="contained" onClick={null} autoFocus>
                        Отправить отзыв
                    </Button>
                </DialogActions>
            </Dialog >
        );
    })
);

export default ReportDialog;