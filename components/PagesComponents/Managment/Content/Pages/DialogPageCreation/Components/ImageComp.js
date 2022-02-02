/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ClearIcon from "@mui/icons-material/Clear";
import { inject, observer } from "mobx-react"
import Image from "next/image"
import { Dialog, DialogContent, Stack, Slider, DialogActions, Divider, IconButton, Button, Grid, Typography, useTheme, Tooltip } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDropzone } from "react-dropzone";

const ImageComp = inject("rootStore", "knowledgeStore", "contentStore", "managmentStore")(observer(({ rootStore, knowledgeStore, contentStore, managmentStore, index }) => {
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    // const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: "black", color: "white" };

    // console.log("props", props)

    const onDrop = React.useCallback((acceptedFile) => {
        if (values.imageId === null) {
            rootStore.fetchDataScr(`${rootStore.url}/wip/images/`, "POST", acceptedFile).then(
                (data) => {
                    if (data) {
                        console.log("done", data)
                        managmentStore.setPageCreationComponents(index, "authorId", data["author-id"])
                        managmentStore.setPageCreationComponents(index, "imageId", data["image-id"])
                    } else {
                        console.log("fail", data)
                    }

                })
        } else if (values.imageId != null) {
            rootStore.fetchDataScr(`${rootStore.url}/wip/images/${values.imageId}/`, "PUT", acceptedFile).then(
                (data) => {
                    if (data) {
                        console.log("done", data)

                    } else {
                        console.log("fail", data)
                    }

                })
        }

    }, [])
    const [openDialog, setOpenDialog] = React.useState(false)
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

    return (
        <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                onClick={() => managmentStore.setPageCreationList("selectId", index)}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                // alignItems="center"
                >

                    {values.authorId && values.imageId && <Image
                        alt="alt"
                        src={`https://xieffect.pythonanywhere.com/wip/images/${values.imageId}/`}
                        // layout="fill"
                        quality={100}
                        width={1920}
                        height={1080}
                    />}
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        sx={{
                            width: "100%",
                            minHeight: 200,
                            border: "2px dashed #fafafa",
                            borderRadius: 4,
                        }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Typography sx={{
                            p: 2,
                        }}> Перетащите изображение или нажмите, чтобы выбрать на своём компьютере </Typography>
                    </Stack>
                </Grid>
                <Divider />
                <Grid
                    container
                    direction="row"
                >
                    {/* <SpeedDial
                        ariaLabel="SpeedDial tooltip example"
                        className={classes.speedDial}
                        // hidden={hidden}
                        icon={<IconButton className={classes.IconButtonSpeedDial}>
                            <TuneIcon className={classes.iconSpeedDial} />
                        </IconButton>}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                        direction="right"
                    >
                        <SpeedDialAction
                            className={clsx(classes.speedDialActionFirst, { [classes.disableIcon]: values.fontSize === 48 })}
                            tooltipPlacement="bottom"
                            icon={<ZoomInIcon />}
                            tooltipTitle={`Увеличить шрифт. Сейчас - ${values.fontSize}`}
                            //tooltipOpen
                            onClick={() => handleFontSizeUp()}
                        />
                        <SpeedDialAction
                            className={clsx(classes.speedDialAction, { [classes.disableIcon]: values.fontSize === 12 })}
                            tooltipPlacement="bottom"
                            icon={<ZoomOutIcon />}
                            tooltipTitle={`Уменьшить шрифт. Сейчас - ${values.fontSize}`}
                            //tooltipOpen
                            onClick={() => handleFontSizeDown()}
                        />

                    </SpeedDial> */}
                    {/* <Tooltip title="Дублировать блок">
                        <IconButton className={classes.leftIconButton} onClick={() => managmentStore.duplicateComponent(index)}>
                            <QueueIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Удалить блок">
                        <IconButton
                            onClick={() => {
                                if (values.imageId) {
                                    rootStore.fetchDataScr(`${rootStore.url}/wip/images/${values.imageId}/`, "DELETE").then(
                                        (data) => {
                                            if (data) {
                                                console.log("done", data)
                                            } else {
                                                console.log("fail", data)
                                            }
                                        })
                                }
                                managmentStore.deleteComponent(index)
                            }}
                            size="large"
                            sx={{
                                ml: "auto"
                            }}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Перетащить блок">
                        <IconButton size="large">
                            <DragIndicatorIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
    );
}));

// onClickAway={() => setEdit(false)}

export default ImageComp

