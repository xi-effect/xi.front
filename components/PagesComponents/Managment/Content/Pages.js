/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Grid, Typography } from "@mui/material";

import { inject, observer } from "mobx-react"

import Toolbar from "./Pages/Toolbar";
import DataList from "./Pages/DataList";
import DialogPageCreation from "./Pages/DialogPageCreation";

const ToolbarBottom = inject("managmentStore")(observer(({ managmentStore }) => (
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        <Button onClick={managmentStore.prevPageList} variant="contained" color="primary" disabled={managmentStore.pageCreationList.counter === 0}>
            Назад
        </Button>
        <Typography variant="subtitle1">
            {`Страница ${managmentStore.pageCreationList.counter + 1}`}
        </Typography>
        <Button onClick={managmentStore.nextPageList} variant="contained" color="primary" disabled={managmentStore.pageCreationList.pages.length < 50}>
            Вперёд
        </Button>
    </Grid>
)));

const Pages = inject()(observer(() => (
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
)));


export default Pages;