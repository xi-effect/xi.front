/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head"
import React from "react";
import { Grid, Typography, } from "@mui/material";
import { inject, observer } from "mobx-react"

import NavigationAll from "../../../components/OtherComponents/Navigation/NavigationAll"

import Toolbar from "../../../components/PagesComponents/Managment/Content/Modules/Toolbar";
import DataList from "../../../components/PagesComponents/Managment/Content/Modules/DataList";
import DialogModuleCreation from "../../../components/PagesComponents/Managment/Content/Modules/DialogModuleCreation";

const ContentModules = inject()(observer(() => {
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