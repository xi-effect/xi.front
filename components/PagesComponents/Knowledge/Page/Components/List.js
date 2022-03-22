import React from "react";
import {
  Input,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { inject, observer } from "mobx-react";
import LensIcon from "@mui/icons-material/Lens";

const List = inject(
  "knowledgeSt"
)(
  observer(({ knowledgeSt, index }) => {
    const value = knowledgeSt.page.components[index];
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid sx={{ width: "100%" }}>
          {value.content.map((item, indexA) => (
            <Input
              key={indexA.toString()}
              sx={{
                "& .MuiInput-input": {
                  width: "100%",
                  color: "text.main",
                  fontSize: mobile ? value.fontSize * 0.8 : value.fontSize,
                  fontStyle: value.fontStyle,
                  textAlign: value.textAlign,
                  fontWeight: value.fontWeight,
                  textDecoration: value.textDecoration,
                  lineHeight: "normal",
                  cursor: "default",
                },
              }}
              type="text"
              disableUnderline
              multiline
              fullWidth
              readOnly
              value={item.label}
              startAdornment={
                <>
                  {value.listType === "dotted" && (
                    <LensIcon // список с точками
                      sx={{
                        mr: "5px",
                        fontSize: "12px",
                      }}
                      color="main.dark"
                    />
                  )}
                  {value.listType === "numberded" && (
                    <Typography
                      sx={{
                        mr: "5px",
                      }}
                    >
                      {`${indexA + 1}.`}
                    </Typography>
                  )}
                </>
              }
            />
          ))}
        </Grid>
      </Grid>
    );
  })
);

export default List;
