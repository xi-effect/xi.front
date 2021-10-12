import React, { useState } from 'react';
import { Input, Divider, IconButton, Grid, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import clsx from 'clsx';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TuneIcon from '@mui/icons-material/Tune';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    gridButtons: {
        marginLeft: "auto",
    },
    divider: {
        backgroundColor: props => props.palette.primary.main,
        width: "100%",
        height: 1,
        margin: props => props.spacing(1, 0.5),
    },
    gridTextWrapper: {
        width: "calc(100% - 4px)",
    },
    icon: {
        color: props => props.palette.primary.contrastText,
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
        color: props => props.palette.primary.main,
    },

    speedDialAction: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },
    disableIcon: {
        color: props => props.palette.error.main,
    },
    activeIcon: {
        color: props => props.palette.primary.contrastText,
        backgroundColor: props => props.palette.primary.main,
        '&:hover': {
            color: props => props.palette.primary.contrastText,
            backgroundColor: props => props.palette.primary.main,
        }
    },
    iconSpeedDial: {
        height: 24,
        width: 24,
    },
    IconButtonSpeedDial: {
        color: props => props.palette.primary.contrastText,
    },
    leftIconButton: {
        marginLeft: "auto"
    },
    dividerBlock: {
        width: "100%",
        height: 2,
        margin: props => props.spacing(1, 0.5),
        backgroundColor: props => props.palette.primary.contrastText,
    },
}));

const DividerComp = inject('managmentStore')(observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    // console.log("props", props)
    const theme = useTheme();
    const classes = useStyles({ ...theme, ...props });

    // const handleFontSizeUp = (event, newFormats) => {
    //     //console.log(index, "fontSize", newFormats)
    //     if (values.fontSize != 64) managmentStore.setPageCreationComponents(index, "fontSize", values.fontSize + 2)
    // };

    // const handleFontSizeDown = (event, newFormats) => {
    //     //console.log(index, "fontSize", newFormats)
    //     if (values.fontSize != 24) managmentStore.setPageCreationComponents(index, "fontSize", values.fontSize - 2)
    // };

    // const handleTextAlign = (align) => {
    //     let newAlignment = null
    //     if (align === 'left') newAlignment = 'center'
    //     else if (align === 'center') newAlignment = 'right'
    //     else if (align === 'right') newAlignment = 'left'
    //     // else if (align === 'justify') newAlignment = 'left'
    //     managmentStore.setPageCreationComponents(index, "textAlign", newAlignment)
    // };


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
                direction="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => managmentStore.setPageCreationList("selectId", index)}
            >
                <Grid className={classes.gridTextWrapper}>
                    <Divider flexItem className={classes.dividerBlock} />
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
                            className={clsx(classes.speedDialActionFirst, { [classes.disableIcon]: values.fontSize === 64 })}
                            tooltipPlacement="bottom"
                            icon={<ZoomInIcon />}
                            tooltipTitle={`Увеличить шрифт. Сейчас - ${values.fontSize}`}
                            //tooltipOpen
                            onClick={() => handleFontSizeUp()}
                        />
                        {/*<SpeedDialAction
                            className={clsx(classes.speedDialAction, { [classes.disableIcon]: values.fontSize === 24 })}
                            tooltipPlacement="bottom"
                            icon={<ZoomOutIcon />}
                            tooltipTitle={`Уменьшить шрифт. Сейчас - ${values.fontSize}`}
                            //tooltipOpen
                            onClick={() => handleFontSizeDown()}
                        />
                        <SpeedDialAction
                            className={classes.speedDialAction}
                            tooltipPlacement="bottom"
                            icon={textAlignIconSelect(values.textAlign)}
                            tooltipTitle={`Изменить выравнивание текста. Сейчас - ${textAlignLabelSelect(values.textAlign)}`}
                            //tooltipOpen
                            onClick={() => handleTextAlign(values.textAlign)}
                        />
                        <SpeedDialAction
                            className={clsx(classes.speedDialAction, { [classes.activeIcon]: values.fontWeight === 'bold' })}
                            tooltipPlacement="bottom"
                            icon={<FormatBoldIcon />}
                            tooltipTitle="Полужирный"
                            //tooltipOpen
                            onClick={() => handleFontWeight()}
                        />
                        <SpeedDialAction
                            className={clsx(classes.speedDialAction, { [classes.activeIcon]: values.fontStyle === 'italic' })}
                            tooltipPlacement="bottom"
                            icon={<FormatItalicIcon />}
                            tooltipTitle="Курсив"
                            //tooltipOpen
                            onClick={() => handleFontStyle()}
                        />
                        <SpeedDialAction
                            className={clsx(classes.speedDialAction, { [classes.activeIcon]: values.textDecoration === 'underline' })}
                            tooltipPlacement="bottom"
                            icon={<FormatUnderlinedIcon />}
                            tooltipTitle="Подчёркнутый"
                            //tooltipOpen
                            onClick={() => handleTextDecoration()}
                        /> */}
                    {/* </SpeedDial>  */}
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
        </>
    );
}));

export default DividerComp

