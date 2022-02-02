import React from "react";
import {
    Stack,
    Button,
} from "@mui/material";

import { inject, observer } from "mobx-react";

const Timeline = inject()(observer(() => (
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
            bgcolor: "grey.800",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            width: 82,
            ml: 2,
            height: "calc(100vh - 128px)",
        }}
    >
        <Button
            variant="contained"
            color="primary"
            sx={{
                mb: 1,
                width: "100%",
                borderRadius: 0,
                borderTopLeftRadius: 16,

            }}
        >
            Ранее
        </Button>
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
                height: "100%",
                width: "100%",
                touchAction: "pan-y",
                whiteSpace: "nowrap",
                overflow: "hidden",
            }}
        >
            {[...Array(20)].map((item, index) =>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    key={index.toString()}
                    sx={{
                        minHeight: "90px",
                        width: "100%",
                    }}
                >
                    {index}
                </Stack>
            )}
        </Stack>
        <Button
            variant="contained"
            color="primary"
            sx={{
                mt: 1,
                width: "100%",
                borderRadius: 0,
                borderBottomLeftRadius: 16,
            }}
        >
            Позднее
        </Button>
    </Stack>
))
);

export default Timeline;
