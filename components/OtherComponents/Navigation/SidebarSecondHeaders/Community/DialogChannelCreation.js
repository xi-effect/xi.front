import React from "react";
import { inject, observer } from "mobx-react";

import { Typography, Radio, Button, FormControl, InputLabel, Input, Dialog, DialogContent, Stack, Paper, useMediaQuery, DialogActions } from "@mui/material";


const DialogChannelCreation = inject()(observer(({ openDialogChannelCreation, setOpenDialogChannelCreation }) => {
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

    const [channelSelect, setChannelSelect] = React.useState(null);

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialogChannelCreation ?? false}
            onClose={() => setOpenDialogChannelCreation(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
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
                    Создание канала
                </Typography>
            </Stack>
            <DialogContent>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        height: 360,
                        width: "100%",
                    }}
                >
                    {["Чат", "Расписание", "Комната", "Доска", "Задание",].map((item, index) => (
                        <Paper
                            key={index.toString()}
                            elevation={6}
                            onClick={() => {
                                if (channelSelect === index) return setChannelSelect(null);
                                return setChannelSelect(index);
                            }}
                            sx={{
                                mb: 2,
                                height: 36,
                                width: "100%",
                                bgcolor: "grey.900"
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{
                                    height: 36,
                                    width: "100%",
                                }}
                            >
                                <Radio
                                    checked={channelSelect === index}
                                />
                                <Typography>
                                    {item}
                                </Typography>
                            </Stack>
                        </Paper>

                    ))}
                    <FormControl
                        fullWidth
                        sx={{
                            mt: 2,
                            pl: 1,
                            pr: 1,
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            <Typography sx={{ color: "text.primary" }}>
                                Название нового канала
                            </Typography>
                        </InputLabel>
                        <Input
                            sx={{ width: "100%", }}
                            label="Название нового канала"
                            type="text"
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialogChannelCreation(false)}
                    variant="contained"
                >
                    Готово
                </Button>
            </DialogActions>
        </Dialog >
    );
}));


export default DialogChannelCreation;