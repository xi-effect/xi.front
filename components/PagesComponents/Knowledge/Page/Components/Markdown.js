import { styled } from '@mui/material/styles';
import {  Grid, useTheme, Tooltip } from '@mui/material';
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'
import ReactMarkdown from 'react-markdown'

const Markdown = inject('rootStore')(observer(({ rootStore, value }) => {

    return (
        <Grid
            sx={{ width: "100%", }}
        >
            <ReactMarkdown>
                {value.label}
            </ReactMarkdown>
        </Grid>
    );
}));

export default Markdown

