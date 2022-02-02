import React from "react";
import { useTheme, Input, Grid, Alert, InputAdornment, useMediaQuery } from "@mui/material";

import { inject, observer } from "mobx-react"

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";

const AlertComp = inject("rootStore")(observer(({ rootStore, value }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"));

    return (
        <Grid sx={{ width: "100%", }}>
            <Alert
                variant="filled"
                sx={{ width: "100%", }}
                severity={value.alertType}
                icon={<span></span>}
            >
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
                    disableUnderline
                    multiline
                    fullWidth
                    value={value.label}
                    readOnly
                    startAdornment={
                        <InputAdornment position="start">
                            {value.alertType === "success" && <CheckCircleIcon />}
                            {value.alertType === "info" && <InfoIcon />}
                            {value.alertType === "warning" && <WarningIcon />}
                            {value.alertType === "error" && <ErrorIcon />}
                        </InputAdornment>
                    }
                />
            </Alert>
        </Grid>
    );
}));

export default AlertComp