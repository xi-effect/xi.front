import React, { useState } from 'react';
import { useTheme, Input, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react'


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
    }
}));


const Header = inject('rootStore')(observer(({ rootStore, value }) => {

    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    //console.log( "props", props )
    const theme = useTheme();
    const classes = useStyles({ ...props, ...theme });

    return (
        <>
            <Grid className={classes.gridTextWrapper}>
                <Input
                    classes={{
                        input: classes.text
                    }}
                    type="text"
                    //className={classes.text}
                    readOnly
                    disableUnderline
                    multiline
                    fullWidth
                    value={value.label}
                />
            </Grid>
        </>
    );
}));

export default Header