/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Grid, Typography } from "@mui/material";

import { inject, observer } from "mobx-react"

import Toolbar from "./Pages/Toolbar";
import DataList from "./Pages/DataList";
import DialogPageCreation from "./Pages/DialogPageCreation";

const ToolbarBottom = inject("managmentSt")(observer(({ managmentSt }) => (
    <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
    >
        <Button onClick={managmentSt.prevPageList} variant="contained" color="primary" disabled={managmentSt.pageCreationList.counter === 0}>
            Назад
        </Button>
        <Typography variant="subtitle1">
            {`Страница ${managmentSt.pageCreationList.counter + 1}`}
        </Typography>
        <Button onClick={managmentSt.nextPageList} variant="contained" color="primary" disabled={managmentSt.pageCreationList.pages.length < 50}>
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