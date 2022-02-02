import React from "react";
import { Input, Grid, useMediaQuery } from "@mui/material";
import { inject, observer } from "mobx-react"

const Header = inject("rootStore")(observer(({ rootStore, value }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
        <Grid sx={{ width: "100%", }}>
            <Input
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
                    }
                }}
                type="text"
                readOnly
                disableUnderline
                multiline
                fullWidth
                value={value.label}
            />
        </Grid>
    );
}));

export default Header