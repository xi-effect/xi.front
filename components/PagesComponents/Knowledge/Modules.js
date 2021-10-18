/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { styled } from '@mui/material/styles';

import { Button, CircularProgress, Grid, Typography, useTheme } from '@mui/material';


import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Chipper from './Modules/Chipper';
import ModulesList from './Modules/ModulesList';

const PREFIX = 'Modules';

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
                <Button onClick={knowledgeStore.prevPageInModules} className={classes.Button} variant="contained" color="primary" disabled={knowledgeStore.moduleList.counter === 0 ? true : false}>
                    Назад
                </Button>
                <Typography className={classes.Typography} variant="subtitle1">
                    {`Страница ${knowledgeStore.moduleList.counter + 1}`}
                </Typography>
                <Button onClick={knowledgeStore.nextPageInModules} className={classes.Button} variant="contained" color="primary" disabled={knowledgeStore.moduleList.modules.length < 12 ? true : false}>
                    Вперёд
                </Button>
            </Grid>
        </Root>)
    );
}));


const Modules = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();


    React.useEffect(() => {
        knowledgeStore.loadModuleList()
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
                {!knowledgeStore.moduleList.loadingNothing && <>
                    {!knowledgeStore.moduleList.loadingInd && <ModulesList />}
                    {!knowledgeStore.moduleList.loadingInd && knowledgeStore.moduleList.modules.length < 12 && <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.container}
                    >
                        <Typography className={classes.labelThatsAll}> Это всё, что мы нашли по вашему запросу </Typography>
                    </Grid>}
                    {!knowledgeStore.moduleList.loadingInd && <Toolbar />}
                    {knowledgeStore.moduleList.loadingInd &&
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            className={classes.gridCircularProgress}
                        >
                            <CircularProgress />
                        </Grid>
                    }
                </>}
                {knowledgeStore.moduleList.loadingNothing &&
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        className={classes.container}
                    >
                        <Typography sx={{ marginTop: 4 }} className={classes.labelThatsAll}> Ничего не найдено по запросу </Typography>
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


export default Modules;