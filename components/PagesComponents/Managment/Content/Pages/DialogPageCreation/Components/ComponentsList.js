import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Grid, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { inject, observer } from 'mobx-react'
import Header from './Header';
import Text from './Text';
import AlertComp from './AlertComp';
import DividerComp from './DividerComp';
import ImageComp from './ImageComp';
import Quiz from './Quiz';


const useStyles = makeStyles((theme) => ({
    rootPaper: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        //borderRadius: 3,
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        //width: "calc(100% - 32px)",
        marginTop: 8,
        //padding: 0,
        //backgroundColor: theme => theme.palette.blueGrey["7"],
        //position: "relative",
    },
    rootGrid: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        width: "calc(100% - 8px)",
        margin: 4,
        padding: 8,
        position: "relative",
    },
    icon: {
        position: "absolute",
        top: 2,
        right: 0,
        cursor: 'grab',
        color: theme => theme.palette.primary.contrastText,
    }
}));

const ModuleSelect = (component, index) => {
    if (component.type === "h") return (
        <>
            <Header index={index} />
        </>
    )
    if (component.type === "text") return (
        <>
            <Text index={index} />
        </>
    )
    if (component.type === "alert") return (
        <>
            <AlertComp index={index} />
        </>
    )
    if (component.type === "divider") return (
        <>
            <DividerComp index={index} />
        </>
    )
    if (component.type === "img") return (
        <>
            <ImageComp index={index} />
        </>
    )
    if (component.type === "quiz") return (
        <>
            <Quiz index={index} />
        </>
    )
}


function Component({ component, index }) {
    const theme = useTheme()
    const classes = useStyles(theme);

    return (
        <Draggable draggableId={`id-${index}`} index={index}>
            {provided => (
                <div
                    className={classes.rootPaper}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {ModuleSelect(component, index)}
                </div>
            )
            }
        </Draggable >
    );
}

const ComponentsList = inject('managmentStore')(observer(({ managmentStore }) => {
    return managmentStore.pageCreation.components.map((component, index) => (
        <Component component={component} index={index} key={index.toString()} />
    ));
}));

// const ComponentsList = ({ components }) => {
//     return (
//         <>
//             {components.map((component, index) => (
//                 <Component component={component} index={index} key={index} />
//             ))}
//         </>
//     );
// };

export default ComponentsList