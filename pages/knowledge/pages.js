/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import Chipper from '../../components/PagesComponents/Knowledge/Pages/Chipper';
import PagesList from '../../components/PagesComponents/Knowledge/Pages/PagesList';
import PagesListLoading from '../../components/PagesComponents/Knowledge/Pages/PagesListLoading';

const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 64 }}
        >
            <Button onClick={knowledgeStore.prevPageInPages} sx={{ mr: 2, ml: 2, color: 'text.main' }} variant="contained" color="primary" disabled={knowledgeStore.pageList.counter === 0 ? true : false}>
                Назад
            </Button>
            <Typography variant="subtitle1">
                {`Страница ${knowledgeStore.pageList.counter + 1}`}
            </Typography>
            <Button onClick={knowledgeStore.nextPageInPages} sx={{ mr: 2, ml: 2, color: 'text.main' }} variant="contained" color="primary" disabled={knowledgeStore.pageList.pages.length < 50 ? true : false}>
                Вперёд
            </Button>
        </Grid>
    );
}));

const Pages = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {


    // React.useEffect(() => {
    //     uiStore.setKnowledgeUI("contentTypeOnPage", localStorage.getItem("contentTypeOnPageInKnowleadge") != undefined ? localStorage.getItem("contentTypeOnPageInKnowleadge") : "info")
    //     uiStore.setKnowledgeUI("gridTypeOnPage", localStorage.getItem("gridTypeOnPageInKnowleadge") != undefined ? localStorage.getItem("gridTypeOnPageInKnowleadge") : "grid")
    // }, [])

    React.useEffect(() => {
        knowledgeStore.loadPageList()
    }, []);

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll haveRightToolbar>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // width: 'calc(100% - 32px)',
                        pb: 20,
                        width: '100%',
                        zIndex: 1,
                    }}
                >
                    {/* <Chipper /> */}
                    {knowledgeStore.pageList.loadingInd && <PagesListLoading />}
                    {!knowledgeStore.pageList.loadingNothing && <>
                        <PagesList />
                        {knowledgeStore.pageList.pages.length < 50 && <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                pt: 6,
                                marginBottom: 2,
                                height: '100%',
                                width: '100%',
                            }}
                        >
                            <Typography> Это всё, что мы нашли по вашему запросу </Typography>
                        </Grid>}
                        {!knowledgeStore.pageList.loadingInd && <Toolbar />}
                    </>}
                    {knowledgeStore.pageList.loadingNothing &&
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                                height: '100%',
                                // width: '100%',
                            }}
                        >
                            <Typography sx={{ marginTop: 4 }}> Ничего не найдено по запросу </Typography>
                            <div>
                                <Image
                                    alt="img"
                                    src="/app/NoData.svg"
                                    //layout="fill"
                                    width={256}
                                    height={236}
                                //objectFit="cover"
                                //quality={100}
                                />
                            </div>
                        </Grid>
                    }
                </Grid>
            </NavigationAll>
        </>
    )
}));


export default Pages;