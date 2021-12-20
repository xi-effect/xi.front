/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { useTheme, useMediaQuery, IconButton, Button, Tooltip, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';




const KnowledgePageTools = inject(
    "knowledgeStore"
)(
    observer(({ knowledgeStore, setOpenDialog }) => {
        const theme = useTheme();
        const router = useRouter()

        return (
            <>
                <Button
                    sx={{
                        color: 'text.primary',
                        width: 142,
                        alignItems: 'space-between',
                    }}
                    onClick={() => setOpenDialog(true)} size="large"
                >
                    Инфо <InfoIcon sx={{ ml: 'auto', mr: 0 }} />
                </Button>
                <Button
                    sx={{
                        color: 'text.primary',
                        width: 142,
                        alignItems: 'space-between',
                    }}
                    onClick={() => router.back()}
                    size="large"
                >
                    Назад <UndoIcon sx={{ ml: 'auto', mr: 0 }} />
                </Button>
            </>
        );
    })
);

export default KnowledgePageTools;