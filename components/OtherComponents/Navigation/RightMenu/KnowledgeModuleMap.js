/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";

import { Link, Stack, Typography } from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import { Scrollbars } from "react-custom-scrollbars-2";



const KnowledgeModuleMap = inject(
    "knowledgeStore",
)(
    observer(({ knowledgeStore }) => (
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
        </>
    ))
);

export default KnowledgeModuleMap;