/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress, Grid, Dialog, Stack, DialogContent, DialogActions, Typography, useTheme } from '@mui/material';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll';
import { motion } from "framer-motion"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import StepOne from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepOne';
import StepTwo from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepTwo';
import StepThree from '../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation/StepThree';
import { useUnmount } from 'react-use';
import { useSnackbar } from 'notistack';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const components = [
    { type: "text", fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст" },
    { type: "h", fontSize: 36, textAlign: "center", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "заголовок" },
    { type: "markdown", label: "markdown" },
    { type: "divider", },
    { type: "quiz", quizType: 'single', fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", content: [{ label: "", }], rightAnswers: [], userAnswers: [], successAnswer: null },
    { type: "alert", alertType: "success", fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст уведомления" },
    { type: "list", listType: 'dotted', fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", content: [{ label: "", },] },
    { type: "numanswer", label: 0, userAnswer: null },
    { type: "code", label: "code", lang: 0, },
    { type: "img", authorId: null, imageId: null, },
]

const Createpage = inject('knowledgeStore', 'managmentStore', 'uiStore')(observer(({ knowledgeStore, managmentStore, uiStore }) => {
    const theme = useTheme();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    useUnmount(() => {
        if (managmentStore.pageCreation.id) {
            managmentStore.savePage(true)
            enqueueSnackbar('Страница сохранена', {
                variant: 'success',
            })
        }
    });

    function onDragEnd(result) {
        console.log("result", result)
        // Перетаскивание не произошо
        if (!result.destination) {
            return;
        }

        if (result.source.droppableId === 'list-components' && result.destination.droppableId === 'componentsList') {
            console.log('list-pages')
            let newArray = [...managmentStore.pageCreation.components]
            console.log("newArray", newArray, components[result.source.index])
            newArray.splice(result.destination.index, 0, components[result.source.index])
            console.log("newArray", newArray)
            managmentStore.setPageCreation("components", newArray)
            return;

        }

        //Перетаскивание в рамках одной точки
        if (result.destination.droppableId === result.source.droppableId) {
            const quotes = reorder(
                managmentStore.pageCreation.components,
                result.source.index,
                result.destination.index
            );
            managmentStore.setPageCreation("components", quotes)
            //console.log("pointsnotgood", result)
            return;

        }

        // //Перетаскивание между точками 
        // if (result.source.droppableId != 'list-pages' && result.destination.droppableId != result.source.droppableId) {
        //     let newArray = managmentStore.moduleCreation.points[Number(result.destination.droppableId.slice(5))].pages
        //     let newPage = managmentStore.moduleCreation.points[Number(result.source.droppableId.slice(5))].pages[result.source.index]
        //     newArray.splice(result.destination.index, 0, newPage)
        //     managmentStore.setModuleCreationPoints(Number(result.destination.droppableId.slice(5)), "pages", newArray)
        //     managmentStore.deletePageInPoint(result.source.droppableId.slice(5), result.source.index)
        //     console.log("points", result)
        // }

        // Перетаскивание не произошо, место объекто не изменено
        if (result.destination.index === result.source.index) {
            return;
        }

    }

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <DragDropContext
                // onBeforeCapture={onBeforeCapture}
                // onBeforeDragStart={onBeforeDragStart}
                // onDragStart={onDragStart}
                // onDragUpdate={onDragUpdate}
                onDragEnd={onDragEnd}
            >
                <NavigationAll>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{
                            width: '100%',
                            minHeight: '90vh',
                            zIndex: 1,
                        }}
                    >
                        {uiStore.knowledge.activeStep == 0 && <StepOne />}
                        {uiStore.knowledge.activeStep == 1 && <StepTwo />}
                        {uiStore.knowledge.activeStep == 2 && <StepThree />}
                    </Grid>
                </NavigationAll>
            </DragDropContext >
        </>
    )
}));

export default Createpage;