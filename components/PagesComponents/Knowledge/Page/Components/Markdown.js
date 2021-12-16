import {  Grid, useTheme, Tooltip } from '@mui/material';
import { inject, observer } from 'mobx-react'
import ReactMarkdown from 'react-markdown'

const Markdown = inject('rootStore')(observer(({ rootStore, value }) => {

    return (
        <Grid
            sx={{ width: "100%", cursor: "default", }}
        >
            <ReactMarkdown>
                {value.label}
            </ReactMarkdown>
        </Grid>
    );
}));

export default Markdown

