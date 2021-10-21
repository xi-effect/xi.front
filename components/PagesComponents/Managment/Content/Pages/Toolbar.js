import React from 'react';

import { styled } from '@mui/material/styles';

import { ButtonGroup, Button, Divider, useTheme, Tooltip } from '@mui/material';

import { inject, observer } from 'mobx-react'


const Toolbar = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore }) => {
    const theme = useTheme();

    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Tooltip title="Создать страницу">
                <Button onClick={() => managmentStore.setPageCreationList("dialogOpen", true)}> Создать </Button>
            </Tooltip>
        </ButtonGroup>
    );
}));


export default Toolbar;