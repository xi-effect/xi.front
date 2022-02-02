/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";

import { Button, Tooltip, IconButton, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SaveAltIcon from "@mui/icons-material/SaveAlt";


const KnowledgeСreatePage = inject(
    "knowledgeStore",
    "managmentStore",
    "uiStore",
)(
    observer(({ uiStore, managmentStore }) => (
            <>
                <Button
                    sx={{
                        color: "text.primary",
                        width: 142,
                        alignItems: "space-between",
                    }}
                    onClick={() => managmentStore.savePage()} size="large"
                >
                    Сохранить <SaveAltIcon sx={{ ml: "auto", mr: 0 }} />
                </Button>
                <Button
                    sx={{
                        color: "text.primary",
                        width: 142,
                        alignItems: "space-between",
                    }}
                    onClick={null} size="large"
                >
                    Инфо <InfoIcon sx={{ ml: "auto", mr: 0 }} />
                </Button>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Tooltip title="Назад">
                        <span>
                            <IconButton
                                disabled={uiStore.knowledge.activeStep === 0}
                                sx={{
                                    color: "text.primary",
                                }}
                                onClick={() => uiStore.setKnowledge("activeStep", uiStore.knowledge.activeStep - 1)}
                                size="large"
                            >
                                <ArrowBackIcon sx={{ ml: "auto", mr: 0 }} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Typography variant="subtitle2">{`${uiStore.knowledge.activeStep + 1} / 3`}</Typography>
                    <Tooltip title="Вперёд">
                        <span>
                            <IconButton
                                disabled={uiStore.knowledge.activeStep === 2}
                                sx={{
                                    color: "text.primary",
                                }}
                                onClick={() => uiStore.setKnowledge("activeStep", uiStore.knowledge.activeStep + 1)}
                                size="large"
                            >
                                <ArrowForwardIcon sx={{ ml: "auto", mr: 0 }} />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Stack>
            </>
        ))
);

export default KnowledgeСreatePage;