/* eslint-disable react/display-name */
import React from "react";
import {
  Grid,
  Skeleton,
} from "@mui/material";
import { inject, observer } from "mobx-react";

const ModulesListLoading = inject()(
  observer(() => (
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          m: 0,
          p: 1,
          width: "100%",
          // backgroundColor: "background.1",
        }}
      >
        {[...Array(20)].map((page, index) => (
          <Grid
            key={index.toString()}
            ax={12}
            xs={12}
            sm={12}
            md={6}
            dl={12}
            lg={6}
            gx={4}
            xl={3}
            item
            sx={{
              p: 1,
              transition: "0.8s",
              width: "100%",
              height: 400,
              maxHeight: "100%"
            }}
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 2,
                position: "relative",
              }}
            />
          </Grid>
        )
        )}
      </Grid >
    ))
);

export default ModulesListLoading;
