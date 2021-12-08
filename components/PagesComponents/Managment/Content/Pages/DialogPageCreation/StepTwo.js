import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import clsx from 'clsx';
import { ToggleButton, ToggleButtonGroup, SpeedDial, SpeedDialIcon, SpeedDialAction, Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';



import { inject, observer } from 'mobx-react'


import DnDList from './../../../../../OtherComponents/DnDList/DnDList';
import ComponentsList from './Components/ComponentsList';


const StepTwo = inject('managmentStore')(observer(({ managmentStore }) => {

    return (
        <Grid
            sx={{
                width: "calc(100% - 16px)",
                height: "100%",
            }}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            {managmentStore.pageCreation.components.length === 0 && <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    height: "calc(100vh - 156px)",
                }}
            >
                <Typography variant="h5" sx={{ color: 'text.main' }}> Страница пока пуста </Typography>
                <Typography variant="h5" sx={{ color: 'text.main' }}> Добавьте компоненты </Typography>
                <Image
                    quality={100}
                    alt="howtocreateamodule"
                    src="/svg/Document.svg"
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
        </Grid>
    );
}))

export default StepTwo
