/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import {
    Stack,
    Typography,
    Button,
    Link,
} from "@mui/material";

import { inject, observer } from "mobx-react";

import DialogChangeEmail from "./Secure/DialogChangeEmail";
import DialogChangePassword from "./Secure/DialogChangePassword";

const Secure = inject(
    "userSt"
)(
    observer(({ userSt }) => {
        const [hiddenEmail, setHiddenEmail] = React.useState(true)

        const [openEmailChangeDialog, setOpenEmailChangeDialog] = React.useState(false)
        const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = React.useState(false)

        const getStars = () => {
            if (userSt.settings.emailBefore) {
                return "*".repeat(userSt.settings.emailBefore.length)
            }
            return "****"
        }

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
                    {!hiddenEmail && <Typography > {userSt.settings.emailBefore} </Typography>}
                    {hiddenEmail && <Typography > {getStars()} </Typography>}
                    <Typography > {userSt.settings.emailAfter} </Typography>
                    {hiddenEmail && <Link sx={{ color: "text.primary", cursor: "pointer", pl: 1 }} onClick={() => setHiddenEmail(false)}> показать </Link>}
                    {!hiddenEmail && <Link sx={{ color: "text.primary", cursor: "pointer", pl: 1 }} onClick={() => setHiddenEmail(true)}> скрыть </Link>}
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
