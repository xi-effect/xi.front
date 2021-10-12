/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import { Dialog, DialogContent, Input, Slider, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import CloseIcon from '@mui/icons-material/Close';
import AvatarEditor from 'react-avatar-editor'
import { useFileUpload } from "use-file-upload"

import clsx from 'clsx';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const useStylesDialogImgSelect = makeStyles((theme) => ({
    button: {
        marginLeft: 4,
        marginRight: 4,
        color: theme => theme.palette.primary.contrastText,
    },
    mobileStepper: {
        width: "100%",
        backgroundColor: theme => theme.palette.blueGrey["5"],
    },
    icon: {
        color: theme => theme.palette.primary.contrastText,
    },
    mainLabel: {
        fontSize: 20,
        marginLeft: 8,
    },
    listMainLabel: {
        cursor: 'default',
    },
    gridListItem: {
        paddingTop: 12,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 4,
        // borderRadius: 8,
        // border: `${theme.main.palette.content.border} solid 2px`,
        // '&:hover': {
        //     border: `${theme.main.palette.content.border} solid 2px`,
        // },
    },
    divider: {
        marginTop: '-4px',
        color: theme => theme.palette.primary.dark,
        width: '100%',
        height: '2px',
    },
    EditIcon: {
        color: theme => theme.palette.primary.contrastText,
    },
    DeleteForeverIcon: {
        color: theme => theme.palette.primary.contrastText,

    },
    loadMoreButton: {
        borderRadius: '16px'
    },
    dialogTitle: {
        padding: 8,
        backgroundColor: theme => theme.palette.blueGrey["6"],
        color: theme => theme.palette.primary.contrastText,
    },
    dialogContent: {
        backgroundColor: theme => theme.palette.blueGrey["6"],
    },
    dialogContentText: {
        color: theme => theme.palette.primary.contrastText,
    },
    dialogActions: {
        backgroundColor: theme => theme.palette.blueGrey["6"],
    },
    gridDialogAv: {
        height: '100%',
        padding: 16,
        //width: "550px",
    },
    uploadButton: {
        marginTop: 8,
    },
    Button: {
        color: theme => theme.palette.primary.contrastText,
    }
}));

const DialogImgSelect = inject('managmentStore')(observer(({ managmentStore, saveNewAvatar, files, selectFiles, setEditorRef, uploadImg, openDialog, setOpenDialog }) => {
    // Simulated props for the purpose of the example
    const theme = useTheme();
    const classes = useStylesDialogImgSelect(theme);


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
                className={classes.dialogTitle}
            >
                <Grid>
                    <Typography className={classes.mainLabel}> Загрузка Изображения </Typography>
                </Grid>
                <Grid>
                    <Tooltip title="Закрыть">
                        <IconButton onClick={() => setOpenDialog(false)}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                </Grid>

            </Grid>
            {/* </DialogTitle> */}
            <DialogContent className={classes.dialogContent} dividers={true}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    className={classes.gridDialogAv}
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
                            className={classes.uploadButton}
                            variant="contained"
                            color="primary"
                        >
                            Загрузить изображение
                        </Button>
                        <Typography className={classes.changeLabel}> Изменить масштаб изображения </Typography>

                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Slider
                            className={classes.slider}
                            value={value}
                            min={10}
                            max={30}
                            onChange={handleChangeValue}
                            onChangeCommitted={saveNewAvatar}
                            aria-labelledby="continuous-slider"
                        />
                    </Grid>
                </Grid>
                {
                    // store.hiddenCourses.length != 0 && !store.allHiddenCoursesLoad && <Grid
                    //     container
                    //     direction="row"
                    //     justifyContent="center"
                    //     alignItems="center"
                    // >
                    //     <Button variant="contained" onClick={() => loadMore()} className={classes.loadMoreButton}> Загрузить ещё </Button>
                    // </Grid>

                }
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={uploadImg} className={classes.Button}>
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}));


const useStyles = makeStyles((theme) => ({
    gridButtons: {
        marginLeft: "auto",
    },
    divider: {
        backgroundColor: theme => theme.palette.primary.main,
        width: "100%",
        height: 1,
        margin: theme => theme.spacing(1, 0.5),
    },
    gridTextWrapper: {
        width: "calc(100% - 4px)",
    },
    text: {
        width: "100%",
        color: theme => theme.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    },
    icon: {
        color: theme => theme.palette.primary.contrastText,
    },
    speedDial: {
        height: 36,
        width: 36,
        marginTop: 4,
        marginLeft: 16,
        // position: 'absolute',
        // top: theme => theme.spacing(10),
        // left: theme => theme.spacing(2),
    },
    speedDialActionFirst: {
        marginLeft: 16,
        color: theme => theme.palette.primary.main,
    },

    speedDialAction: {
        marginLeft: 16,
        color: theme => theme.palette.primary.main,
    },
    disableIcon: {
        color: theme => theme.palette.error.main,
    },
    activeIcon: {
        color: theme => theme.palette.primary.contrastText,
        backgroundColor: theme => theme.palette.primary.main,
        '&:hover': {
            color: theme => theme.palette.primary.contrastText,
            backgroundColor: theme => theme.palette.primary.main,
        }
    },
    iconSpeedDial: {
        height: 24,
        width: 24,
    },
    IconButtonSpeedDial: {
        color: theme => theme.palette.primary.contrastText,
    },
    leftIconButton: {
        marginLeft: "auto"
    },
    imgWrapper: {
        display: "block",
        position: "relative",
        width: "100%",
        height: "100%",
        maxWidth: 960,
        //paddingBottom: "56.2%",
    }
}));

const ImageComp = inject('rootStore', 'knowledgeStore', 'contentStore', 'managmentStore')(observer(({ rootStore, knowledgeStore, contentStore, managmentStore, index }) => {
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    //const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    //console.log("props", props)
    let props = {}
    const theme = useTheme();
    const classes = useStyles({ ...theme, ...props });

    const [openDialog, setOpenDialog] = React.useState(false)

    React.useEffect(() => {
        if (values.authorId && values.imageId) {
            contentStore.loadImgFromServer(values.authorId, values.imageId)
        }
    }, [])

    const [files, selectFiles] = useFileUpload();
    const setEditorRef = React.useRef(null);
    const [img, setImg] = React.useState(null)

    const saveNewAvatar = () => {
        const canvas = setEditorRef.current.getImage()
        const imgL = canvas.toDataURL()
        setImg(imgL)
        //contentStore.setImage(authorId, imageId, imgL)
        //console.log("img", store.nowEditModule.img)
    }

    const uploadImg = () => {
        if (img != null) {
            rootStore.fetchDataScr(`${rootStore.url}/wip/images/`, "POST", img).then(
                (data) => {
                    if (data) {
                        console.log("done", data)
                        contentStore.setImage(data.authorId, data.imageId, img)
                        managmentStore.setPageCreationComponents(index, "author-id", data.authorId)
                        managmentStore.setPageCreationComponents(index, "image-id", data.imageId)
                        setOpenDialog(false)

                    } else {
                        console.log("fail", data)
                    }

                })
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

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
                    className={classes.gridTextWrapper}
                >
                    {values.authorId != null && values.imageId != null &&
                        <div className={classes.imgWrapper}>
                            <Image
                                width={960}
                                height={540}
                                //objectFit="contain"
                                layout='responsive'
                                src={contentStore.images[`${values.authorId}-${values.imageId}`]}
                                alt="Picture of the author"
                            />
                        </div>
                    }
                </Grid>
                <Divider className={classes.divider} />
                <Grid
                    container
                    direction="row"
                    className={classes.gridButtons}
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
                    <Button size="small" variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                        Загрузить изборажение
                    </Button>
                    {/* <Tooltip title="Дублировать блок">
                        <IconButton className={classes.leftIconButton} onClick={() => managmentStore.duplicateComponent(index)}>
                            <QueueIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Удалить блок">
                        <IconButton className={classes.leftIconButton} onClick={() => managmentStore.deleteComponent(index)}>
                            <DeleteForeverIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Перетащить блок">
                        <IconButton>
                            <DragIndicatorIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <DialogImgSelect saveNewAvatar={saveNewAvatar} files={files} selectFiles={selectFiles} setEditorRef={setEditorRef} uploadImg={uploadImg} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </>

    );
}));

// onClickAway={() => setEdit(false)}

export default ImageComp

