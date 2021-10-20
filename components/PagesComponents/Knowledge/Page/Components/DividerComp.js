import React, { useState } from 'react';
import { useTheme, Input, Grid, Divider } from '@mui/material';

import { inject, observer } from 'mobx-react'

const DividerComp = inject('rootStore')(observer(({ rootStore, value }) => {
    // Simulated props for the purpose of the example

    //console.log( "props", props )
    const theme = useTheme();


    return (
        <Grid sx={{ width: "100%", }}>
            <Divider flexItem sx={{
                width: "100%",
                height: "2px",
                marginTop: 1,
                marginBottom: 1,
            }} />
        </Grid>
    );
}));

export default DividerComp