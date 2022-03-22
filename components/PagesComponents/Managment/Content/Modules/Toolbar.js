import React from "react";
import { ButtonGroup, Button, Tooltip } from "@mui/material";

import { inject, observer } from "mobx-react"

const Toolbar = inject("managmentSt")(observer(({ managmentSt }) => (
    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        <Tooltip title="Создать страницу">
            <Button onClick={() => managmentSt.setModuleCreationList("dialogOpen", true)}> Создать </Button>
        </Tooltip>
    </ButtonGroup>
)));


export default Toolbar;