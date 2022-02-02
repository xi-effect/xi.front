/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { styled } from "@mui/material/styles";

import { CircularProgress, Button, Grid, Typography, useTheme } from "@mui/material";

import { inject, observer } from "mobx-react"

import Image from "next/image"
import Toolbar from "./Pages/Toolbar";
import DataList from "./Pages/DataList";
import DialogPageCreation from "./Pages/DialogPageCreation";

const ToolbarBottom = inject("managmentStore")(observer(({ managmentStore }) => {
    const theme = useTheme();


    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Button onClick={managmentStore.prevPageList} variant="contained" color="primary" disabled={managmentStore.pageCreationList.counter === 0 ? true : false}>
                Назад
            </Button>
            <Typography variant="subtitle1">
                {`Страница ${managmentStore.pageCreationList.counter + 1}`}
            </Typography>
            <Button onClick={managmentStore.nextPageList} variant="contained" color="primary" disabled={managmentStore.pageCreationList.pages.length < 50 ? true : false}>
                Вперёд
            </Button>
        </Grid>
    )
}));



const Pages = inject("rootStore", "managmentStore")(observer(({ rootStore, managmentStore }) => {
    const theme = useTheme();


    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
        >
            <Grid>
                <Typography variant="h5"> Управление контентом  </Typography>
            </Grid>
            <Grid>
                <Toolbar />
            </Grid>
            <DialogPageCreation />
            <DataList />
            <ToolbarBottom />
        </Grid>
    )
}));


export default Pages;