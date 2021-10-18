import React, { useState } from 'react'
import { styled } from '@mui/material/styles';


//import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Slider, Dialog, useTheme, DialogTitle, DialogContent, DialogContentText, DialogActions, Link, InputAdornment, Tooltip, IconButton, ClickAwayListener, Divider, ButtonGroup, MenuList, MenuItem, Avatar, Paper, Grow, Popper, Badge, Grid, FormControl, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button } from '@mui/material'
import { useFileUpload } from "use-file-upload"
import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AvatarEditor from 'react-avatar-editor'
import DialogChangePassword from './UserAccount/DialogChangePassword'
import DialogChangeEmail from './UserAccount/DialogChangeEmail';
import SaveIcon from '@mui/icons-material/Save';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
const PREFIX = 'UserAccount';

const classes = {
    root: `${PREFIX}-root`,
    rootProfile: `${PREFIX}-rootProfile`,
    gridDarkModeToggle: `${PREFIX}-gridDarkModeToggle`,
    gridTypography: `${PREFIX}-gridTypography`,
    Typography: `${PREFIX}-Typography`,
    Badge: `${PREFIX}-Badge`,
    Icon: `${PREFIX}-Icon`,
    usernameLabel: `${PREFIX}-usernameLabel`,
    divider: `${PREFIX}-divider`,
    textField: `${PREFIX}-textField`,
    textFieldDialog: `${PREFIX}-textFieldDialog`,
    OutlinedInput: `${PREFIX}-OutlinedInput`,
    icons: `${PREFIX}-icons`,
    inputLabel: `${PREFIX}-inputLabel`,
    textFieldTypography: `${PREFIX}-textFieldTypography`,
    gridTextField: `${PREFIX}-gridTextField`,
    gridSelectButton: `${PREFIX}-gridSelectButton`,
    popper: `${PREFIX}-popper`,
    labelEmailPassword: `${PREFIX}-labelEmailPassword`,
    gridLabel: `${PREFIX}-gridLabel`,
    labelEmailBefore: `${PREFIX}-labelEmailBefore`,
    labelEmailAfter: `${PREFIX}-labelEmailAfter`,
    link: `${PREFIX}-link`,
    changeButton: `${PREFIX}-changeButton`,
    cancelButton: `${PREFIX}-cancelButton`,
    gridDialogItem: `${PREFIX}-gridDialogItem`,
    gridRootDialogItem: `${PREFIX}-gridRootDialogItem`,
    ErrorLabel: `${PREFIX}-ErrorLabel`,
    gridErrorLabel: `${PREFIX}-gridErrorLabel`,
    slider: `${PREFIX}-slider`,
    gridDialogAv: `${PREFIX}-gridDialogAv`,
    uploadButton: `${PREFIX}-uploadButton`,
    Img: `${PREFIX}-Img`,
    background: `${PREFIX}-background`,
    changeLabel: `${PREFIX}-changeLabel`,
    gridUsernameWrapper: `${PREFIX}-gridUsernameWrapper`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        width: '100%',
        height: 'auto',
        //backgroundColor: theme => theme.main.palette.content.background,
    },

    [`& .${classes.rootProfile}`]: {
        // paddingLeft: 8,
        // paddingTop: 8,
    },

    [`& .${classes.gridDarkModeToggle}`]: {
        marginLeft: 8,
        marginTop: 8,
    },

    [`& .${classes.gridTypography}`]: {
        marginTop: 4,
        marginLeft: 8,
    },

    [`& .${classes.Typography}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.Badge}`]: {

    },

    [`& .${classes.Icon}`]: {
        marginTop: 32,
        marginLeft: 32,
        borderRadius: "25%",
        color: theme => theme.palette.secondary.contrastText,
        backgroundColor: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.usernameLabel}`]: {
        paddingLeft: 8,
        fontSize: 24,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.divider}`]: {
        marginTop: 8,
        marginBottom: 8,
        width: "100%",
        height: "0.5px",
        backgroundColor: theme => theme.palette.primary.contrastText,
        //paddingBottom: 8,
    },

    [`& .${classes.textField}`]: {
        marginLeft: 12,
        marginRight: 0,
        width: "100%",
        borderRadius: 4,
        backgroundColor: theme => theme.palette.blueGrey["6"],
    },

    [`& .${classes.textFieldDialog}`]: {
        marginLeft: 12,
        marginRight: 0,
        width: "100%",
        backgroundColor: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.OutlinedInput}`]: {
        zIndex: 999,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.icons}`]: {
        //color: 'rgb(142,146,151)',
    },

    [`& .${classes.inputLabel}`]: {
        zIndex: 999,
        color: theme => theme.palette.primary.contrastText,

    },

    [`& .${classes.textFieldTypography}`]: {
        zIndex: 999,
        marginTop: -4,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.gridTextField}`]: {
        paddingTop: 12,
    },

    [`& .${classes.gridSelectButton}`]: {
        paddingTop: 6,
        paddingLeft: 12,
    },

    [`& .${classes.popper}`]: {
        zIndex: 1000,
    },

    [`& .${classes.labelEmailPassword}`]: {
        paddingTop: 6,
        paddingLeft: 12,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.gridLabel}`]: {
        paddingTop: 6,
        paddingLeft: 12,
        backgroundColor: theme => theme.palette.blueGrey["6"],
        paddingBottom: 6,
        borderRadius: 4,
    },

    [`& .${classes.labelEmailBefore}`]: {
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.labelEmailAfter}`]: {
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.link}`]: {
        color: theme => theme.palette.primary.light,
        cursor: 'pointer',
        paddingLeft: 4,
        paddingTop: 4,
    },

    [`& .${classes.changeButton}`]: {
        width: 180,
        marginTop: 8,
    },

    [`& .${classes.cancelButton}`]: {
        color: theme => theme.palette.primary.contrastText
    },

    [`& .${classes.gridDialogItem}`]: {
        width: '100%',
        paddingTop: 16,
        paddingLeft: -4,
    },

    [`& .${classes.gridRootDialogItem}`]: {
        width: '100%',
        paddingRight: 24,
    },

    // icons: {
    //     zIndex: 999,
    //     color: 'rgb(142,146,151)',
    // },,
    [`& .${classes.ErrorLabel}`]: {
        zIndex: 999,
        fontSize: 16,
        color: theme => theme.palette.error.main,
    },

    [`& .${classes.gridErrorLabel}`]: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,
        paddingRight: 20,

    },

    [`& .${classes.slider}`]: {
        width: "250px",
        padding: 16,
    },

    [`& .${classes.gridDialogAv}`]: {
        height: '100%'
        //width: "550px",
    },

    [`& .${classes.uploadButton}`]: {
        marginTop: 8,
    },

    [`& .${classes.Img}`]: {
        borderRadius: '50%'
    },

    [`& .${classes.background}`]: {
        //position: 'fixed',
        // height: 96,
        // width: 96,
        //borderRadius: 64,

    },

    [`& .${classes.changeLabel}`]: {
        paddingTop: 8,
    },

    [`& .${classes.gridUsernameWrapper}`]: {
        marginTop: 16,
    }
}));

