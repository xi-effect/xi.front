import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import ReactDOM from "react-dom";
import { Typography } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { inject, observer } from 'mobx-react'

const PREFIX = 'DnDList';

const classes = {
    Container: `${PREFIX}-Container`
};

const StyledDragDropContext = styled(DragDropContext)((
    {
        theme
    }
) => ({
    [`& .${classes.Container}`]: {
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
    }
}));

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


function DnDList({ state, setState, ComponentsList }) {
    //state = initial
    //const [state, setState] = useState({ quotes: initial });


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
        <StyledDragDropContext onDragEnd={onDragEnd}>
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
        </StyledDragDropContext>
    );
}

export default DnDList