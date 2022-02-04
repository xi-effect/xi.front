/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Dialog, FormControl, InputLabel, Input, MenuItem, Select, DialogContent, DialogActions, Stack, Typography } from "@mui/material";

const ReportGeneral = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ uiStore }) => (
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
                sx={{ backgroundColor: "background.2", width: "100%", }}
                type="text"
                value={uiStore.reportData.reportText ?? ""}
                onChange={(e) => uiStore.setReportData("reportText", e.target.value)}
                multiline
                maxRows={5}
                placeholder="Текст отзыва"
            />
        </Stack>
    ))
);

const ReportDetailed = inject()(
    observer(() => (
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
    ))
);

const ReportBug = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ uiStore }) => (
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
                sx={{ backgroundColor: "background.2", width: "100%", }}
                type="text"
                value={uiStore.reportData.errorDescription ?? ""}
                onChange={(e) => uiStore.setReportData("errorDescription", e.target.value)}
                multiline
                maxRows={5}
                placeholder="Опишите ошибку"
            />
            <Input
                sx={{ backgroundColor: "background.2", width: "100%", }}
                type="text"
                value={uiStore.reportData.sitePart ?? ""}
                onChange={(e) => uiStore.setReportData("sitePart", e.target.value)}
                multiline
                maxRows={5}
                placeholder="Укажите, в какой части сайта она произошла. Можно, скопировать url-адрес в это поле"
            />
            <Input
                sx={{ backgroundColor: "background.2", width: "100%", }}
                type="text"
                value={uiStore.reportData.errorRepeat ?? ""}
                onChange={(e) => uiStore.setReportData("errorRepeat", e.target.value)}
                multiline
                maxRows={5}
                placeholder="Расскажите о том, как появилась ошибка - что вы делали перед тем, как появилась ошибка или как её воспроизвести"
            />
            <Input
                sx={{ backgroundColor: "background.2", width: "100%", }}
                type="text"
                value={uiStore.reportData.deviceInfo ?? ""}
                onChange={(e) => uiStore.setReportData("deviceInfo", e.target.value)}
                multiline
                maxRows={5}
                placeholder="С какого устройства вы пользуетесь порталом? Также укажите браузер"
            />
        </Stack>
    ))
);


const ReportContent = inject(
    "uiStore",
)(
    observer(({ uiStore }) => (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
        >
            <Typography>
                Здесь вы можете отправить жалобу на контент. Укажите как можно больше информации о контенте и причине жалобы
            </Typography>
            <Input
                sx={{ backgroundColor: "background.2", width: "100%", }}
                type="text"
                value={uiStore.reportData.contentName ?? ""}
                onChange={(e) => uiStore.setReportData("contentName", e.target.value)}
                multiline
                maxRows={5}
                placeholder="Название контента (страницы, модуля)"
            />
            <Input
                sx={{ backgroundColor: "background.2", width: "100%", }}
                type="text"
                value={uiStore.reportData.errorDescription ?? ""}
                onChange={(e) => uiStore.setReportData("errorDescription", e.target.value)}
                multiline
                maxRows={5}
                placeholder="Опишите ошибку"
            />
        </Stack>
    ))
);


const ReportDialog = inject(
    "rootStore",
    "knowledgeStore",
    "uiStore",
)(
    observer(({ rootStore, uiStore, openDialog, setOpenDialog }) => {
        const [type, setType] = React.useState("general");

        const handleChange = (event) => {
            setType(event.target.value);
        };

        const sendReport = () => {
            let dataReport
            if (type === "general") {
                dataReport = {
                    reportText: uiStore.reportData.reportText,
                }
            }
            if (type === "detailed") {
                dataReport = {

                }
            }
            if (type === "bug-report") {
                dataReport = {
                    errorDescription: uiStore.reportData.errorDescription,
                    sitePart: uiStore.reportData.sitePart,
                    errorRepeat: uiStore.reportData.errorRepeat,
                    deviceInfo: uiStore.reportData.deviceInfo,
                }
            }
            if (type === "content-report") {
                dataReport = {
                    contentName: uiStore.reportData.contentName,
                    errorDescription: uiStore.reportData.errorDescription,
                }
            }
            rootStore.fetchDataScr(`${rootStore.url}/feedback/`, "POST", { type, data: dataReport }).then(
                () => {
                    uiStore.clearReportData()
                })
        }

        return (
            <Dialog
                open={openDialog ?? false}
                onClose={() => setOpenDialog(false)}
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
                        width: "100%",
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
                            <MenuItem value="general"> Cтандартный </MenuItem>
                            <MenuItem value="detailed"> Развёрнутый отзыв </MenuItem>
                            <MenuItem value="bug-report"> Рассказать об программной ошибке (баге) </MenuItem>
                            <MenuItem value="content-report"> Рассказать об ошибке в контенте </MenuItem>
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
                    <Button sx={{ color: "text.main" }} onClick={() => setOpenDialog(false)}>Отмена</Button>
                    <Button variant="contained" onClick={() => sendReport()} autoFocus>
                        Отправить отзыв
                    </Button>
                </DialogActions>
            </Dialog >
        );
    })
);

export default ReportDialog;