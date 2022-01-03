import React from "react";

import {
    CircularProgress,
    Skeleton,
    Grid,
    Typography,
    useTheme,
    Box,
    Stack,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import Timeline from "./Schedule/Timeline";
import LessonsList from "./Schedule/LessonsList";



const Schedule = inject("knowledgeStore")(
    observer(({ knowledgeStore }) => {


        return (
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <Timeline />
                <LessonsList />
            </Stack>
        );
    })
);

export default Schedule;
