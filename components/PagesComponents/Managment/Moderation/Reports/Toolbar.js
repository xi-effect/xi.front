import React from 'react';

import { ButtonGroup, Hidden, Button, Grid, Paper, Typography, Divider, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Image from 'next/image'
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({
    ButtonGroup: {
        border: `1px solid ${theme.palette.primary.main}`,
    },
    Button: {
        border: `1px solid ${theme.palette.primary.main}`,
    },
}));

const Toolbar = inject('store')(observer(({ store }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <div>
            <Typography> Выберите один или несколько пакетов с жалобами </Typography>
            <Hidden mdDown>
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
        </div>
    )
}));


export default Toolbar;