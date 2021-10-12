import React from 'react';

import { ButtonGroup, Button, Divider, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({

}));

const Toolbar = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Tooltip title="Создать страницу">
                <Button onClick={() => managmentStore.setModuleCreationList("dialogOpen", true)}> Создать </Button>
            </Tooltip>
        </ButtonGroup>
    )
}));


export default Toolbar;