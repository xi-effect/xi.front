/* eslint-disable react/prop-types */
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Box } from "@mui/material";

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function DnDList({ state, setState, ComponentsList }) {
    const onDragEnd = (result) => {
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
        setState("components", newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list">
                {provided => (
                    <Box sx={{
                        marginTop: 8,
                        marginLeft: 8,
                        marginRight: 8,
                        height: "calc(100vh - 220px)",
                        "&::-webkit-scrollbar": {
                            width: "0! important",
                            height: 0,
                            display: "none !important",
                            background: "transparent",
                        }
                    }} ref={provided.innerRef} {...provided.droppableProps}>
                        {/* <ComponentsList components={state.quotes} /> */}
                        {ComponentsList}
                        {/* <QuoteList quotes={state.quotes} /> */}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default DnDList