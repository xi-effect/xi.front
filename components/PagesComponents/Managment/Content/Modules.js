import React from 'react';

import { styled } from '@mui/material/styles';

import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Toolbar from './Modules/Toolbar';
import DataList from './Modules/DataList';
import DialogModuleCreation from './Modules/DialogModuleCreation';

const Modules = inject('store')(observer(({ store }) => {
    const theme = useTheme();


    const [dialogModuleCreation, setDialogModuleCreation] = React.useState(false)

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid>
                <Typography variant="h5"> Управление контентом </Typography>
            </Grid>
            <Grid>
                <Toolbar setDialogModuleCreation={setDialogModuleCreation} />
            </Grid>
            <DialogModuleCreation dialogModuleCreation={dialogModuleCreation} setDialogModuleCreation={setDialogModuleCreation} />
            <DataList />
        </Grid>
    );
}));


export default Modules;