import React from 'react';
import { Grid, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Divider, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        margin: '0',
        padding: '0',
        backgroundImage: 'url(https://cdna.artstation.com/p/assets/images/images/012/086/010/large/mikael-gustafsson-amongtrees-2-8.jpg?1532971442)',
        height: '100%',
        width: '100%',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundColor: '#659DBD ',
    },
    textgrid: {
        marginTop: '20%',
        paddingLeft: '5%',
    },
    text: {
        // [theme.breakpoints.up('sm')]: {
        //     fontSize: '200px',
        // },
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: '100px',
        // },
        fontSize: '100px',
        color: "#ffffff",
        fontSize: '200px',
        fontFamily: 'Roboto',
        fontFamily: 'sans-serif',
    },
    divider: {
        width: '4px',
        marginTop: '20%',
        // [theme.breakpoints.up('sm')]: {
        //     height: '280px',
        // },
        // [theme.breakpoints.down('sm')]: {
        //     height: '140px',
        // },
        height: '140px',
        marginLeft: '8px',
        backgroundColor: "#ffffff",
    },
    text2grid: {
        marginTop: '20%',
        paddingLeft: '16px',
    },
    text2: {
        //paddingTop: '420px',
        color: "#ffffff",
        // [theme.breakpoints.up('sm')]: {
        //     fontSize: '48px',
        // },
        // [theme.breakpoints.down('sm')]: {
        //     fontSize: '36px',
        // },
        fontSize: '36px',
        fontFamily: 'Roboto',
        fontFamily: 'sans-serif',
    }
}));

export default function _404() {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div className={classes.root}>
            <Grid container direction="row" >
                <Grid item className={classes.textgrid}>
                    <Typography className={classes.text}>404</Typography>
                </Grid>
                <Divider orientation="vertical" flexItem className={classes.divider} />
                <Grid item className={classes.text2grid}>
                    <Typography className={classes.text2}>Упс,<br /> вы заблудились... <br />Если вам грустно, <br />Можно погладить Оленя</Typography>
                </Grid>
            </Grid>
        </div>
    )
}