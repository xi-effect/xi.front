import React from "react";

import { styled } from "@mui/material/styles";

import { ButtonGroup, Hidden, Button, Grid, Paper, Typography, Divider, useTheme, Tooltip } from "@mui/material";


import { inject, observer } from "mobx-react"

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import Image from "next/image"
const PREFIX = "Toolbar";

const classes = {
    ButtonGroup: `${PREFIX}-ButtonGroup`,
    Button: `${PREFIX}-Button`
};

const Root = styled("div")((
    {
        theme
    }
) => ({
    [`& .${classes.ButtonGroup}`]: {
        border: `1px solid ${theme => theme.palette.primary.main}`,
    },

    [`& .${classes.Button}`]: {
        border: `1px solid ${theme => theme.palette.primary.main}`,
    }
}));

const Toolbar = inject("store")(observer(({ store }) => {
    const theme = useTheme();



    return (
        <Root>
            <Typography> Выберите один или несколько пакетов с жалобами </Typography>
            <Hidden xlDown>
                <ButtonGroup className={classes.ButtonGroup} color="primary" aria-label="text primary button group">
                    <Button color="primary" className={classes.Button}>Отметить отсутствие нарушений</Button>
                    <Button color="primary" className={classes.Button}>Оставить отзыв и отправить на доработку</Button>
                    <Button color="primary" className={classes.Button}>Заблокировать контент</Button>
                </ButtonGroup>
            </Hidden>
            <Hidden lgUp>
                <ButtonGroup className={classes.ButtonGroup} color="primary" aria-label="text primary button group">
                    <Tooltip title="Отметить отсутствие нарушений">
                        <Button color="primary" className={classes.Button}><AssignmentTurnedInIcon /></Button>
                    </Tooltip>
                    <Tooltip title="Оставить отзыв и отправить на доработку">
                        <Button color="primary" className={classes.Button}><FeedbackIcon /></Button>
                    </Tooltip>
                    <Tooltip title="Заблокировать контент">
                        <Button color="primary" className={classes.Button}><DeleteForeverIcon /></Button>
                    </Tooltip>
                </ButtonGroup>
            </Hidden>
        </Root>
    );
}));


export default Toolbar;