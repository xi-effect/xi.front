import React from 'react';
import { styled } from '@mui/material/styles';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid, Divider, List, ListItem, useTheme } from '@mui/material';

import clsx from 'clsx';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const PREFIX = 'Lessons';

const classes = {
    paperGrid: `${PREFIX}-paperGrid`,
    labelGrid: `${PREFIX}-labelGrid`,
    paper: `${PREFIX}-paper`,
    mainLabel: `${PREFIX}-mainLabel`,
    arrowIcon: `${PREFIX}-arrowIcon`,
    arrowIconOpen: `${PREFIX}-arrowIconOpen`,
    divider: `${PREFIX}-divider`,
    itemGrid: `${PREFIX}-itemGrid`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.paperGrid}`]: {
        width: "calc(100% - 128px)",
        margin: 0,
    },

    [`& .${classes.labelGrid}`]: {
        marginTop: 12,
        //height: 64,
        //width: "100%",
    },

    [`& .${classes.paper}`]: {
        //width: "100%",
        borderRadius: 16,
        //height: 64,
        backgroundColor: theme => theme.palette.blueGrey["4"],
        cursor: "default",
    },

    [`& .${classes.mainLabel}`]: {
        marginLeft: 16,
        marginRight: "auto",
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.arrowIcon}`]: {
        marginRight: 8,
        height: 24,
        width: 24,
        color: theme => theme.palette.primary.contrastText,
        transition: "all 0.4s",
        cursor: "pointer",
    },

    [`& .${classes.arrowIconOpen}`]: {
        transition: "all 0.4s",
        transform: "rotate(-0.25turn)"
    },

    [`& .${classes.divider}`]: {
        height: 1,
        marginTop: 4,
        marginBottom: 4,
        width: "100%",
        backgroundColor: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.itemGrid}`]: {
        '&:hover': {
            backgroundColor: theme => theme.palette.blueGrey["3"],
        },
        margin: 16,
        width: "calc(100% - 32px)",
    }
}));

const Lessons = inject('store')(observer(({ store }) => {

    const theme = useTheme();

    const menuList = [
        { label: "Урок 0", open: false },
        { label: "Урок 1", open: false },
        { label: "Урок 2", open: false },
        { label: "Урок 3", open: false },
        { label: "Урок 4", open: false },
    ]

    const [open, setOpen] = React.useState(false)

    return (
        <StyledGrid
            item
            container
            xs={12} sm={12} md={4} lg={4} xl={4}
            className={classes.paperGrid}
        >
            <Paper className={classes.paper} elevation={8}>
                <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className={classes.labelGrid}
                        wrap="nowrap"
                    >
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4" className={classes.mainLabel} noWrap> Уроки </Typography>
                        </Grid>
                        <ArrowForwardIcon className={classes.arrowIcon} />
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        className={classes.labelGrid}
                    >
                        {menuList.map((item, index) =>
                            <Grid
                                container
                                className={classes.itemGrid}
                                key={index}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography> {item.label} </Typography>
                                <ArrowBackIosIcon onClick={() => setOpen(!open)} className={clsx(classes.arrowIcon, { [classes.arrowIconOpen]: open })} />
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </StyledGrid>
    );
}));

export default Lessons;