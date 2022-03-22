import React from "react";
import { styled } from "@mui/material/styles";
import { Fade, Input, IconButton, Grid, Tooltip } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { inject, observer } from "mobx-react"

const PREFIX = "Header";

const classes = {
    gridButtons: `${PREFIX}-gridButtons`,
    divider: `${PREFIX}-divider`,
    gridTextWrapper: `${PREFIX}-gridTextWrapper`,
    text: `${PREFIX}-text`,
    icon: `${PREFIX}-icon`,
    speedDial: `${PREFIX}-speedDial`,
    speedDialActionFirst: `${PREFIX}-speedDialActionFirst`,
    speedDialAction: `${PREFIX}-speedDialAction`,
    disableIcon: `${PREFIX}-disableIcon`,
    activeIcon: `${PREFIX}-activeIcon`,
    iconSpeedDial: `${PREFIX}-iconSpeedDial`,
    IconButtonSpeedDial: `${PREFIX}-IconButtonSpeedDial`,
    leftIconButton: `${PREFIX}-leftIconButton`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")((
) => ({
    [`& .${classes.gridButtons}`]: {
        marginLeft: "auto",
    },

    [`& .${classes.divider}`]: {
        backgroundColor: props => props.palette.primary.main,
        width: "100%",
        height: 1,
        margin: props => props.spacing(1, 0.5),
    },

    [`& .${classes.gridTextWrapper}`]: {
        width: "calc(100% - 4px)",
    },

    [`& .${classes.text}`]: {
        width: "100%",
        color: props => props.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    },

    [`& .${classes.icon}`]: {
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.speedDial}`]: {
        height: 36,
        width: 36,
        marginTop: 4,
        marginLeft: 16,
        // position: "absolute",
        // top: theme => theme.spacing(10),
        // left: theme => theme.spacing(2),
    },

    [`& .${classes.speedDialActionFirst}`]: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.speedDialAction}`]: {
        marginLeft: 16,
        color: props => props.palette.primary.main,
    },

    [`& .${classes.disableIcon}`]: {
        color: props => props.palette.error.main,
    },

    [`& .${classes.activeIcon}`]: {
        color: props => props.palette.primary.contrastText,
        backgroundColor: props => props.palette.primary.main,
        "&:hover": {
            color: props => props.palette.primary.contrastText,
            backgroundColor: props => props.palette.primary.main,
        }
    },

    [`& .${classes.iconSpeedDial}`]: {
        height: 24,
        width: 24,
    },

    [`& .${classes.IconButtonSpeedDial}`]: {
        color: props => props.palette.primary.contrastText,
    },

    [`& .${classes.leftIconButton}`]: {
        marginLeft: "auto"
    }
}));

const Header = inject("managmentSt")(observer(({ managmentSt, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentSt.pageCreation.components[index]
    // Simulated props for the purpose of the example

    // console.log("props", props)

    console.log("textAlign", values.textAlign)

    const [hover, setHover] = React.useState(false)

    return (
        <Root>
            <Grid
                onFocus={() => setHover(true)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                onClick={() => managmentSt.setPageCreationList("selectId", index)}
            >
                <Grid className={classes.gridTextWrapper}>
                    <Input
                        sx={{
                            "& .MuiInput-input": {
                                width: "100%",
                                color: "text.main",
                                lineHeight: "normal",
                            }
                        }}
                        type="text"
                        disableUnderline
                        multiline
                        fullWidth
                        value={values.label}
                        onChange={(event) => {
                            if ("1234567890.,".includes(event.nativeEvent.data) || event.nativeEvent.data === null) managmentSt.setPageCreationComponents(index, "label", event.target.value)
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
                        {/* <Typography sx={{color: "main.dark", ml: 1, mt: 1.5,}} variant="subtitle2"> настройки: </Typography> */}
                        <Tooltip title="Удалить блок">
                            <IconButton
                                className={classes.leftIconButton}
                                onClick={() => managmentSt.deleteComponent(index)}
                                size="large">
                                <DeleteForeverIcon className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Перетащить блок">
                            <IconButton size="large">
                                <DragIndicatorIcon className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Fade>
            </Grid>
        </Root>
    );
}));

export default Header

