import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Fade, Input, Divider, IconButton, Grid, useTheme, Tooltip } from "@mui/material";


import clsx from "clsx";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import QueueIcon from "@mui/icons-material/Queue";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import PreviewIcon from "@mui/icons-material/Preview";
import { inject, observer } from "mobx-react"
import ReactMarkdown from "react-markdown"

const Markdown = inject("managmentStore")(observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: "black", color: "white" };

    // console.log("props", props)
    const theme = useTheme();

    const [hover, setHover] = React.useState(false)
    const [edit, setEdit] = React.useState(false)

    return (
        <Grid
            onFocus={() => setHover(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            onClick={() => managmentStore.setPageCreationList("selectId", index)}
        >
            <Grid sx={{ width: "calc(100% - 4px)", }}>
                {edit && <Input
                    sx={{
                        "& .MuiInput-input": {
                            width: "100%",
                            color: "text.main",
                            lineHeight: "normal",
                        }
                    }}
                    type="text"
                    disableUnderline
                    multiline
                    fullWidth
                    value={values.label}
                    onChange={(event) => managmentStore.setPageCreationComponents(index, "label", event.target.value)}
                />}
                {!edit && <ReactMarkdown>
                    {values.label}
                </ReactMarkdown>}
            </Grid>
            <Fade
                in={hover}
                style={{ transformOrigin: "0 0 0" }}
                {...(hover ? { timeout: 1000 } : {})}
            >
                <Grid
                    container
                    direction="row"
                >
                    {!edit && <Tooltip title="К Редактированию">
                        <IconButton
                            sx={{
                                ml: 1,
                            }}
                            onClick={() => setEdit(true)}
                            size="large">
                            <ModeEditOutlineIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>}
                    {edit && <Tooltip title="К Просмотру">
                        <IconButton
                            sx={{
                                ml: 1,
                            }}
                            onClick={() => setEdit(false)}
                            size="large">
                            <PreviewIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>}
                    <Tooltip title="Удалить блок">
                        <IconButton
                            sx={{
                                marginLeft: "auto"
                            }}
                            onClick={() => managmentStore.deleteComponent(index)}
                            size="large">
                            <DeleteForeverIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Перетащить блок">
                        <IconButton size="large">
                            <DragIndicatorIcon sx={{ color: "text.main" }} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Fade>
        </Grid>
    );
}));

export default Markdown

