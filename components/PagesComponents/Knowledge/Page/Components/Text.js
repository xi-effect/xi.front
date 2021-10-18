import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Input, Grid, useTheme } from '@mui/material';

import { inject, observer } from 'mobx-react'

const PREFIX = 'Text';

const classes = {
    gridTextWrapper: `${PREFIX}-gridTextWrapper`,
    text: `${PREFIX}-text`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.gridTextWrapper}`]: {
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
    }
}));


const Text = inject('rootStore')(observer(({ rootStore, value }) => {

    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };

    // console.log("props", props)
    const theme = useTheme();


    return (
        (<Root>
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
        </Root>)
    );
}));

// onClickAway={() => setEdit(false)}

export default Text