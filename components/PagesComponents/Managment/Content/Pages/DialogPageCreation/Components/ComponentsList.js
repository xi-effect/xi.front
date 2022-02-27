/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { inject, observer } from "mobx-react"
import Header from "./Header";
import Text from "./Text";
import AlertComp from "./AlertComp";
import DividerComp from "./DividerComp";
import ImageComp from "./ImageComp";
import Quiz from "./Quiz";
import List from "./List";
import Markdown from "./Markdown";
import NumberAnswer from "./NumberAnswer";

function ModuleSelect(component, index) {
    if (component.type === "h") return (
        <Header index={index} />
    );
    if (component.type === "text") return (
        <Text index={index} />
    )
    if (component.type === "alert") return (
        <AlertComp index={index} />
    )
    if (component.type === "divider") return (
        <DividerComp index={index} />
    )
    if (component.type === "img") return (
        <ImageComp index={index} />
    )
    if (component.type === "quiz") return (
        <Quiz index={index} />
    )
    if (component.type === "list") return (
        <List index={index} />
    )
    if (component.type === "markdown") return (
        <Markdown index={index} />
    )
    if (component.type === "numanswer") return (
        <NumberAnswer index={index} />
    )
}


function Component({ component, index }) {
    return (
        <Draggable draggableId={`id-${index}`} index={index}>
            {provided => (
                <div
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

const ComponentsList = inject("managmentStore")(observer(({ managmentStore }) => managmentStore.pageCreation.components.map((component, index) => (
    <Component component={component} index={index} key={index.toString()} />
))));

export default ComponentsList