import React from 'react';

import { styled } from '@mui/material/styles';

import { Tooltip, Skeleton, Divider, Grid, Typography, useTheme, IconButton } from '@mui/material';


import { inject, observer } from 'mobx-react'

import { useRouter } from 'next/router'

import UndoIcon from '@mui/icons-material/Undo';
import InfoIcon from '@mui/icons-material/Info';

const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const theme = useTheme();


    const router = useRouter()

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                wrap="nowrap"
                sx={{
                    marginTop: 1,
                    marginLeft: 1,
                    maxWidth: "800px",
                }}
            >
                <Grid item xs zeroMinWidth>
                    {
                        knowledgeStore.page.loading ? <Skeleton animation="wave" variant="text" /> :
                            <Typography variant="h5" sx={{ fontWeight: "bolder", }} noWrap>{knowledgeStore.page.name}</Typography>
                    }
                </Grid>
            </Grid>
            <Divider sx={{
                width: "100%",
                height: "1px",
                maxWidth: "800px",
            }} />
        </>
    );
}));


export default Toolbar;