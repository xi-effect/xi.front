import { Grid } from "@mui/material";
import { inject, observer } from "mobx-react"
import ReactMarkdown from "react-markdown"

const Markdown = inject()(observer(({ value }) => (
    <Grid
        sx={{ width: "100%", cursor: "default", }}
    >
        <ReactMarkdown>
            {value.label}
        </ReactMarkdown>
    </Grid>
)));

export default Markdown

