/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import { Button } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import InfoIcon from "@mui/icons-material/Info";

const KnowledgePageTools = inject(
)(
    observer(({ setOpenDialog }) => {
        const router = useRouter()

        return (
            <>
                <Button
                    sx={{
                        color: "text.primary",
                        width: 142,
                        alignItems: "space-between",
                    }}
                    onClick={() => setOpenDialog(true)} size="large"
                >
                    Инфо <InfoIcon sx={{ ml: "auto", mr: 0 }} />
                </Button>
                <Button
                    sx={{
                        color: "text.primary",
                        width: 142,
                        alignItems: "space-between",
                    }}
                    onClick={() => router.back()}
                    size="large"
                >
                    Назад <UndoIcon sx={{ ml: "auto", mr: 0 }} />
                </Button>
            </>
        );
    })
);

export default KnowledgePageTools;