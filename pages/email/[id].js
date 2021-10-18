import * as React from 'react';
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { CircularProgress, useTheme, Divider, Paper, Grid, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Box, Container, Fab, Zoom, Button } from '@mui/material';



import { inject, observer } from 'mobx-react'
import BackgroundImg from '../../components/OtherComponents/Background/BackgroundImg'
import Loading from './../../components/OtherComponents/Loading/Loading';

const PREFIX = 'Email';

const classes = {
    root: `${PREFIX}-root`,
    main: `${PREFIX}-main`,
    gridLabelMain: `${PREFIX}-gridLabelMain`,
    gridLabelSecondary: `${PREFIX}-gridLabelSecondary`,
    gridLabelSecondarytwo: `${PREFIX}-gridLabelSecondarytwo`,
    labelSecondarytwo: `${PREFIX}-labelSecondarytwo`,
    labelMain: `${PREFIX}-labelMain`,
    labelSecondary: `${PREFIX}-labelSecondary`,
    gridDivider: `${PREFIX}-gridDivider`,
    divider: `${PREFIX}-divider`,
    circularProgress: `${PREFIX}-circularProgress`,
    gridroot: `${PREFIX}-gridroot`,
    acceptButton: `${PREFIX}-acceptButton`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: '-1',
        overflowY: 'auto',
        overflowX: 'hidden',
    },

    [`& .${classes.main}`]: {
        zIndex: 999,
    },

    [`& .${classes.gridLabelMain}`]: {
        paddingLeft: 16,
        cursor: 'default',
        paddingTop: 160,
        zIndex: 999,
    },

    [`& .${classes.gridLabelSecondary}`]: {
        paddingLeft: 16,
        paddingRight: 16,
        cursor: 'default',
        paddingTop: 16,
        zIndex: 999,
    },

    [`& .${classes.gridLabelSecondarytwo}`]: {
        paddingLeft: 16,
        paddingRight: 16,
        cursor: 'default',
        paddingTop: 2,
    },

    [`& .${classes.labelSecondarytwo}`]: {
        zIndex: 999,
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.labelMain}`]: {
        fontWeight: 'bold',
        color: theme => theme.palette.primary.contrastText,
        [theme => theme.breakpoints.up('lg')]: {
            fontSize: 48,
        },
        [theme => theme.breakpoints.only('lg')]: {
            fontSize: 40,
        },
        [theme => theme.breakpoints.down('xl')]: {
            fontSize: 24,
        },
        fontSize: 24,
        zIndex: 999,
    },

    [`& .${classes.labelSecondary}`]: {
        color: theme => theme.palette.primary.contrastText,
        fontSize: 20,
        zIndex: 999,
    },

    [`& .${classes.gridDivider}`]: {
        marginTop: '80vh',
        //marginBottom: '100px',
        marginLeft: '10px',
        marginRight: '10px',
        width: 'auto',
    },

    [`& .${classes.divider}`]: {
        zIndex: 999,
        height: 2,
        // width: 'auto',
        // marginLeft: '10px',
        // marginRight: '10px',
        backgroundColor: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.circularProgress}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.gridroot}`]: {
        width: '100vw',
        minHeight: '100vh',
    },

    [`& .${classes.acceptButton}`]: {
        borderRadius: 12,
        zIndex: 999,
        color: theme => theme.palette.primary.contrastText,
        marginTop: 32,
    }
}));


const Email = inject('store')(observer(({ store }) => {
    const theme = useTheme();

    const router = useRouter()
    const { id } = router.query

    const [ok, setOk] = React.useState(false)

    const acceptButtonClicked = () => {
        store.fetchData(`${store.url}/email-confirm/`, "POST", { "code": id },)
            .then((data) => {
                //console.log(data)
                if (data.a) { //"Success"
                    setOk(true)
                }
            })
    }

    return (
        (<Root>
            <Head>
                <title>
                    Ξ Регистрация
                </title>
            </Head>
            <div className={classes.root}>
                <BackgroundImg src="/wallpapers/hp4.jpg" />
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" className={classes.gridroot}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridLabelMain}>
                        <Typography className={classes.labelMain}> Подтверждение почты </Typography>
                    </Grid>
                    {!ok && <Button color="primary" variant="contained" onClick={acceptButtonClicked} className={classes.acceptButton}>
                        Подтвердить
                    </Button>}
                    {/* {!props.store.emailCheck.serverAnswer && <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridLabelSecondary}>
                        <CircularProgress className={classes.circularProgress} />
                    </Grid>} */}
                    {ok && <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridLabelSecondary}>
                        <Typography className={classes.labelSecondary}> Ваша почта успешно подтверждена. С этой страницы можно уходить.</Typography>
                    </Grid>}
                </Grid>
            </div>
        </Root>)
    );
}))

export default Email