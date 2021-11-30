/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Box, Button, Dialog, FormControl, InputLabel, MenuItem, Select, DialogTitle, DialogContent, DialogActions, Link, useTheme, IconButton, Tooltip, Drawer, Stack, Typography } from "@mui/material";


import { motion } from "framer-motion"
import { Scrollbars } from 'react-custom-scrollbars-2';

const ReportDialog = inject(
    "rootStore",
    "knowledgeStore",
)(
    observer(({ rootStore, knowledgeStore, open, setOpen }) => {
        const router = useRouter();
        const [type, setType] = React.useState('standart');

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
                            <MenuItem value={"standart"}> Cтандартный </MenuItem>
                            <MenuItem value={"general"}> Развёрнутый отзыв </MenuItem>
                            <MenuItem value={"bug-report"}> Рассказать об программной ошибке (баге) </MenuItem>
                            <MenuItem value={"content-report"}> Рассказать об ошибке в контенте </MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <DialogContent>

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