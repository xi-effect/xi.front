import React from "react";
import { Grid, Divider } from "@mui/material";
import { inject, observer } from "mobx-react"

const DividerComp = inject("rootStore")(observer(({ rootStore, value }) => {

    return (
        <Grid sx={{ width: "100%", }}>
            <Divider flexItem sx={{
                width: "100%",
                height: "2px",
                bgcolor: "text.dark",
                marginTop: 1,
                marginBottom: 1,
                cursor: "default",
            }} />
        </Grid>
    );
}));

export default DividerComp