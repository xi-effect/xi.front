import React from 'react';

import { Tooltip, Skeleton, Divider, Grid, Typography, useTheme, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

import { useRouter } from 'next/router'

import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';

const useStyles = makeStyles((theme) => ({
    wrapperRoot: {
        marginTop: 8,
        marginLeft: 8,
        maxWidth: 800,
    },
    IconButton: {
        color: theme => theme.palette.primary.contrastText,
    },
    mainLabel: {
        color: theme => theme.palette.primary.contrastText,
        fontWeight: "bolder",
    },
    divider: {
        backgroundColor: theme => theme.palette.primary.contrastText,
        width: "100%",
        height: 1,
        maxWidth: 800,
    }
}));


const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const router = useRouter()

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                wrap="nowrap"
                className={classes.wrapperRoot}
            >
                <Grid item xs zeroMinWidth>
                    {
                        knowledgeStore.page.loading ? <Skeleton animation="wave" variant="text" /> :
                            <Typography variant="h5" className={classes.mainLabel} noWrap>{knowledgeStore.page.name}</Typography>
                    }
                </Grid>
                <Tooltip title="Информация о странице">
                    <IconButton onClick={null} className={classes.IconButton}>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Назад">
                    <IconButton onClick={() => router.back()} className={classes.IconButton}>
                        <UndoIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Divider className={classes.divider} />
        </>
    )
}));


export default Toolbar;