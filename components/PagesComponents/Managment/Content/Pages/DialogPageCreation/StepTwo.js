import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from "next/link";
import clsx from 'clsx';
import { ToggleButton, ToggleButtonGroup, SpeedDial, SpeedDialIcon, SpeedDialAction, Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';



import { inject, observer } from 'mobx-react'


import DnDList from './../../../../../OtherComponents/DnDList/DnDList';
import ComponentsList from './Components/ComponentsList';

import TextFieldsIcon from '@mui/icons-material/TextFields';
import TitleIcon from '@mui/icons-material/Title';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import ImageIcon from '@mui/icons-material/Image';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


const PREFIX = 'StepTwo';

const classes = {
    gridRoot: `${PREFIX}-gridRoot`,
    gridMain: `${PREFIX}-gridMain`,
    gridWrapperMap: `${PREFIX}-gridWrapperMap`,
    gridMainImgWrapper: `${PREFIX}-gridMainImgWrapper`,
    speedDial: `${PREFIX}-speedDial`,
    speedDialAction: `${PREFIX}-speedDialAction`,
    infoLabel: `${PREFIX}-infoLabel`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.gridRoot}`]: {
        //margin: "8px",

    },

    [`& .${classes.gridMain}`]: {

        //overflow: "auto",
        // '&::-webkit-scrollbar': {
        //     width: "0! important",
        //     height: 0,
        //     display: "none !important",
        //     background: "transparent",
        // }
    },

    [`& .${classes.gridWrapperMap}`]: {
        backgroundColor: theme => theme.palette.blueGrey["4"],
        margin: "8px",
        width: "calc(100% - 16px)",
        height: "100vh",
        borderRadius: 32,
        cursor: "default !important",
    },

    [`& .${classes.gridMainImgWrapper}`]: {
        height: "calc(100vh - 156px)",
    },

    [`& .${classes.speedDial}`]: {

    },

    [`& .${classes.speedDialAction}`]: {
        height: 48,
        width: 48,
    },

    [`& .${classes.infoLabel}`]: {
        color: theme => theme.palette.primary.contrastText,
    }
}));


const defaultInitializer = (index) => index;
function createRange(length, initializer = defaultInitializer) {
    return [...new Array(length)].map((_, index) => initializer(index));
}

const initial = Array.from({ length: 2 }, (v, k) => k).map(k => {
    const custom = {
        id: `id-${k}`,
        content: `Quote ${k}`
    };

    return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const StepTwo = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();


    const [state, setState] = useState({
        quotes: [
            { id: "id-1", gridL: 2, },
            { id: "id-2", gridL: 10, },
        ]
    });

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(
            state.quotes,
            result.source.index,
            result.destination.index
        );

        setState({ quotes });
    }

    const components = [
        { name: "Текст", icon: <TextFieldsIcon />, type: "text" },
        { name: "Заголовок", icon: <TitleIcon />, type: "h" },
        { name: "Изображение", icon: <ImageIcon />, type: "img" },
        { name: "Опрос", icon: <QuestionAnswerIcon />, type: "quiz" },
        { name: "Замечание", icon: <NotificationsIcon />, type: "alert" },
        { name: "Разделитель", icon: <VerticalAlignCenterIcon />, type: "divider" },
    ]


    const [open, setOpen] = React.useState(false);
    const [hidden, setHidden] = React.useState(false);

    const handleVisibility = () => {
        setHidden((prevHidden) => !prevHidden);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (type) => {
        managmentStore.pushNewComponent(type)
        setOpen(false);
    };


    return (
        <StyledGrid
            sx={{
                width: "calc(100% - 16px)",
                height: "100%",
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{
                    position: 'absolute',
                    top: "72px",
                    left: 2,
                }}
                hidden={hidden}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
            >
                {components.map((action) => (
                    <SpeedDialAction
                        className={classes.speedDialAction}
                        tooltipPlacement="right"
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => handleClose(action.type)}
                    />
                ))}
            </SpeedDial>
            {managmentStore.pageCreation.components.length === 0 && <Grid
                item
                container
                direction="column"
                className={classes.gridMainImgWrapper}
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h5" className={classes.infoLabel}> Страница пока пуста </Typography>
                <Typography variant="h5" className={classes.infoLabel}> Добавьте компоненты </Typography>
                <Image
                    quality={100}
                    alt="howtocreateamodule"
                    src="/illustrations/mathTeacher.png"
                    //layout='fill'
                    width={480}
                    height={480}
                />
            </Grid>}
            {managmentStore.pageCreation.components.length != 0 && <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    ml: 12,
                    mt: 2,
                    mb: 2,
                    mr: 12,
                    //paddingLeft: 4,
                    padding: 0,
                    width: "100%",
                    height: "100%",
                    maxWidth: 1200,
                    display: "block",
                }}
            >
                <DnDList state={managmentStore.pageCreation.components} setState={managmentStore.setPageCreation} ComponentsList={<ComponentsList />} />
            </Grid >}
        </StyledGrid>
    );
}))

export default StepTwo
