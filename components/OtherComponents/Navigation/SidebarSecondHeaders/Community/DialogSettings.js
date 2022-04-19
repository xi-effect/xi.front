import React from "react";
import { inject, observer } from "mobx-react";

import { Dialog, Button, Stack, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Review from "./DialogSettings/Review";
import Invites from "./DialogSettings/Invites";

const items = [
    "Обзор",
    "Приглашения",
    "Участники",
    "Роли",
];

const DialogSettings = inject()(observer(({ openDialogSettings, setOpenDialogSettings }) => {
    const [value, setValue] = React.useState(0);

    return (
        <Dialog
            fullScreen
            open={openDialogSettings ?? false}
            onClose={() => setOpenDialogSettings(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    height: "100vh",
                    width: "100%",
                }}
            >
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-end"
                    sx={{
                        width: '34%',
                        height: "100vh",
                        bgcolor: '#222',
                    }}
                >
                    <Typography
                        variant='subtitle2'
                        component="span" // внутри button не может быть div, вёрстка тогда будет не валидной
                        sx={{
                            p: 2,
                            pl: 1,
                            width: 178,
                            fontSize: 12,
                            textAlign: 'left',
                            color: 'text.secondary',
                        }}
                    >
                        Настройки сообщества
                    </Typography>
                    {items.map((item, index) =>
                        <Button
                            color="inherit"
                            sx={{
                                width: 178,
                                borderRight: value === index ? `4px solid #fff` : "none",
                                borderRadius: 0,
                            }}
                            onClick={() => setValue(index)}
                            key={index}
                        >
                            <Typography
                                variant='h6'
                                component="span" // внутри button не может быть div, вёрстка тогда будет не валидной
                                sx={{
                                    fontSize: 22,
                                    width: '100%',
                                    textAlign: 'left',
                                    color: value === index ? 'text.main' : 'text.secondary',
                                }}
                            >
                                {item}
                            </Typography>
                        </Button>
                    )}
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    sx={{
                        p: 2,
                        width: '66%',
                        maxWidth: 800,
                        height: "100vh",
                        position: 'relative',
                    }}
                >
                    <IconButton
                        aria-label="закрыть"
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 16,
                        }}
                        onClick={() => setOpenDialogSettings(false)}
                    >
                        <CloseIcon fontSize="large" />
                    </IconButton>
                    {value === 0 && <Review />}
                    {value === 1 && <Invites />}
                </Stack>
            </Stack>
        </Dialog >
    );
}));

export default DialogSettings;