//import { SnackbarProvider, useSnackbar } from 'notistack';

let Crypto = require('crypto-js')


const UserAccount = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore }) => {
    const theme = useTheme()

    const options = ['Участник', 'Ученик', 'Преподаватель', 'Автор', 'Родитель'];

    // const { enqueueSnackbar } = useSnackbar();

    const [hiddenEmail, setHiddenEmail] = React.useState(true)

    //SelectorButton

    // const [open, setOpen] = React.useState(false);
    // const anchorRef = React.useRef(null);
    //const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        //console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        console.log("click")
        // store.setSettingsValues("role", index)
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    // const handleClose = (event) => {
    //     if (anchorRef.current && anchorRef.current.contains(event.target)) {
    //         return;
    //     }

    //     setOpen(false);
    // };

    const [openEmailChangeDialog, setOpenEmailChangeDialog] = React.useState(false)
    const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = React.useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [open1, setOpen1] = React.useState(false);

    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    const [value, setValue] = React.useState(30);

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    const [files, selectFiles] = useFileUpload();

    const [f, setF] = React.useState(undefined);

    const setEditorRef = React.useRef(null);

    const saveNewAvatar = () => {
        const canvas = setEditorRef.current.getImage()
        const img = canvas.toDataURL()
        console.log(img)
        //setF(i)
        settingsStore.setSettings('avatar', img)
        settingsStore.fetchDataScr(`${rootStore.url}/avatar/`, "POST", img)
            .then((data) => {
                console.log(data)
                // if (data.message != undefined) {
                //   console.log(data.message)
                // }
                if (data != undefined) {
                    //console.log(data.a)
                    //store.setSettings("avatar", data)
                } else {
                    console.log("Проблемы с сервером")
                }

            });
        //selectPr(canvas)
        setOpen1(false);
    }

    const saveNewUsername = () => {
        rootStore.fetchDataScr(`${rootStore.url}/settings/`, "POST", {
            "changed": { "username": settingsStore.settings.username }
        })
            .then((data) => {
                if (data.a) {
                    // enqueueSnackbar('Успешно', {
                    //     variant: 'success',
                    // });
                } else {
                    // enqueueSnackbar('Ошибка', {
                    //     variant: 'error',
                    // });
                }
            })
    }

    return (
        <Root>
            <Grid spacing={1} container direction="column" className={classes.root}>
                <Grid
                    //item
                    container
                    direction="row"
                    //justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid>
                        <Button onClick={handleClickOpen1}>
                            <Badge
                                className={classes.Badge}
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                badgeContent={
                                    <CloudDownloadIcon className={classes.Icon} />
                                }
                            >
                                <div className={classes.background}>
                                    {settingsStore.settings.avatar === null && <Image
                                        alt="avatarimg"
                                        src={"/defaultAvatar.jpg"}
                                        width={102}
                                        height={102}
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={classes.Img}
                                    />}
                                    {settingsStore.settings.avatar != null && <Image
                                        alt="avatarimg"
                                        src={settingsStore.settings.avatar}
                                        width={102}
                                        height={102}
                                        // layout="fill"
                                        // objectFit="cover"
                                        // quality={100}
                                        className={classes.Img}
                                    />}
                                </div>
                            </Badge>
                        </Button>
                    </Grid>
                    <Grid className={classes.gridUsernameWrapper}>
                        <FormControl className={classes.textField} variant="outlined">
                            <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Имя пользователя</Typography> </InputLabel>
                            <OutlinedInput
                                label="Имя пользователя"
                                className={classes.OutlinedInput}
                                type='text'
                                value={settingsStore.settings.username}
                                onChange={(event) => settingsStore.setSettings("username", event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={saveNewUsername}
                                            // onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large">
                                            <Tooltip title="Сохранить изменения" arrow>
                                                <SaveIcon className={classes.icons} />
                                            </Tooltip>
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />
                        </FormControl>
                        {/* </Grid> */}

                    </Grid>

                    <Dialog
                        onClose={handleClose1}
                        aria-labelledby="customized-dialog-title"
                        open={open1}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={handleClose1}>
                            Создать Аватар
                        </DialogTitle>
                        <DialogContent dividers>
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
                                        ref={setEditorRef}
                                        image={files?.source == undefined ? "/defaultAvatar.jpg" : files.source}
                                        width={250}
                                        height={250}
                                        border={50}
                                        borderRadius={125}
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
                                    <Button
                                        onClick={() =>
                                            selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                                console.log("Files Selected", { name, size, source, file });
                                            })
                                        }
                                        className={classes.uploadButton}
                                        variant="contained"
                                    >
                                        Загрузить изображение
                                    </Button>
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Typography className={classes.changeLabel}> Изменить масштаб аватара </Typography>
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
                                        max={60}
                                        onChange={handleChangeValue}
                                        aria-labelledby="continuous-slider"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={saveNewAvatar} variant="contained" >
                                Сохранить изменения
                            </Button>
                        </DialogActions>

                    </Dialog>

                    <Divider className={classes.divider} />
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Typography className={classes.labelEmailPassword}> Почта </Typography>
                        <Grid
                            className={classes.gridLabel}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            {!hiddenEmail && <Typography className={classes.labelEmailBefore}> {settingsStore.settings.emailBefore} </Typography>}
                            {hiddenEmail && <Typography className={classes.labelEmailBefore}> {"*".repeat(settingsStore.settings.emailBefore.length)} </Typography>}
                            <Typography className={classes.labelEmailAfter}> {settingsStore.settings.emailAfter} </Typography>
                            {hiddenEmail && <Link className={classes.link} onClick={() => setHiddenEmail(false)}> Показать </Link>}
                            {!hiddenEmail && <Link className={classes.link} onClick={() => setHiddenEmail(true)}> Скрыть </Link>}

                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Button color="primary" variant="contained" onClick={() => setOpenEmailChangeDialog(true)} className={classes.changeButton}>
                            Сменить почту
                        </Button>
                        <DialogChangeEmail openEmailChangeDialog={openEmailChangeDialog} setOpenEmailChangeDialog={setOpenEmailChangeDialog} />
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                    >
                        <Button color="primary" variant="contained" onClick={() => setOpenPasswordChangeDialog(true)} className={classes.changeButton}>
                            Сменить пароль
                        </Button>
                        <DialogChangePassword openPasswordChangeDialog={openPasswordChangeDialog} setOpenPasswordChangeDialog={setOpenPasswordChangeDialog} />
                    </Grid>
                    <Divider className={classes.divider} />
                    {/* </Grid> */}
                </Grid>
            </Grid>
        </Root>
    );
}))

export default UserAccount