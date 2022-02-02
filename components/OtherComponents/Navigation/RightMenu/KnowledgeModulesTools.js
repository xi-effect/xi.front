/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { useTheme, useMediaQuery, IconButton, Button, Tooltip, Stack, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import UndoIcon from "@mui/icons-material/Undo";
import InfoIcon from "@mui/icons-material/Info";



const KnowledgeModulesTools = inject(
    "knowledgeStore"
)(
    observer(({ knowledgeStore }) => {
        const theme = useTheme();

        return (
            <>
                <Button
                    onClick={knowledgeStore.prevPageInModules}
                    disabled={knowledgeStore.moduleList.counter === 0 ? true : false}
                    sx={{
                        color: "text.primary",
                        width: 142,
                        alignItems: "space-between",
                    }}
                    size="large"
                >
                    Назад <NavigateBeforeIcon sx={{ ml: "auto", mr: 0 }} />
                </Button>
                <Typography sx={{ cursor: "default" }}> {`Страница ${knowledgeStore.moduleList.counter + 1}`} </Typography>
                <Button
                    onClick={knowledgeStore.nextPageInModules}
                    disabled={knowledgeStore.moduleList.modules.length < 12 ? true : false}
                    sx={{
                        color: "text.primary",
                        width: 142,
                        alignItems: "space-between",
                    }}
                    size="large"
                >
                    Вперёд <NavigateNextIcon sx={{ ml: "auto", mr: 0 }} />
                </Button>
            </>
        );
    })
);
export default KnowledgeModulesTools;