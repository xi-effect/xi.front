import React from 'react';

import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import Toolbar from './Content/Toolbar';
import DataList from './Content/DataList';
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({

}));

const Content = inject('rootStore')(observer(({ rootStore }) => {
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
                <Typography variant="h5"> Модерация контента </Typography>
                <Typography variant="h6"> Откройте один из представленных ниже пакетов с жалобами на конкретный контент и совершите необходимые действия </Typography>
            </Grid>
            <Grid>
                {/* <Toolbar /> */}
            </Grid>
            <DataList />
        </Grid >
    )
}));


export default Content;