/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import { Dialog, DialogContent, Stack, Input, Slider, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import clsx from 'clsx';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDropzone } from 'react-dropzone';

const DialogImgSelect = inject('managmentStore')(observer(({ managmentStore, saveNewAvatar, files, selectFiles, setEditorRef, uploadImg, openDialog, setOpenDialog }) => {
    // Simulated props for the purpose of the example
    const theme = useTheme();



    const [value, setValue] = React.useState(10);

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            {/* <DialogTitle className={classes.dialogTitle} id="scroll-dialog-title"> */}
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid>
                    <Typography> Загрузка Изображения </Typography>
                </Grid>
                <Grid>
                    <Tooltip title="Закрыть">
                        <IconButton onClick={() => setOpenDialog(false)} size="large">
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>

            </Grid>
            {/* </DialogTitle> */}
            <DialogContent dividers={true}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >

                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <AvatarEditor
                            onMouseUp={saveNewAvatar}
                            ref={setEditorRef}
                            image={files?.source == undefined ? "/illustrations/defaultModuleImg.png" : files.source}
                            width={320}
                            height={180}
                            border={25}
                            borderRadius={0}
                            color={[114, 137, 218, 0.6]} // RGBA
                            scale={value / 10}
                            rotate={0}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            onClick={() => {
                                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                    console.log("Files Selected", { name, size, source, file });
                                })
                                saveNewAvatar()
                            }
                            }
                            variant="contained"
                            color="primary"
                        >
                            Загрузить изображение
                        </Button>
                        <Typography> Изменить масштаб изображения </Typography>

                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Slider
                            value={value}
                            min={10}
                            max={30}
                            onChange={handleChangeValue}
                            onChangeCommitted={saveNewAvatar}
                            aria-labelledby="continuous-slider"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={uploadImg}>
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    );
}));


const ImageComp = inject('rootStore', 'knowledgeStore', 'contentStore', 'managmentStore')(observer(({ rootStore, knowledgeStore, contentStore, managmentStore, index }) => {
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    //const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };

    //console.log("props", props)

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
        <>
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
                            width: '100%',
                            minHeight: 200,
                            border: '2px dashed #fafafa',
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
                                ml: 'auto'
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
            {/* <DialogImgSelect saveNewAvatar={saveNewAvatar} files={files} selectFiles={selectFiles} setEditorRef={setEditorRef} uploadImg={uploadImg} openDialog={openDialog} setOpenDialog={setOpenDialog} /> */}
        </>
    );
}));

// onClickAway={() => setEdit(false)}

export default ImageComp

