/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";
import PagesList from "../../components/PagesComponents/Knowledge/Pages/PagesList";
import PagesListLoading from "../../components/PagesComponents/Knowledge/Pages/PagesListLoading";

const Toolbar = inject("knowledgeSt")(observer(({ knowledgeSt }) => (
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 64 }}
    >
        <Button onClick={knowledgeSt.prevPageInPages} sx={{ mr: 2, ml: 2, color: "text.main" }} variant="contained" color="primary" disabled={knowledgeSt.pageList.counter === 0}>
            Назад
        </Button>
        <Typography variant="subtitle1">
            {`Страница ${knowledgeSt.pageList.counter + 1}`}
        </Typography>
        <Button onClick={knowledgeSt.nextPageInPages} sx={{ mr: 2, ml: 2, color: "text.main" }} variant="contained" color="primary" disabled={knowledgeSt.pageList.pages.length < 50}>
            Вперёд
        </Button>
    </Grid>
)));

const Pages = inject("knowledgeSt")(observer(({ knowledgeSt }) => {


    // React.useEffect(() => {
    //     uiSt.setKnowledgeUI("contentTypeOnPage", localStorage.getItem("contentTypeOnPageInKnowleadge") != undefined ? localStorage.getItem("contentTypeOnPageInKnowleadge") : "info")
    //     uiSt.setKnowledgeUI("gridTypeOnPage", localStorage.getItem("gridTypeOnPageInKnowleadge") != undefined ? localStorage.getItem("gridTypeOnPageInKnowleadge") : "grid")
    // }, [])

    React.useEffect(() => {
        knowledgeSt.loadPageList()
    }, []);

    return (
        <>
            <Head>
                <title>
                    Ξffect | Страницы
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            {/* <Background/> */}
            <NavigationAll haveRightToolbar>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // width: "calc(100% - 32px)",
                        pb: 20,
                        width: "100%",
                        zIndex: 1,
                    }}
                >
                    {knowledgeSt.pageList.loadingInd && <PagesListLoading />}
                    {!knowledgeSt.pageList.loadingNothing && <>
                        <PagesList />
                        {knowledgeSt.pageList.pages.length < 50 && <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                pt: 6,
                                marginBottom: 2,
                                height: "100%",
                                width: "100%",
                            }}
                        >
                            <Typography> Это всё, что мы нашли по вашему запросу </Typography>
                        </Grid>}
                        {!knowledgeSt.pageList.loadingInd && <Toolbar />}
                    </>}
                    {knowledgeSt.pageList.loadingNothing &&
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                                height: "100%",
                                // width: "100%",
                            }}
                        >
                            <Typography sx={{ marginTop: 4 }}> Ничего не найдено по запросу </Typography>
                            <div>
                                <Image
                                    alt="img"
                                    src="/assets/app/NoData.svg"
                                    // layout="fill"
                                    width={256}
                                    height={236}
                                // objectFit="cover"
                                // quality={100}
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