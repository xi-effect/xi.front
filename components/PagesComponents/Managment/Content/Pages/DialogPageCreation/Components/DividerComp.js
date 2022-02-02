import React from "react";
import { styled } from "@mui/material/styles";
import { Fade, Divider, IconButton, Grid, Tooltip } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { inject, observer } from "mobx-react"

const PREFIX = "DividerComp";

const classes = {
    gridButtons: `${PREFIX}-gridButtons`,
    divider: `${PREFIX}-divider`,
    gridTextWrapper: `${PREFIX}-gridTextWrapper`,
    icon: `${PREFIX}-icon`,
    speedDial: `${PREFIX}-speedDial`,
    speedDialActionFirst: `${PREFIX}-speedDialActionFirst`,
    speedDialAction: `${PREFIX}-speedDialAction`,
    disableIcon: `${PREFIX}-disableIcon`,
    activeIcon: `${PREFIX}-activeIcon`,
    iconSpeedDial: `${PREFIX}-iconSpeedDial`,
    IconButtonSpeedDial: `${PREFIX}-IconButtonSpeedDial`,
    leftIconButton: `${PREFIX}-leftIconButton`,
    dividerBlock: `${PREFIX}-dividerBlock`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(() => ({
    [`& .${classes.gridButtons}`]: {
        marginLeft: "auto",
    },

    [`& .${classes.divider}`]: {

    },

    [`& .${classes.gridTextWrapper}`]: {
        width: "calc(100% - 4px)",
    },

    [`& .${classes.icon}`]: {
        color: props => props.palette.primary.contrastText,
    },
}));

const DividerComp = inject("managmentStore")(observer(({ managmentStore, index }) => {
    const [hover, setHover] = React.useState(false)

    return (
        <Root>
            <Grid
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => managmentStore.setPageCreationList("selectId", index)}
            >
                <Grid className={classes.gridTextWrapper}>
                    <Divider flexItem
                        sx={{
                            bgcolor: "text.dark",
                            width: "100%",
                            height: "2px",
                            mt: 0.5,
                            mb: 0.5,
                            // margin: 0.5,
                        }}
                    />
                </Grid>
                <Fade
                    in={hover}
                    style={{ transformOrigin: "0 0 0" }}
                    {...(hover ? { timeout: 1000 } : {})}
                >
                    <Grid
                        container
                        direction="row"
                        className={classes.gridButtons}
                    >
                        <Tooltip title="Удалить блок">
                            <IconButton
                                sx={{
                                    marginLeft: "auto"
                                }}
                                onClick={() => managmentStore.deleteComponent(index)}
                                size="large">
                                <DeleteForeverIcon sx={{ color: "text.main" }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Перетащить блок">
                            <IconButton size="large">
                                <DragIndicatorIcon sx={{ color: "text.main" }} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Fade>
            </Grid>
        </Root>
    );
}));

export default DividerComp

