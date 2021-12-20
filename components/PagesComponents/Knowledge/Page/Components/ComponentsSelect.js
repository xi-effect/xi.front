import React from "react";

import {
    CircularProgress,
    Skeleton,
    Grid,
    Typography,
    useTheme,
    Box,
    Stack,
} from "@mui/material";

import Text from ".//Text";
import AlertComp from ".//AlertComp";
import Header from ".//Header";
import DividerComp from ".//DividerComp";
import ImageComp from ".//ImageComp";
import Quiz from ".//Quiz";
import Markdown from ".//Markdown";
import List from ".//List";
import NumberAnswer from ".//NumberAnswer";
import Code from ".//Code";
import { inject, observer } from "mobx-react";



const ComponentsSelect = inject("knowledgeStore")(
    observer(({ knowledgeStore, value, index }) => {

        if (value.type === "h")
            return (
                <>
                    <Header value={value} index={index} />
                </>
            );
        if (value.type === "text")
            return (
                <>
                    <Text value={value} index={index} />
                </>
            );
        if (value.type === "divider")
            return (
                <>
                    <DividerComp value={value} index={index} />
                </>
            );
        if (value.type === "alert")
            return (
                <>
                    <AlertComp value={value} index={index} />
                </>
            );
        if (value.type === "quiz")
            return (
                <>
                    <Quiz value={value} index={index} />
                </>
            );
        if (value.type === "img")
            return (
                <>
                    <ImageComp value={value} index={index} />
                </>
            );
        if (value.type === "markdown")
            return (
                <>
                    <Markdown value={value} index={index} />
                </>
            );
        if (value.type === "list")
            return (
                <>
                    <List value={value} index={index} />
                </>
            );
        if (value.type === "numanswer")
            return (
                <>
                    <NumberAnswer value={value} index={index} />
                </>
            );
        if (value.type === "code")
            return (
                <>
                    <Code value={value} index={index} />
                </>
            );
    }));

export default ComponentsSelect;
