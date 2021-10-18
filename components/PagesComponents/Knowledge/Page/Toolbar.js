import React from 'react';

import { styled } from '@mui/material/styles';

import { Tooltip, Skeleton, Divider, Grid, Typography, useTheme, IconButton } from '@mui/material';


import { inject, observer } from 'mobx-react'

import { useRouter } from 'next/router'

import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';

const PREFIX = 'Toolbar';

const classes = {
    wrapperRoot: `${PREFIX}-wrapperRoot`,
    IconButton: `${PREFIX}-IconButton`,
    mainLabel: `${PREFIX}-mainLabel`,
    divider: `${PREFIX}-divider`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.wrapperRoot}`]: {
        marginTop: 8,
        marginLeft: 8,
        maxWidth: 800,
    },

    [`& .${classes.IconButton}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.mainLabel}`]: {
        color: theme => theme.palette.primary.contrastText,
        fontWeight: "bolder",
    },

    [`& .${classes.divider}`]: {
        backgroundColor: theme => theme.palette.primary.contrastText,
        width: "100%",
        height: 1,
        maxWidth: 800,
    }
}));


const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const theme = useTheme();


    const router = useRouter()

    return (
        <Root>
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
                    <IconButton onClick={null} className={classes.IconButton} size="large">
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Назад">
                    <IconButton onClick={() => router.back()} className={classes.IconButton} size="large">
                        <UndoIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Divider className={classes.divider} />
        </Root>
    );
}));


export default Toolbar;