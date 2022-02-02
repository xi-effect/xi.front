/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head"
import { styled } from "@mui/material/styles";
import Image from "next/image"
import Link from "next/link"
import Router from "next/router"
import React from "react";
import { Grid, Box, AppBar, Tabs, Button, Typography, Tab, useTheme } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { inject, observer } from "mobx-react"

import NavigationAll from "../../../components/OtherComponents/Navigation/NavigationAll"

import Toolbar from "../../../components/PagesComponents/Managment/Content/Modules/Toolbar";
import DataList from "../../../components/PagesComponents/Managment/Content/Modules/DataList";
import DialogModuleCreation from "../../../components/PagesComponents/Managment/Content/Modules/DialogModuleCreation";

const ContentModules = inject("rootStore")(observer(({ rootStore }) => {
    const theme = useTheme();

    const [dialogModuleCreation, setDialogModuleCreation] = React.useState(false)

    return (
        <>
            <Head>
                <title>
                    Ξffect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        width: "100%",
                        zIndex: 1,
                        p: 2,
                    }}
                >
                    <Grid>
                        <Typography variant="h5"> Управление контентом </Typography>
                    </Grid>
                    <Grid sx={{ marginTop: 2, }}>
                        <Toolbar setDialogModuleCreation={setDialogModuleCreation} />
                    </Grid>
                    <DialogModuleCreation dialogModuleCreation={dialogModuleCreation} setDialogModuleCreation={setDialogModuleCreation} />
                    <DataList />
                </Grid>
            </NavigationAll>
        </>
    );
}))

export default ContentModules