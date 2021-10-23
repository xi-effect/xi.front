import React from 'react';

import { styled } from '@mui/material/styles';

import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Toolbar from './Reports/Toolbar';
import DataList from './Reports/DataList';
import DialogReports from './Reports/DialogReports';
const PREFIX = 'Reports';
const classes = {};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({}));


const Reports = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();


    const [packageId, setPackageId] = React.useState(null)
    const [openDialogReports, setOpenDialogReports] = React.useState(false)

    return (
        <StyledGrid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid>
                <Typography variant="h5"> Модерация жалоб </Typography>
                <Typography variant="h6"> Откройте один из представленных ниже пакетов с жалобами на конкретный контент и совершите необходимые действия </Typography>
            </Grid>
            <Grid>
                {/* <Toolbar /> */}
            </Grid>
            <DataList setPackageId={setPackageId} setOpenDialogReports={setOpenDialogReports} />
            <DialogReports packageId={packageId} openDialogReports={openDialogReports} setOpenDialogReports={setOpenDialogReports} />
        </StyledGrid>
    );
}));


export default Reports;