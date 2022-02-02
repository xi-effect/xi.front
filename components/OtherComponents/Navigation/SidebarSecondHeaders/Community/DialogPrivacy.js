/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router"
import { inject, observer } from "mobx-react"

import { Typography, MenuItem, useTheme, Tab, Tabs, Radio, Switch, Button, Chip, FormControl, InputLabel, Input, Dialog, DialogContent, Stack, Tooltip, Box, IconButton, Popper, Grow, MenuList, Paper, ClickAwayListener, Divider, ListItemIcon, ListItemText, useMediaQuery, Container, DialogActions } from "@mui/material";
import Image from "next/image";

const DialogPrivacy = inject("rootStore")(observer(({ rootStore, openDialogPrivacy, setOpenDialogPrivacy }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialogPrivacy ?? false}
            onClose={() => setOpenDialogPrivacy(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="md"
            sx={{
                // height: "100%"
            }}
        >
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                // spacing={2}
                sx={{
                    height: 64,
                    width: "100%",
                    p: 1,
                }}
            >
                <Typography sx={{ mt: 2, ml: 2, mr: "auto" }} variant="h5">
                    Настройки конфиденциальности
                </Typography>
            </Stack>
            <DialogContent>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        height: 160,
                        width: "100%",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                    >
                        <Switch />
                        <Typography>
                            Разрешить участникам сообщества писать вам личные сообщения
                        </Typography>
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialogPrivacy(false)}
                    variant="contained"
                >
                    Готово
                </Button>
            </DialogActions>
        </Dialog >
    )
}));

export default DialogPrivacy;