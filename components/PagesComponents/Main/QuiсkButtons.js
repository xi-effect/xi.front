import React from 'react';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 8,
        width: "calc(100% - 16px)",
    },
    paperGrid: {
        width: "calc(100% - 32px)",
        padding: 16,
    },
    paperInsideGrid: {
        paddingTop: 4,
        height: 64,
        width: "100%",
    },
    paper: {
        width: "100%",
        borderRadius: 16,
        height: 64,
        backgroundColor: theme => theme.palette.blueGrey["4"],
        cursor: "pointer",
    },
    mainLabel: {
        marginLeft: 8,
        marginRight: "auto",
        color: theme => theme.palette.primary.contrastText,
    },
    firstIcon: {
        marginLeft: 8,
        height: 36,
        width: 36,
        color: theme => theme.palette.primary.contrastText,
    },
    arrowIcon: {
        marginRight: 8,
        height: 36,
        width: 36,
        color: theme => theme.palette.primary.contrastText,
    }
}));

const QuiсkButtons = inject('rootStore')(observer(({ rootStore }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid
            container
            direction="row"
            className={classes.root}
        >
            <Grid
                item
                container
                xs={12} sm={12} md={4} lg={4} xl={4}
                className={classes.paperGrid}
            >
                <Paper className={classes.paper} elevation={8}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className={classes.paperInsideGrid}
                        wrap="nowrap"
                    >
                        <ScheduleIcon className={classes.firstIcon} />
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4" className={classes.mainLabel} noWrap> Расписание </Typography>
                        </Grid>
                        <ArrowForwardIcon className={classes.arrowIcon} />
                    </Grid>
                </Paper>
            </Grid>
            <Grid
                item
                container
                xs={12} sm={12} md={4} lg={4} xl={4}
                className={classes.paperGrid}
            >
                <Paper className={classes.paper} elevation={8}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className={classes.paperInsideGrid}
                        wrap="nowrap"
                    >
                        <FormatListBulletedIcon className={classes.firstIcon} />
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4" className={classes.mainLabel}> Задания </Typography>
                        </Grid>
                        <ArrowForwardIcon className={classes.arrowIcon} />
                    </Grid>
                </Paper>
            </Grid>
            <Grid
                item
                container
                xs={12} sm={12} md={4} lg={4} xl={4}
                className={classes.paperGrid}
            >
                <Paper className={classes.paper} elevation={8}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className={classes.paperInsideGrid}
                        wrap="nowrap"
                    >
                        <StarHalfIcon className={classes.firstIcon} />
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4" className={classes.mainLabel}> Оценки </Typography>
                        </Grid>
                        <ArrowForwardIcon className={classes.arrowIcon} />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}));

export default QuiсkButtons;