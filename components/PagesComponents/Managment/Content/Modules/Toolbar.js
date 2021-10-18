import React from 'react';

import { styled } from '@mui/material/styles';

import { ButtonGroup, Button, Divider, useTheme, Tooltip } from '@mui/material';


import { inject, observer } from 'mobx-react'

const PREFIX = 'Toolbar';
const classes = {};

const StyledButtonGroup = styled(ButtonGroup)((
    {
        theme
    }
) => ({}));

const Toolbar = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore }) => {
    const theme = useTheme();


    return (
        <StyledButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Tooltip title="Создать страницу">
                <Button onClick={() => managmentStore.setModuleCreationList("dialogOpen", true)}> Создать </Button>
            </Tooltip>
        </StyledButtonGroup>
    );
}));


export default Toolbar;