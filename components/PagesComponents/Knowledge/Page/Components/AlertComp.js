import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme, Input, Grid, Alert, InputAdornment } from '@mui/material';

import { inject, observer } from 'mobx-react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const AlertComp = inject('rootStore')(observer(({ rootStore, value }) => {

    // Simulated props for the purpose of the example
    //console.log( "props", props )
    const theme = useTheme();


    return (
        <Grid sx={{ width: "100%", }}>
            <Alert
                variant="filled"
                sx={{ width: "100%", }}
                severity={value.alertType}

                icon={<span></span>}
            >
                <Input
                    sx={{
                        '& .MuiInput-input': {
                            width: "100%",
                            color: 'text.main',
                            fontSize: value.fontSize,
                            fontStyle: value.fontStyle,
                            textAlign: value.textAlign,
                            fontWeight: value.fontWeight,
                            textDecoration: value.textDecoration,
                            lineHeight: "normal",
                        }
                    }}
                    type="text"
                    disableUnderline
                    multiline
                    fullWidth
                    value={value.label}
                    readOnly
                    startAdornment={
                        <InputAdornment position="start">
                            {value.alertType === "success" && <CheckCircleIcon />}
                            {value.alertType === "info" && <InfoIcon />}
                            {value.alertType === "warning" && <WarningIcon />}
                            {value.alertType === "error" && <ErrorIcon />}
                        </InputAdornment>
                    }
                />
            </Alert>
        </Grid>
    );
}));

export default AlertComp