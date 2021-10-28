import React, { useState } from 'react';
import { Input, Grid, useTheme } from '@mui/material';

import { inject, observer } from 'mobx-react'


const Text = inject('rootStore')(observer(({ rootStore, value }) => {

    // console.log("props", props)
    const theme = useTheme();

    return (
        <Grid sx={{ width: "100%", }}>
            <Input
                sx={{
                    '& .MuiInput-input': {
                        width: "100%",
                        color: 'text.main',
                        fontSize: value.fontSize,
                        fontStyle: value.fontStyle,
                        textAlign: value.textAlign,
                        fontWeight: value.fontWeight,
                        textDecoration: value.textDecoration,
                        lineHeight: "normal",
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

export default Text