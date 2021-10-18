import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme, Input, Grid, Divider } from '@mui/material';

import { inject, observer } from 'mobx-react'


const PREFIX = 'DividerComp';

const classes = {
    gridTextWrapper: `${PREFIX}-gridTextWrapper`,
    dividerBlock: `${PREFIX}-dividerBlock`
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

    [`& .${classes.dividerBlock}`]: {
        width: "100%",
        height: 2,
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: theme => theme.palette.primary.contrastText,
    }
}));


const DividerComp = inject('rootStore')(observer(({ rootStore, value }) => {
    // Simulated props for the purpose of the example

    //console.log( "props", props )
    const theme = useTheme();


    return (
        (<Root>
            <Grid className={classes.gridTextWrapper}>
                <Divider flexItem className={classes.dividerBlock} />
            </Grid>
        </Root>)
    );
}));

export default DividerComp