/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { styled } from '@mui/material/styles';

import { Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Chipper from './Pages/Chipper';
import PagesList from './Pages/PagesList';

const PREFIX = 'Pages';

const classes = {
    Button: `${PREFIX}-Button`,
    Typography: `${PREFIX}-Typography`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.Button}`]: {
        marginLeft: 16,
        marginRight: 16,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.Typography}`]: {
        color: theme => theme.palette.primary.contrastText,
    }
}));


{
    theme
}
) => ({
    [`& .${classes.Button}`]: {
        marginLeft: 16,
        marginRight: 16,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.Typography}`]: {
        color: theme => theme.palette.primary.contrastText,
    }
}));

const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const theme = useTheme();


    return (
        (<Root>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: 10, }}
            >
                <Button onClick={knowledgeStore.prevPageInPages} className={classes.Button} variant="contained" color="primary" disabled={knowledgeStore.pageList.counter === 0 ? true : false}>
                    Назад
                </Button>
                <Typography className={classes.Typography} variant="subtitle1">
                    {`Страница ${knowledgeStore.pageList.counter + 1}`}
                </Typography>
                <Button onClick={knowledgeStore.nextPageInPages} className={classes.Button} variant="contained" color="primary" disabled={knowledgeStore.pageList.pages.length < 50 ? true : false}>
                    Вперёд
                </Button>
            </Grid>
        </Root>)
    );
}));

const Pages = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();


    React.useEffect(() => {
        uiStore.setKnowledgeUI("contentTypeOnPage", localStorage.getItem("contentTypeOnPageInKnowleadge") != undefined ? localStorage.getItem("contentTypeOnPageInKnowleadge") : "info")
        uiStore.setKnowledgeUI("gridTypeOnPage", localStorage.getItem("gridTypeOnPageInKnowleadge") != undefined ? localStorage.getItem("gridTypeOnPageInKnowleadge") : "grid")
    }, [])

    React.useEffect(() => {
        knowledgeStore.loadPageList()
    }, []);

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classes.container}
            >
                <Chipper />
                {!knowledgeStore.pageList.loadingNothing && <>
                    {!knowledgeStore.pageList.loadingInd && <PagesList />}
                    {!knowledgeStore.pageList.loadingInd && knowledgeStore.pageList.pages.length < 50 && <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.container}
                    >
                        <Typography className={classes.labelThatsAll}> Это всё, что мы нашли по вашему запросу </Typography>
                    </Grid>}
                    {!knowledgeStore.pageList.loadingInd && <Toolbar />}
                    {knowledgeStore.pageList.loadingInd &&
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.container}
                        >
                            <CircularProgress />
                        </Grid>
                    }
                </>}
                {knowledgeStore.pageList.loadingNothing &&
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.container}
                    >
                        <Typography className={classes.nothingSearchLabel}> Ничего не найдено по запросу </Typography>
                        <div>
                            <Image
                                alt="img"
                                src="/illustrations/astronaut.png"
                                //layout="fill"
                                width={600}
                                height={562}
                            //objectFit="cover"
                            //quality={100}
                            />
                        </div>
                    </Grid>
                }
            </Grid>

        </>
    )
}));


export default Pages;