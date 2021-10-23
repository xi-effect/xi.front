import React from 'react';

import { styled } from '@mui/material/styles';

import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import Toolbar from './Content/Toolbar';
import DataList from './Content/DataList';
const PREFIX = 'Content';
const classes = {};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({}));

const Content = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();


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