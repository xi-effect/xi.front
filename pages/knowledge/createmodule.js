/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Typography, Stack, useTheme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import StepOne from '../../components/PagesComponents/Managment/Content/Modules/DialogModuleCreation/StepOne';
import StepTwo from '../../components/PagesComponents/Managment/Content/Modules/DialogModuleCreation/StepTwo';
import StepThree from '../../components/PagesComponents/Managment/Content/Modules/DialogModuleCreation/StepThree';
import { useUnmount } from 'react-use';
import { useSnackbar } from 'notistack';

const Createmodule = inject('knowledgeStore', 'managmentStore', 'uiStore')(observer(({ knowledgeStore, managmentStore, uiStore }) => {

    useUnmount(() => {
        if (managmentStore.moduleCreation.id) {
            managmentStore.saveModule(true)
            enqueueSnackbar('Модуль сохранен', {
                variant: 'success',
            })
        }
    });

    React.useEffect(() => {
        console.log("Createmodule")
        managmentStore.LoadPageList()
    });

    function onDragEnd(result) {
        console.log("result", result)
        // Перетаскивание не произошо
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === 'list-pages') {
            let newArray = managmentStore.moduleCreation.points[result.destination.droppableId.slice(5)].pages
            let newPage = {}
            newPage.id = managmentStore.pageCreationList.pages[result.source.index].id
            newPage.name = managmentStore.pageCreationList.pages[result.source.index].name
            newPage.kind = managmentStore.pageCreationList.pages[result.source.index].kind
            newArray.splice(result.destination.index, 0, newPage)
            managmentStore.setModuleCreationPoints(Number(result.destination.droppableId.slice(5)), "pages", newArray)
            return;

        }

        //Перетаскивание в рамках одной точки
        if (result.destination.droppableId === result.source.droppableId) {
            const quotes = reorder(
                managmentStore.moduleCreation.points[result.destination.droppableId.slice(5)].pages,
                result.source.index,
                result.destination.index
            );
            managmentStore.setModuleCreationPoints(result.destination.droppableId.slice(5), "pages", quotes)
            //console.log("pointsnotgood", result)
            return;

        }

        //Перетаскивание между точками 
        if (result.source.droppableId != 'list-pages' && result.destination.droppableId != result.source.droppableId) {
            let newArray = managmentStore.moduleCreation.points[Number(result.destination.droppableId.slice(5))].pages
            let newPage = managmentStore.moduleCreation.points[Number(result.source.droppableId.slice(5))].pages[result.source.index]
            newArray.splice(result.destination.index, 0, newPage)
            managmentStore.setModuleCreationPoints(Number(result.destination.droppableId.slice(5)), "pages", newArray)
            managmentStore.deletePageInPoint(result.source.droppableId.slice(5), result.source.index)
            console.log("points", result)
        }


        // Перетаскивание не произошо, место объекто не изменено
        if (result.destination.index === result.source.index) {
            return;
        }

    }

    // const onBeforeCapture = () => {
    //     console.log("onBeforeCapture")
    // };

    // const onBeforeDragStart = () => {
    //     console.log("onBeforeDragStart")
    //     /*...*/
    // };

    // const onDragStart = () => {
    //     console.log("onDragStart")
    //     /*...*/
    // };
    // const onDragUpdate = () => {
    //     console.log("onDragUpdate")
    //     /*...*/
    // };

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                    width: "100vw",
                    height: "100vh",
                }}
            >
                <DragDropContext
                    onBeforeCapture={onBeforeCapture}
                    onBeforeDragStart={onBeforeDragStart}
                    onDragStart={onDragStart}
                    onDragUpdate={onDragUpdate}
                    onDragEnd={onDragEnd}
                >
                    <NavigationAll haveRightToolbar>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                width: '100%',
                                zIndex: 1,
                            }}
                        >
                            {uiStore.knowledge.activeStepModuleCreate == 0 && <StepOne />}
                            {uiStore.knowledge.activeStepModuleCreate == 1 && <StepTwo />}
                            {uiStore.knowledge.activeStepModuleCreate == 2 && <StepThree />}
                        </Grid>
                    </NavigationAll>
                </DragDropContext >
            </Stack>

        </>
    )
}));

export default Createmodule;