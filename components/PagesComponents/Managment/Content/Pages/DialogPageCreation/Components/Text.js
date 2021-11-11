import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Fade, Input, Divider, IconButton, Grid, useTheme, Tooltip } from '@mui/material';


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

const PREFIX = 'Text';

const classes = {
    gridButtons: `${PREFIX}-gridButtons`,
    divider: `${PREFIX}-divider`,
    gridTextWrapper: `${PREFIX}-gridTextWrapper`,
    text: `${PREFIX}-text`,
    icon: `${PREFIX}-icon`,
    speedDial: `${PREFIX}-speedDial`,
    speedDialActionFirst: `${PREFIX}-speedDialActionFirst`,
    speedDialAction: `${PREFIX}-speedDialAction`,
    disableIcon: `${PREFIX}-disableIcon`,
    activeIcon: `${PREFIX}-activeIcon`,
    iconSpeedDial: `${PREFIX}-iconSpeedDial`,
    IconButtonSpeedDial: `${PREFIX}-IconButtonSpeedDial`,
    leftIconButton: `${PREFIX}-leftIconButton`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.gridButtons}`]: {
        marginLeft: "auto",
    },

    [`& .${classes.divider}`]: {
        backgroundColor: props => props.palette.primary.main,
        width: "100%",
        height: 1,
        margin: props => props.spacing(1, 0.5),
    },

    [`& .${classes.gridTextWrapper}`]: {
        width: "calc(100% - 4px)",
    },

    [`& .${classes.text}`]: {
        width: "100%",
        color: props => props.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    },

    [`& .${classes.icon}`]: {
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.speedDial}`]: {
        height: 36,
        width: 36,
        marginTop: 4,
        marginLeft: 16,
        // position: 'absolute',
        // top: theme => theme.spacing(10),
        // left: theme => theme.spacing(2),
    },

    [`& .${classes.speedDialActionFirst}`]: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.speedDialAction}`]: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.disableIcon}`]: {
        color: props => props.palette.error.main,
    },

    [`& .${classes.activeIcon}`]: {
        color: props => props.palette.primary.contrastText,
        backgroundColor: props => props.palette.primary.main,
        '&:hover': {
            color: props => props.palette.primary.contrastText,
            backgroundColor: props => props.palette.primary.main,
        }
    },

    [`& .${classes.iconSpeedDial}`]: {
        height: 24,
        width: 24,
    },

    [`& .${classes.IconButtonSpeedDial}`]: {
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.leftIconButton}`]: {
        marginLeft: "auto"
    }
}));

const Text = inject('managmentStore')(observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };

    // console.log("props", props)
    const theme = useTheme();

    const handleFontSizeUp = (event, newFormats) => {
        //console.log(index, "fontSize", newFormats)
        if (values.fontSize != 48) managmentStore.setPageCreationComponents(index, "fontSize", values.fontSize + 2)
    };

    const handleFontSizeDown = (event, newFormats) => {
        //console.log(index, "fontSize", newFormats)
        if (values.fontSize != 12) managmentStore.setPageCreationComponents(index, "fontSize", values.fontSize - 2)
    };

    const handleTextAlign = (align) => {
        let newAlignment = null
        if (align === 'left') newAlignment = 'center'
        else if (align === 'center') newAlignment = 'right'
        else if (align === 'right') newAlignment = 'justify'
        else if (align === 'justify') newAlignment = 'left'
        managmentStore.setPageCreationComponents(index, "textAlign", newAlignment)
    };

    const handleFontStyle = () => {
        if (values.fontStyle === "normal") return managmentStore.setPageCreationComponents(index, "fontStyle", "italic")
        return managmentStore.setPageCreationComponents(index, "fontStyle", "normal");
    };

    const handleFontWeight = () => {
        if (values.fontWeight === "normal") return managmentStore.setPageCreationComponents(index, "fontWeight", "bold");
        return managmentStore.setPageCreationComponents(index, "fontWeight", "normal");
    };

    const handleTextDecoration = () => {
        if (values.textDecoration === "none") return managmentStore.setPageCreationComponents(index, "textDecoration", "underline");
        return managmentStore.setPageCreationComponents(index, "textDecoration", "none");
    };

    const textAlignIconSelect = (align) => {
        if (align === 'left') return <FormatAlignLeftIcon />
        if (align === 'center') return <FormatAlignCenterIcon />
        if (align === 'right') return <FormatAlignRightIcon />
        if (align === 'justify') return <FormatAlignJustifyIcon />
    }

    const textAlignLabelSelect = (align) => {
        if (align === 'left') return 'по левому краю'
        if (align === 'center') return 'по правому краю'
        if (align === 'right') return 'по центру'
        if (align === 'justify') return 'по ширине'
    }

    const [hover, setHover] = React.useState(false)

    return (
        <Root>
            <Grid
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => managmentStore.setPageCreationList("selectId", index)}
            >
                <Grid className={classes.gridTextWrapper}>
                    <Input
                        sx={{
                            '& .MuiInput-input': {
                                width: "100%",
                                color: 'text.main',
                                fontSize: values.fontSize,
                                fontStyle: values.fontStyle,
                                textAlign: values.textAlign,
                                fontWeight: values.fontWeight,
                                textDecoration: values.textDecoration,
                                lineHeight: "normal",
                            }
                        }}
                        type="text"
                        disableUnderline
                        multiline
                        fullWidth
                        value={values.label}
                        onChange={(event) => managmentStore.setPageCreationComponents(index, "label", event.target.value)}
                    />
                </Grid>
                <Fade
                    in={hover}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(hover ? { timeout: 1000 } : {})}
                >
                    <Grid
                        container
                        direction="row"
                        className={classes.gridButtons}
                    >
                        {/* <Typography sx={{color: 'main.dark', ml: 1, mt: 1.5,}} variant="subtitle2"> настройки: </Typography> */}
                        <IconButton onClick={() => handleFontSizeUp()} sx={{ ml: 1, color: values.fontSize === 48 ? 'error.main' : 'text.main', }} edge="end" size="large">
                            <Tooltip title={`Увеличить шрифт. Сейчас - ${values.fontSize}`}>
                                <ZoomInIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => handleFontSizeDown()} sx={{ ml: 1, color: values.fontSize === 12 ? 'error.main' : 'text.main', }} edge="end" size="large">
                            <Tooltip title={`Уменьшить шрифт. Сейчас - ${values.fontSize}`}>
                                <ZoomOutIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => handleTextAlign(values.textAlign)} sx={{ ml: 1, color: 'text.main', }} edge="end" size="large">
                            <Tooltip title={`Изменить выравнивание текста. Сейчас - ${textAlignLabelSelect(values.textAlign)}`}>
                                {textAlignIconSelect(values.textAlign)}
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => handleFontWeight()} sx={{ ml: 1, color: values.fontWeight === 'bold' ? 'text.main' : 'text.dark', }} edge="end" size="large">
                            <Tooltip title={`Полужирный`}>
                                <FormatBoldIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => handleFontStyle()} sx={{ ml: 1, color: values.fontStyle === 'italic' ? 'text.main' : 'text.dark', }} edge="end" size="large">
                            <Tooltip title={`Курсив`}>
                                <FormatItalicIcon />
                            </Tooltip>
                        </IconButton>
                        <IconButton onClick={() => handleTextDecoration()} sx={{ ml: 1, color: values.textDecoration === 'underline' ? 'text.main' : 'text.dark', }} edge="end" size="large">
                            <Tooltip title={`Подчёркнутый`}>
                                <FormatUnderlinedIcon />
                            </Tooltip>
                        </IconButton>
                        <Tooltip title="Удалить блок">
                            <IconButton
                                className={classes.leftIconButton}
                                onClick={() => managmentStore.deleteComponent(index)}
                                size="large">
                                <DeleteForeverIcon className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Перетащить блок">
                            <IconButton size="large">
                                <DragIndicatorIcon className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Fade>
            </Grid>
        </Root>
    );
}));

export default Text

