/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router"
import { inject, observer } from "mobx-react"

import { Typography, MenuItem, useTheme, Tab, Tabs, Radio, Switch, Button, Chip, FormControl, InputLabel, Input, Dialog, DialogContent, Stack, Tooltip, Box, IconButton, Popper, Grow, MenuList, Paper, ClickAwayListener, Divider, ListItemIcon, ListItemText, useMediaQuery, Container, DialogActions } from "@mui/material";
import Image from "next/image";

const DialogCategoryCreation = inject("rootStore")(observer(({ rootStore, openDialogCategoryCreation, setOpenDialogCategoryCreation }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down("md"));


    return (
        <Dialog
            fullScreen={fullScreen}
            open={openDialogCategoryCreation ?? false}
            onClose={() => setOpenDialogCategoryCreation(false)}
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
                    Создание категории сообщества
                </Typography>
            </Stack>
            <DialogContent>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    // spacing={2}
                    sx={{
                        height: 100,
                        width: "100%",
                    }}
                >
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
                                Название новой категории
                            </Typography>
                        </InputLabel>
                        <Input
                            sx={{ width: "100%", }}
                            label="Название новой категории"
                            type={"text"}
                        />
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setOpenDialogCategoryCreation(false)}
                    variant="contained"
                >
                    Готово
                </Button>
            </DialogActions>
        </Dialog >
    )
}));



export default DialogCategoryCreation;