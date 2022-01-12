/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import ModulesList from '../../components/PagesComponents/Knowledge/Modules/ModulesList';
import ModulesListLoading from '../../components/PagesComponents/Knowledge/Modules/ModulesListLoading';



const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const theme = useTheme();

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: 64 }}
        >
            <Button onClick={knowledgeStore.prevPageInModules} sx={{ ml: 2, mr: 2, }} variant="contained" color="primary" disabled={knowledgeStore.moduleList.counter === 0 ? true : false}>
                Назад
            </Button>
            <Typography variant="subtitle1">
                {`Страница ${knowledgeStore.moduleList.counter + 1}`}
            </Typography>
            <Button onClick={knowledgeStore.nextPageInModules} sx={{ ml: 2, mr: 2, }} variant="contained" color="primary" disabled={knowledgeStore.moduleList.modules.length < 12 ? true : false}>
                Вперёд
            </Button>
        </Grid>
    );
}));


const Modules = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();

    React.useEffect(() => {
        knowledgeStore.loadModuleList()
    }, []);

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // height: '100%',
                        pb: 20,
                        width: '100%',
                        zIndex: 1,
                    }}
                >
                    {knowledgeStore.moduleList.loadingInd && <ModulesListLoading />}
                    {!knowledgeStore.moduleList.loadingNothing && <>
                        {!knowledgeStore.moduleList.loadingInd && <ModulesList />}
                        {!knowledgeStore.moduleList.loadingInd && knowledgeStore.moduleList.modules.length < 12 && <Grid
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
                        {!knowledgeStore.moduleList.loadingInd && <Toolbar />}
                    </>}
                    {knowledgeStore.moduleList.loadingNothing &&
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                marginTop: 2,
                                marginBottom: 2,
                                height: '100%',
                                width: '100%',
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


export default Modules;