/* eslint-disable react/prop-types */
import React from "react";
import { inject, observer } from "mobx-react";

import { Stack, Typography, Radio, Button, FormControl, InputLabel, Input, Dialog, DialogContent, useMediaQuery, DialogActions } from "@mui/material";

import MobileDialog from 'kit/MobileDialog';

const Content = (props) => {
    const { channelSelect, setChannelSelect } = props;
    return (
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
                <Stack
                    key={index.toString()}
                    onClick={() => {
                        if (channelSelect === index) return setChannelSelect(null);
                        return setChannelSelect(index);
                    }}
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    sx={{
                        height: 48,
                        width: "100%",
                    }}
                >
                    <Radio
                        checked={channelSelect === index}
                    />
                    <Typography sx={{ fontSize: 22 }}>
                        {item}
                    </Typography>
                </Stack>
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
        </Stack>);
};

const Action = (props) => {
    const { uiSt } = props;
    return (
        <Button
            onClick={() => uiSt.setDialogs("channelCreation", false)}
            variant="contained"
        >
            Готово
        </Button>);
};

const DialogChannelCreation = inject("uiSt")(observer(({ uiSt }) => {
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

    const [channelSelect, setChannelSelect] = React.useState(null);

    return (
        <>
            {!fullScreen && <Dialog
                open={uiSt.dialogs.channelCreation}
                onClose={() => uiSt.setDialogs("channelCreation", false)}
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
                    <Content channelSelect={channelSelect} setChannelSelect={setChannelSelect} />
                </DialogContent>
                <DialogActions>
                    <Action uiSt={uiSt} />
                </DialogActions>
            </Dialog>}
            {fullScreen && <MobileDialog
                open={uiSt.dialogs.channelCreation}
                setOpen={() => uiSt.setDialogs("channelCreation", false)}
                title="Создание канала"
            >
                <Stack>
                    <Content channelSelect={channelSelect} setChannelSelect={setChannelSelect} />
                    <Action uiSt={uiSt} />
                </Stack>
            </MobileDialog>}
        </>
    );
}));


export default DialogChannelCreation;