import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { inject, observer } from 'mobx-react'

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
    const custom = {
        id: `id-${k}`,
        content: `Quote ${k}`
    };

    return custom;
});

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


const useStyles = makeStyles((theme) => ({
    Container: {
        marginTop: 8,
        marginLeft: 8,
        marginRight: 8,
        height: "calc(100vh - 220px)",
        //display: "block",
        //overflow: "auto",
        '&::-webkit-scrollbar': {
            width: "0! important",
            height: 0,
            display: "none !important",
            background: "transparent",
        }
    },
}));

function DnDList({ state, setState, ComponentsList }) {
    //state = initial
    //const [state, setState] = useState({ quotes: initial });
    const classes = useStyles();

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newState = reorder(
            state,
            result.source.index,
            result.destination.index
        );
        console.log("newState", newState)
        setState("components", newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {provided => (
                    <div className={classes.Container} ref={provided.innerRef} {...provided.droppableProps}>
                        {/* <ComponentsList components={state.quotes} /> */}
                        {ComponentsList}
                        {/* <QuoteList quotes={state.quotes} /> */}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DnDList