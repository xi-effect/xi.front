import React from 'react';

import { styled } from '@mui/material/styles';

import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Toolbar from './Modules/Toolbar';
import DataList from './Modules/DataList';
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';
import DialogModuleCreation from './Modules/DialogModuleCreation';

const PREFIX = 'Modules';

const classes = {
    gridToolbar: `${PREFIX}-gridToolbar`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`& .${classes.gridToolbar}`]: {
        marginTop: 16,
    }
}));


const Modules = inject('store')(observer(({ store }) => {
    const theme = useTheme();


    const [dialogModuleCreation, setDialogModuleCreation] = React.useState(false)

    return (
        <StyledGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid>
                <Typography variant="h5"> Управление контентом </Typography>
            </Grid>
            <Grid className={classes.gridToolbar}>
                <Toolbar setDialogModuleCreation={setDialogModuleCreation} />
            </Grid>
            <DialogModuleCreation dialogModuleCreation={dialogModuleCreation} setDialogModuleCreation={setDialogModuleCreation} />
            <DataList />
        </StyledGrid>
    );
}));


export default Modules;