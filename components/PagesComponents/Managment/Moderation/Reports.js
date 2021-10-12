import React from 'react';

import { CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Toolbar from './Reports/Toolbar';
import DataList from './Reports/DataList';
import DialogReports from './Reports/DialogReports';
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({

}));


const Reports = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme(theme);
    const classes = useStyles();

    const [packageId, setPackageId] = React.useState(null)
    const [openDialogReports, setOpenDialogReports] = React.useState(false)

    return (
        <Grid
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
        </Grid>
    )
}));


export default Reports;