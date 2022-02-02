/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head"
import React from "react";
import { Grid, Typography } from "@mui/material";
import { inject, observer } from "mobx-react"

import NavigationAll from "../../../components/OtherComponents/Navigation/NavigationAll"

import Toolbar from "../../../components/PagesComponents/Managment/Content/Pages/Toolbar";
import DataList from "../../../components/PagesComponents/Managment/Content/Pages/DataList";
import DialogPageCreation from "../../../components/PagesComponents/Managment/Content/Pages/DialogPageCreation";

const ContentPages = inject()(observer(() => {
  const [dialogPageCreation, setDialogPageCreation] = React.useState(false)


  return (
    <>
      <Head>
        <title>
          Ξffect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid container direction="column"
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
            <Toolbar setDialogPageCreation={setDialogPageCreation} />
          </Grid>
          <DialogPageCreation dialogPageCreation={dialogPageCreation} setDialogPageCreation={setDialogPageCreation} />
          <DataList />
        </Grid>
      </NavigationAll>
    </>
  );
}))

export default ContentPages