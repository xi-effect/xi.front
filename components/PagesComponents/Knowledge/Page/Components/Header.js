import React, { useState } from 'react';
import { useTheme, Input, Grid } from '@mui/material';

import { inject, observer } from 'mobx-react'

const Header = inject('rootStore')(observer(({ rootStore, value }) => {
    
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

export default Header