import React, { useState } from 'react';
import { useTheme, Input, Grid, Alert, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const useStyles = makeStyles((theme) => ({
    gridTextWrapper: {
        //textAlign: "center !important",
        width: "100%",
    },
    text: {
        width: "100%",
        color: props => props.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    },
    Alert: {
        width: "100%",
    },
    AlertMessage: {
        width: "100%",
    },
    icon: {
        color: props => props.palette.primary.contrastText,
    },
}));


const AlertComp = inject('rootStore')(observer(({ rootStore, value }) => {

    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    //console.log( "props", props )
    const theme = useTheme();
    const classes = useStyles({ ...props, ...theme });

    return (
        <>
            <Grid className={classes.gridTextWrapper}>
                <Alert
                    variant="filled"
                    className={classes.Alert}
                    severity={value.alertType}
                    classes={{
                        message: classes.AlertMessage
                    }}
                    icon={<span></span>}
                >
                    <Input
                        classes={{
                            input: classes.text
                        }}
                        type="text"
                        disableUnderline
                        multiline
                        fullWidth
                        value={value.label}
                        readOnly
                        startAdornment={
                            <InputAdornment position="start">
                                {value.alertType === "success" && <CheckCircleIcon className={classes.icon} />}
                                {value.alertType === "info" && <InfoIcon className={classes.icon} />}
                                {value.alertType === "warning" && <WarningIcon className={classes.icon} />}
                                {value.alertType === "error" && <ErrorIcon className={classes.icon} />}
                            </InputAdornment>
                        }
                    />
                </Alert>
            </Grid>
        </>
    );
}));

export default AlertComp