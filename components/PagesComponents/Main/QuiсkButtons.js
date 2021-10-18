import React from 'react';
import { styled } from '@mui/material/styles';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid, useTheme } from '@mui/material';


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const PREFIX = 'QuiсkButtons';

const classes = {
    root: `${PREFIX}-root`,
    paperGrid: `${PREFIX}-paperGrid`,
    paperInsideGrid: `${PREFIX}-paperInsideGrid`,
    paper: `${PREFIX}-paper`,
    mainLabel: `${PREFIX}-mainLabel`,
    firstIcon: `${PREFIX}-firstIcon`,
    arrowIcon: `${PREFIX}-arrowIcon`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        margin: 8,
        width: "calc(100% - 16px)",
    },

    [`& .${classes.paperGrid}`]: {
        width: "calc(100% - 32px)",
        padding: 16,
    },

    [`& .${classes.paperInsideGrid}`]: {
        paddingTop: 4,
        height: 64,
        width: "100%",
    },

    [`& .${classes.paper}`]: {
        width: "100%",
        borderRadius: 16,
        height: 64,
        backgroundColor: theme => theme.palette.blueGrey["4"],
        cursor: "pointer",
    },

    [`& .${classes.mainLabel}`]: {
        marginLeft: 8,
        marginRight: "auto",
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.firstIcon}`]: {
        marginLeft: 8,
        height: 36,
        width: 36,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.arrowIcon}`]: {
        marginRight: 8,
        height: 36,
        width: 36,
        color: theme => theme.palette.primary.contrastText,
    }
}));

const QuiсkButtons = inject('rootStore')(observer(({ rootStore }) => {

    const theme = useTheme();

    return (
        <StyledGrid
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
        </StyledGrid>
    );
}));

export default QuiсkButtons;