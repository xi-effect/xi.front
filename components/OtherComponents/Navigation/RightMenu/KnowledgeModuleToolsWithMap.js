/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, Link, Stack, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from "@mui/icons-material/Info";
import TaskIcon from "@mui/icons-material/Task";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { Scrollbars } from "react-custom-scrollbars-2";

const KnowledgeModuleToolsWithMap = inject(
    "knowledgeStore",
)(
    observer(({ knowledgeStore, goNext }) => {
        const router = useRouter()
        
        return (
            <>
                <Typography variant="subtitle1" sx={{ ml: 0.5 }}>Карта модуля:</Typography>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={0}
                    sx={{
                        height: "100%",
                    }}
                >
                    <Scrollbars
                        universal
                        style={{ width: 156, height: "100%" }}
                        autoHide
                        autoHideTimeout={1000}
                        autoHideDuration={200}
                    >
                        {knowledgeStore.module.map.map((name, index) => (
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                key={index.toString()}
                            >
                                {knowledgeStore.module.activeIdInMap ===
                                    index && (
                                        <ArrowRightIcon />
                                    )}
                                {/* {knowledgeStore.module.activeIdInMap !== (index + (paginationCounter - 1) * 10) && <CircleIcon sx={{fontSize: "8px", m: 1}} />} */}
                                <Link
                                    sx={{
                                        cursor:
                                            knowledgeStore.module.activeIdInMap ===
                                                index
                                                ? "default"
                                                : "pointer",
                                        ml:
                                            knowledgeStore.module.activeIdInMap ===
                                                index
                                                ? 0
                                                : 3,
                                    }}
                                    onClick={() =>
                                        knowledgeStore.loadPageInModule(
                                            index
                                        )
                                    }
                                    color="inherit"
                                    underline={
                                        knowledgeStore.module.activeIdInMap ===
                                            index
                                            ? "none"
                                            : "hover"
                                    }
                                >
                                    {name}
                                </Link>
                            </Stack>
                        ))}
                    </Scrollbars>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                    sx={{
                        width: "100%",
                    }}
                >
                    {knowledgeStore.moduleCompleted.isFinished && router.pathname.includes("/knowledge/module/results") && router.pathname === "/knowledge/module/results" && <Button
                        sx={{
                            color: "text.primary",
                            width: 152,
                            alignItems: "space-between",
                        }}
                        onClick={() => router.push("/knowledge/module/results")} size="large"
                    >
                        К результатам
                    </Button>}
                    {router.pathname === "/knowledge/module/results" && <Button
                        sx={{
                            color: "text.primary",
                            width: 142,
                            alignItems: "space-between",
                        }}
                        onClick={() => router.push("/knowledge/modules/")} size="large"
                    >
                        Закрыть тест
                    </Button>}
                    {knowledgeStore.module.type === "test" && !(router.pathname.includes("/knowledge/module/results")) && <Button
                        sx={{
                            color: "text.primary",
                            width: 142,
                            alignItems: "space-between",
                        }}
                        onClick={() => knowledgeStore.getTestModuleResults()} size="large"
                    >
                        Завершить <TaskIcon sx={{ ml: "auto", mr: 0 }} />
                    </Button>}
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
                    {!(router.pathname === "/knowledge/module/results") && <Button
                        sx={{
                            color: "text.primary",
                            width: 142,
                            alignItems: "space-between",
                        }}
                        onClick={goNext}
                        size="large"
                    >
                        Вперёд <DoubleArrowIcon sx={{ ml: "auto", mr: 0 }} />
                    </Button>}
                </Stack>
            </>
        );
    })
);

export default KnowledgeModuleToolsWithMap;