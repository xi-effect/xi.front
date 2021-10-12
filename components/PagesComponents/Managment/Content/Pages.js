/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { CircularProgress, Button, Grid, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Toolbar from './Pages/Toolbar';
import DataList from './Pages/DataList';
import DialogPageCreation from './Pages/DialogPageCreation';
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStylesToolbarBottom = makeStyles((theme) => ({
    Grid: {
        marginTop: 16,
    },
    Button: {
        marginLeft: 16,
        marginRight: 16,
        color: theme => theme.palette.primary.contrastText,
    },
    Typography: {
        color: theme => theme.palette.primary.contrastText,
    }
}));

const ToolbarBottom = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();
    const classes = useStylesToolbarBottom(theme);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.Grid}
            >
                <Button onClick={managmentStore.prevPageList} className={classes.Button} variant="contained" color="primary" disabled={managmentStore.pageCreationList.counter === 0 ? true : false}>
                    Назад
                </Button>
                <Typography className={classes.Typography} variant="subtitle1">
                    {`Страница ${managmentStore.pageCreationList.counter + 1}`}
                </Typography>
                <Button onClick={managmentStore.nextPageList} className={classes.Button} variant="contained" color="primary" disabled={managmentStore.pageCreationList.pages.length < 50 ? true : false}>
                    Вперёд
                </Button>
            </Grid>
        </>
    )
}));



const useStyles = makeStyles((theme) => ({
    gridToolbar: {
        marginTop: 16,
    }
}));


const Pages = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid>
                <Typography variant="h5"> Управление контентом  </Typography>
            </Grid>
            <Grid className={classes.gridToolbar}>
                <Toolbar />
            </Grid>
            <DialogPageCreation />
            <DataList />
            <ToolbarBottom />
        </Grid>
    )
}));


export default Pages;