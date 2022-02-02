import React from "react";

import { styled } from "@mui/material/styles";

import { ButtonGroup, Hidden, Button, Grid, Paper, Typography, Divider, useTheme, Tooltip } from "@mui/material";


import { inject, observer } from "mobx-react"

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
                    <Button color="primary" className={classes.Button}>Отклонить</Button>
                    <Button color="primary" className={classes.Button}>Отправить контент на модерацию</Button>
                    <Button color="primary" className={classes.Button}>Отправить контент на модерацию, дополнительно скрыв его с сайта</Button>
                </ButtonGroup>
            </Hidden>
            <Hidden lgUp>
                <ButtonGroup className={classes.ButtonGroup} color="primary" aria-label="text primary button group">
                    <Tooltip title="Отклонить">
                        <Button color="primary" className={classes.Button}><CancelPresentationIcon /></Button>
                    </Tooltip>
                    <Tooltip title="Отправить контент на модерацию">
                        <Button color="primary" className={classes.Button}><VisibilityIcon /></Button>
                    </Tooltip>
                    <Tooltip title="Отправить контент на модерацию, дополнительно скрыв его с сайта">
                        <Button color="primary" className={classes.Button}><VisibilityOffIcon /></Button>
                    </Tooltip>
                </ButtonGroup>
            </Hidden>
        </Root>
    );
}));


export default Toolbar;