/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from "@mui/material";
import { inject, observer } from "mobx-react";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";
import ModulesList from "../../components/PagesComponents/Knowledge/Modules/ModulesList";
import ModulesListLoading from "../../components/PagesComponents/Knowledge/Modules/ModulesListLoading";



const Toolbar = inject("knowledgeSt")(observer(({ knowledgeSt }) => (
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 64 }}
    >
        <Button onClick={knowledgeSt.prevPageInModules} sx={{ ml: 2, mr: 2, }} variant="contained" color="primary" disabled={knowledgeSt.moduleList.counter === 0}>
            Назад
        </Button>
        <Typography variant="subtitle1">
            {`Страница ${knowledgeSt.moduleList.counter + 1}`}
        </Typography>
        <Button onClick={knowledgeSt.nextPageInModules} sx={{ ml: 2, mr: 2, }} variant="contained" color="primary" disabled={knowledgeSt.moduleList.modules.length < 12}>
            Вперёд
        </Button>
    </Grid>
)));


const Modules = inject("knowledgeSt")(observer(({ knowledgeSt }) => {
    React.useEffect(() => {
        knowledgeSt.loadModuleList()
    }, []);

    return (
        <>
            <Head>
                <title>
                    Ξffect | Модули
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // height: "100%",
                        pb: 20,
                        width: "100%",
                        zIndex: 1,
                    }}
                >
                    {knowledgeSt.moduleList.loadingInd && <ModulesListLoading />}
                    {!knowledgeSt.moduleList.loadingNothing && <>
                        {!knowledgeSt.moduleList.loadingInd && <ModulesList />}
                        {!knowledgeSt.moduleList.loadingInd && knowledgeSt.moduleList.modules.length < 12 && <Grid
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
                        {!knowledgeSt.moduleList.loadingInd && <Toolbar />}
                    </>}
                    {knowledgeSt.moduleList.loadingNothing &&
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                                height: "100%",
                                width: "100%",
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


export default Modules;