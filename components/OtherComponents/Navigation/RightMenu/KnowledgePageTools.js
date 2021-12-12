/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { useTheme, useMediaQuery, IconButton, Tooltip, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';




const KnowledgePageTools = inject(
    "knowledgeStore"
)(
    observer(({ knowledgeStore }) => {
        const theme = useTheme();
        const router = useRouter()

        return (
            <>
                <Tooltip title="Информация о странице">
                    <IconButton onClick={null} size="large">
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Назад">
                    <IconButton onClick={() => router.back()} size="large">
                        <UndoIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    })
);

export default KnowledgePageTools;