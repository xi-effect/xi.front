/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import InfoIcon from "@mui/icons-material/Info";
import TaskIcon from "@mui/icons-material/Task";

const KnowledgeModuleTools = inject(
    "knowledgeSt",
)(
    observer(({ knowledgeSt, goNext, setOpenDialog }) => {
        const router = useRouter()

        return (
            <>
                <>
                    {knowledgeSt.moduleCompleted.isFinished && router.pathname.includes("/knowledge/module/results") && !(router.pathname === "/knowledge/module/results") && <Button
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
                    {knowledgeSt.module.type === "test" && !(router.pathname.includes("/knowledge/module/results")) && <Button
                        sx={{
                            color: "text.primary",
                            width: 142,
                            alignItems: "space-between",
                        }}
                        onClick={() => knowledgeSt.getTestModuleResults()} size="large"
                    >
                        Завершить <TaskIcon sx={{ ml: "auto", mr: 0 }} />
                    </Button>}
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
                </>
                {(knowledgeSt.moduleCompleted.isFinished || !(knowledgeSt.module.map !== undefined) || knowledgeSt.module.map.length === 0) && <>

                </>}
            </>
        );
    })
);

export default KnowledgeModuleTools;