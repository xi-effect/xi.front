
import React from "react";
import { inject, observer } from "mobx-react";

import { Typography, Stack, Tooltip, IconButton } from "@mui/material";
import PlusOneIcon from "@mui/icons-material/PlusOne";

import { useSnackbar } from "notistack";


const Home = inject()(observer(() => {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{
                p: 1,
            }}
        >
            <Typography
                variant="Roboto500XiLabel"
                sx={{
                    fontSize: 18,
                }}
            >
                Главная
            </Typography>
            <Tooltip arrow title="Создать профиль">
                <IconButton
                    sx={{
                        height: 36,
                        width: 36,
                    }}
                    onClick={() => enqueueSnackbar("Эту функцию мы ещё только разрабатываем", {
                        variant: "info",
                    })}
                >
                    <PlusOneIcon />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}));

export default Home;