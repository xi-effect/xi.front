/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Slider, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AvatarEditor from 'react-avatar-editor'

const useStyles = makeStyles((theme) => ({
    stepLabel: {
        marginLeft: 16,
        fontSize: 24,
        cursor: 'default',
        color: theme => theme.palette.primary.contrastText,
    },
    stepSecondLabel: {
        marginLeft: 16,
        fontSize: 20,
        cursor: 'default',
        color: theme => theme.palette.primary.contrastText,
    },
    slider: {
        width: "250px",
        padding: 16,
    },
    gridDialogAv: {
        height: '100%',
        padding: 16,
        //width: "550px",
    },
    uploadButton: {
        marginTop: 8,
    },
    wrapperGrid: {
        margin: 0,
    },
    changeLabel: {
        marginTop: 16,
        color: theme => theme.palette.primary.contrastText,
    },
    stepWrapper: {
        padding: 16,
        //width: "calc(100% - 64px)",
        //backgroundColor: "blue",
    }
}));

const StepThree = inject('rootStore', 'managmentStore', 'contentStore')(observer(({ rootStore, managmentStore, contentStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [value, setValue] = React.useState(10);

    React.useEffect(() => {
        if (managmentStore.moduleCreation.authorId != null && managmentStore.moduleCreation.imageId != null) {
            contentStore.loadImgFromServer(managmentStore.moduleCreation.authorId, managmentStore.moduleCreation.imageId)
            contentStore.setTemporaryImages("moduleCreation", contentStore.images[`${authorId}-${imageId}`])
        }
    }, [])

    // const handleChangeValue = (event, newValue) => {
    //     setValue(newValue);
    // };

    const [selectedImage, setSelectedImage] = useState(null);

    const setEditorRef = React.useRef(null);

    const saveNewAvatar = () => {
        const canvas = setEditorRef.current.getImage()
        const img = canvas.toDataURL()
        if (managmentStore.moduleCreation.authorId === null && managmentStore.moduleCreation.imageId === null) {
            rootStore.fetchDataScr(`${rootStore.url}/wip/images/`, "POST", img).then(
                (data) => {
                    console.log("success", data, data["author-id"], data["image-id"])
                    managmentStore.setModuleCreation("authorId", data["author-id"])
                    managmentStore.setModuleCreation("imageId", data["image-id"])
                })
        }
        if (managmentStore.moduleCreation.authorId != null && managmentStore.moduleCreation.imageId != null) {
            rootStore.fetchDataScr(`${rootStore.url}/wip/images/${managmentStore.moduleCreation.imageId}/`, "PUT", img).then(
                (data) => {
                    console.log("success")
                })
        }
        //contentStore.setTemporaryImages("moduleCreation", img)
    }


    return (
        <>
            <Grid
                className={classes.stepWrapper}
                xs={12} sm={12} md={6} lg={6} xl={6}
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Typography className={classes.stepLabel}> Шаг 3. </Typography>
                <Typography className={classes.stepSecondLabel}> Добавьте изображение для вашего модуля </Typography>
                <Grid
                    className={classes.wrapperGrid}
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
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
                            justifyContent="center"
                            alignItems="center"
                        >
                            <AvatarEditor
                                //onMouseUp={saveNewAvatar}
                                ref={setEditorRef}
                                image={contentStore.temporaryImages.moduleCreation == null ? "/illustrations/defaultModuleImg.png" : contentStore.temporaryImages.moduleCreation}
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
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <label htmlFor="upload-photo">
                                <input
                                    style={{ display: "none" }}
                                    id="upload-photo"
                                    name="upload-photo"
                                    type="file"
                                    onChange={(event) => {
                                        console.log(event.target.files[0]);
                                        contentStore.setTemporaryImages("moduleCreation", event.target.files[0]);
                                    }}
                                />
                                <Button className={classes.uploadButton} color="primary" variant="contained" component="span">
                                    Загрузить изображение
                                </Button>
                            </label>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography className={classes.changeLabel}> Изменить масштаб изображения </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Slider
                                className={classes.slider}
                                value={value}
                                min={10}
                                max={30}
                                onChange={(event) => setValue(event.target.value)}
                                //onChangeCommitted={saveNewAvatar}
                                aria-labelledby="continuous-slider"
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                onClick={saveNewAvatar}
                                className={classes.uploadButton}
                                variant="contained"
                                color="primary"
                            >
                                Сохранить изображение
                            </Button>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid >
            <Grid
                className={classes.stepWrapper}
                xs={12} sm={12} md={6} lg={6} xl={6}
                item
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Typography className={classes.stepLabel}> Шаг 4. </Typography>
                <Typography className={classes.stepSecondLabel}> Теперь осталось только опубликовать модуль.  Прежде чем модуль станет доступен, он пройдёт модерацию. Это займёт некоторое время </Typography>
                <Grid
                    className={classes.wrapperGrid}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        className={classes.uploadButton}
                        variant="contained"
                        color="primary"
                        onClick={null}
                    >
                        Опубликовать модуль
                    </Button>
                </Grid>
            </Grid >
        </>
    )
}))

export default StepThree