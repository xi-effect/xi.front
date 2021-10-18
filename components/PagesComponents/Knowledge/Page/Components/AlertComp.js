import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme, Input, Grid, Alert, InputAdornment } from '@mui/material';

import { inject, observer } from 'mobx-react'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const PREFIX = 'AlertComp';

const classes = {
    gridTextWrapper: `${PREFIX}-gridTextWrapper`,
    text: `${PREFIX}-text`,
    Alert: `${PREFIX}-Alert`,
    AlertMessage: `${PREFIX}-AlertMessage`,
    icon: `${PREFIX}-icon`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.gridTextWrapper}`]: {
        //textAlign: "center !important",
        width: "100%",
    },

    [`& .${classes.text}`]: {
        width: "100%",
        color: props => props.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    },

    [`& .${classes.Alert}`]: {
        width: "100%",
    },

    [`& .${classes.AlertMessage}`]: {
        width: "100%",
    },

    [`& .${classes.icon}`]: {
        color: props => props.palette.primary.contrastText,
    }
}));


const AlertComp = inject('rootStore')(observer(({ rootStore, value }) => {

    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };

    //console.log( "props", props )
    const theme = useTheme();


    return (
        (<Root>
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
        </Root>)
    );
}));

export default AlertComp