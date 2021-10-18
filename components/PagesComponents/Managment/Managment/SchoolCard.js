import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import cx from 'clsx';
import { Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, useTheme } from '@mui/material';


import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import { inject, observer } from 'mobx-react'

const PREFIX = 'AuthorCard';

const classes = {
    gridCard: `${PREFIX}-gridCard`,
    card: `${PREFIX}-card`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.gridCard}`]: {
        padding: 8,
    },

    [`& .${classes.card}`]: {
        position: 'relative',
        //paddingLeft: 4,
        border: '2px solid',
        borderColor: theme => theme.palette.primary.dark,
        borderRadius: 32,
        transition: '0.4s',
        '&:hover': {
            borderColor: theme => theme.palette.primary.light,
        },
        // marginTop: theme => theme.spacing(8),

        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: theme => theme.palette.blueGrey["5"],
    }
}));

const AuthorCard = inject('store')(observer(({ store }) => {
    const theme = useTheme();



    return (
        <StyledGrid
            xs={12} sm={12} md={6} lg={4} xl={3}
            item
            container
            className={classes.gridCard}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Card className={cx(classes.card)}>

            </Card>
        </StyledGrid>
    );
}));



export default AuthorCard;