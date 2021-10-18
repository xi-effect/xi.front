import React from 'react';
import { styled } from '@mui/material/styles';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid, useTheme } from '@mui/material';


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Lessons from './QuickWidgets/Lessons';
import Homework from './QuickWidgets/Homework';
import Profile from './QuickWidgets/Profile';

const PREFIX = 'QuiсkWidgets';

const classes = {
    root: `${PREFIX}-root`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        padding: 8,
    }
}));

const QuiсkWidgets = inject('rootStore')(observer(({ rootStore }) => {

    const theme = useTheme();

    return (
        <StyledGrid
            container
            direction="row"
            className={classes.root}
        >
            <Lessons />
            <Homework />
            <Profile />
        </StyledGrid>
    );
}));

export default QuiсkWidgets;