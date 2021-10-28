import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { SpeedDial, SpeedDialIcon, Fade, Radio, SpeedDialAction, Input, Divider, IconButton, Grid, useTheme, Tooltip, Checkbox, Typography } from '@mui/material';


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
import AddIcon from '@mui/icons-material/Add';
import { inject, observer } from 'mobx-react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ListIcon from '@mui/icons-material/List';



const PREFIX = 'Quiz';

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
    leftIconButton: `${PREFIX}-leftIconButton`,
    IconButtonToHidden: `${PREFIX}-IconButtonToHidden`,
    hidden: `${PREFIX}-hidden`
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
        marginTop: 2,
        marginLeft: 22,
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
    },

    [`& .${classes.IconButtonToHidden}`]: {
        transition: "0.8s",
        display: "none",
    },

    [`& .${classes.hidden}`]: {
        transition: "0.4s",
        display: "block",
    }
}));

const QuizItem = inject('managmentStore')(observer(({ managmentStore, show, index, indexA }) => {
    const values = managmentStore.pageCreation.components[index]
    const item = managmentStore.pageCreation.components[index].content[indexA]
    const props = { fontSize: values.fontSize, textAlign: "left", fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };

    // console.log("props", props)
    const theme = useTheme();

    return (
        <Input
            classes={{
                input: classes.text
            }}
            placeholder="Добавить текст ответа"
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
            value={item.label}
            onChange={(event) => managmentStore.setPageCreationContentComponents(index, indexA, "label", event.target.value)}
            startAdornment={
                <Root>
                    {values.quizType === 'single' && <Radio
                        color="primary"
                        checked={item.rightAnswer}
                        onChange={() => managmentStore.setSingleQuiz(index, indexA)}

                    />}
                    {values.quizType === 'multiple' && <Checkbox
                        color="primary"
                        checked={item.rightAnswer}
                        onChange={() => managmentStore.setPageCreationContentComponents(index, indexA, "rightAnswer", !item.rightAnswer)}
                    //onChange={handleChange}
                    />}
                </Root>
            }
            endAdornment={
                <>
                    <Tooltip title="Удалить блок">
                        <IconButton
                            onClick={() => managmentStore.deleteComponentContent(index, indexA)}
                            size="large">
                            <DeleteForeverIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Перетащить блок">
                        {/* className={clsx(classes.IconButtonToHidden, { [classes.hidden]: item.showIcons })} */}
                        <IconButton size="large">
                            <DragIndicatorIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                </>
            }
        />
    );
}));

const QuizList = inject('managmentStore')(observer(({ managmentStore, index }) => {
    const values = managmentStore.pageCreation.components[index]
    const props = { fontSize: values.fontSize, textAlign: "left", fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };

    // console.log("props", props)
    const theme = useTheme();

    return (
        <>
            {
                values.content.map((item, indexA) => (
                    <Draggable key={indexA.toString()} draggableId={`quiz-${indexA}`} index={indexA}>
                        {provided => (
                            <Grid
                                onMouseEnter={() => managmentStore.setPageCreationContentComponents(index, indexA, "showIcons", true)}
                                onMouseLeave={() => managmentStore.setPageCreationContentComponents(index, indexA, "showIcons", false)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                className={classes.gridTextWrapper}
                            >
                                <QuizItem index={index} indexA={indexA} />
                            </Grid>
                        )
                        }
                    </Draggable >
                ))}
        </>
    );
}));


const Quiz = inject('managmentStore')(observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    const props = { fontSize: values.fontSize, textAlign: "left", fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };

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

    const handleQuizType = (type) => {
        let newType = null
        if (type === 'single') newType = 'multiple'
        else if (type === 'multiple') {
            newType = 'single'
            managmentStore.changeQuizType(index)
        }
        managmentStore.setPageCreationComponents(index, "quizType", newType)
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

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const quizTypeIconSelect = (type) => {
        if (type === 'single') return <FormatListBulletedIcon />
        if (type === 'multiple') return <ListIcon />
    }

    const quizTypeLabelSelect = (type) => {
        if (type === 'single') return 'Один правильный ответ'
        if (type === 'multiple') return 'Множество правильных ответов'
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newState = reorder(
            values.content,
            result.source.index,
            result.destination.index
        );
        console.log("newState", newState)
        managmentStore.setContentToComponent(index, newState);
    }

    return <>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            onClick={() => managmentStore.setPageCreationList("selectId", index)}
        >
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                className={classes.gridTextWrapper}
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={`quiz-${index}`}>
                        {provided => (
                            <Grid className={classes.gridTextWrapper} ref={provided.innerRef} {...provided.droppableProps} >
                                <QuizList index={index} />
                                {provided.placeholder}
                            </Grid>
                        )}
                    </Droppable>
                </DragDropContext>


            </Grid>
            <Divider className={classes.divider} />
            <Grid
                container
                direction="row"
                className={classes.gridButtons}
            >
                <Tooltip title="Добавить">
                    <IconButton onClick={() => managmentStore.pushContentToComponent(index)} size="large">
                        <AddIcon className={classes.icon} />
                    </IconButton>
                </Tooltip>
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    className={classes.speedDial}
                    // hidden={hidden}
                    icon={<TuneIcon className={classes.iconSpeedDial} />}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    open={open}
                    direction="right"
                >
                    <SpeedDialAction
                        className={classes.speedDialAction}
                        tooltipPlacement="bottom"
                        icon={quizTypeIconSelect(values.quizType)}
                        tooltipTitle={`Изменить тип опроса. Сейчас - ${quizTypeLabelSelect(values.quizType)}`}
                        //tooltipOpen
                        onClick={() => handleQuizType(values.quizType)}
                    />
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
                    />
                </SpeedDial>
                {/* <Tooltip title="Дублировать блок">
                    <IconButton className={classes.leftIconButton} onClick={() => managmentStore.duplicateComponent(index)}>
                        <QueueIcon className={classes.icon} />
                    </IconButton>
                </Tooltip> */}
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
        </Grid>
    </>;
}));

export default Quiz


