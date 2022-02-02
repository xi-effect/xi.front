import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import ReactDOM from "react-dom";
import { Grid, useTheme } from "@mui/material";


import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import Code from "./Code";

const PREFIX = "ComponentsList";

const classes = {
    rootPaper: `${PREFIX}-rootPaper`,
    rootGrid: `${PREFIX}-rootGrid`,
    icon: `${PREFIX}-icon`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")((
    {
        theme
    }
) => ({
    [`& .${classes.rootPaper}`]: {
        // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        // borderRadius: 3,
        // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        // width: "calc(100% - 32px)",
        marginTop: 8,
        // paddingTop: "800px",
        // backgroundColor: theme => theme.palette.blueGrey["7"],
        // position: "relative",
    },

    [`& .${classes.rootGrid}`]: {
        // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        border: 0,
        width: "calc(100% - 8px)",
        margin: 4,
        padding: 8,
        position: "relative",
    },

    [`& .${classes.icon}`]: {
        position: "absolute",
        top: 2,
        right: 0,
        cursor: "grab",
        color: theme => theme.palette.primary.contrastText,
    }
}));

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
    if (component.type === "code") return (
        <Code index={index} />
    )
}


function Component({ component, index }) {
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

const ComponentsList = inject("managmentStore")(observer(({ managmentStore }) => managmentStore.pageCreation.components.map((component, index) => (
        <Component component={component} index={index} key={index.toString()} />
    ))));

export default ComponentsList