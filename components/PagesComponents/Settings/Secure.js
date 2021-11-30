import React, { useState } from "react";

import {
    FormControl,
    Stack,
    Typography,
    Box,
    Button,
    Link,
    IconButton,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { inject, observer } from "mobx-react";

import DialogChangeEmail from './Secure/DialogChangeEmail';
import DialogChangePassword from './Secure/DialogChangePassword';

const Secure = inject(
    "rootStore",
    "settingsStore"
)(
    observer(({ rootStore, settingsStore }) => {
        const [hiddenEmail, setHiddenEmail] = React.useState(true)

        const [openEmailChangeDialog, setOpenEmailChangeDialog] = React.useState(false)
        const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = React.useState(false)


        return (
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                >
                    <Typography sx={{ mr: 0.5 }}> почта - </Typography>
                    {!hiddenEmail && <Typography > {settingsStore.settings.emailBefore} </Typography>}
                    {hiddenEmail && <Typography > {"*".repeat(settingsStore.settings.emailBefore.length)} </Typography>}
                    <Typography > {settingsStore.settings.emailAfter} </Typography>
                    {hiddenEmail && <Link sx={{ color: 'text.main', cursor: 'pointer', pl: 1 }} onClick={() => setHiddenEmail(false)}> показать </Link>}
                    {!hiddenEmail && <Link sx={{ color: 'text.main', cursor: 'pointer', pl: 1 }} onClick={() => setHiddenEmail(true)}> скрыть </Link>}
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                >
                    <Button color="inherit" variant="text" onClick={() => setOpenEmailChangeDialog(true)}>
                        Сменить почту
                    </Button>
                    <Typography>
                        /
                    </Typography>
                    <Button color="inherit" variant="text" onClick={() => setOpenPasswordChangeDialog(true)}>
                        Сменить пароль
                    </Button>
                    <DialogChangeEmail openEmailChangeDialog={openEmailChangeDialog} setOpenEmailChangeDialog={setOpenEmailChangeDialog} />
                    <DialogChangePassword openPasswordChangeDialog={openPasswordChangeDialog} setOpenPasswordChangeDialog={setOpenPasswordChangeDialog} />
                </Stack>
            </Stack>
        );
    })
);

export default Secure;
