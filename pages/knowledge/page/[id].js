/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Grid, FormControlLabel, Button, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


import { inject, observer } from 'mobx-react'

import NavigationAll from './../../../components/OtherComponents/Navigation/NavigationAll';
import PageCompList from './../../../components/PagesComponents/Knowledge/Page/PageCompList';
import Toolbar from '../../../components/PagesComponents/Knowledge/Page/Toolbar';

const PREFIX = 'Page';

const classes = {
    main: `${PREFIX}-main`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.main}`]: {
        margin: 4,
        width: 'calc(100% - 16px)',
        zIndex: 1,
        //backgroundColor: 'red',
    }
}));

const Page = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {
    const theme = useTheme();


    React.useEffect(() => {
        // LoadComponents()
        knowledgeStore.loadPage()
    }, []);



    return (
        (<Root>
            <Head>
                <title>
                    Ξ Effect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid
                    className={classes.main}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    container
                >
                    <Toolbar />
                    <PageCompList />
                </Grid>
            </NavigationAll>
        </Root>)
    );
}))


export default Page