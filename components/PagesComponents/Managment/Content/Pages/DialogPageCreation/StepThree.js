import React from "react";
import { styled } from "@mui/material/styles";
import { FormControl, FormControlLabel, Grid, Switch, Button, Typography } from "@mui/material";



import { inject, observer } from "mobx-react"

const PREFIX = "StepThree";

const classes = {
    gridWrapper: `${PREFIX}-gridWrapper`,
    stepLabel: `${PREFIX}-stepLabel`,
    stepSecondLabel: `${PREFIX}-stepSecondLabel`,
    FormControl: `${PREFIX}-FormControl`,
    categoryLabel: `${PREFIX}-categoryLabel`,
    InputLabel: `${PREFIX}-InputLabel`,
    NativeSelect: `${PREFIX}-NativeSelect`,
    Button: `${PREFIX}-Button`
};

const StyledGrid = styled(Grid)((
) => ({
    [`&.${classes.gridWrapper}`]: {
        margin: 16,
        width: "calc(100% - 32px)",
    },

    [`& .${classes.stepLabel}`]: {
        marginLeft: 16,
        fontSize: 24,
        cursor: "default",
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.stepSecondLabel}`]: {
        marginLeft: 16,
        fontSize: 20,
        cursor: "default",
        color: theme => theme.palette.primary.contrastText,
        // color: theme => theme.main.palette.content.border,
    },

    [`& .${classes.FormControl}`]: {
        width: "calc(100% - 64px)",
        color: theme => theme.palette.primary.contrastText,
        // height: "32px",
        marginTop: 8,
        marginLeft: 16,
    },

    [`& .${classes.categoryLabel}`]: {
        paddingTop: 12,
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.InputLabel}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.NativeSelect}`]: {
        color: theme => theme.palette.primary.main
    },

    [`& .${classes.Button}`]: {
        marginTop: 8,
        marginLeft: 16,
    }
}));

const StepThree = inject("managmentSt")(observer(({ managmentSt }) => (
    <StyledGrid
        className={classes.gridWrapper}
        xs={12} sm={12} md={6} lg={6} xl={6}
        container
        item
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
    >
        <Typography
            variant="Roboto500XiLabel"
            sx={{
                marginLeft: 2,
                fontSize: 24,
                cursor: "default",
            }}
        >
            Шаг 3. Публикация
        </Typography>
        <Typography className={classes.stepSecondLabel}> Теперь осталось только опубликовать вашу страницу, для этого необходимо заполнить информацию:</Typography>
        <FormControl className={classes.FormControl} fullWidth>
            <FormControlLabel
                control={
                    <Switch
                        checked={managmentSt.pageCreation.reusable}
                        onChange={() => managmentSt.setPageCreation("reusable", !managmentSt.pageCreation.reusable)}
                        name="reusable"
                        color="primary"
                    />
                }
                label="Позволить другим авторам использовать эту страницу в своих модулях"
            />
        </FormControl>
        <FormControl className={classes.FormControl} fullWidth>
            <FormControlLabel
                control={
                    <Switch
                        checked={managmentSt.pageCreation.public}
                        onChange={() => managmentSt.setPageCreation("public", !managmentSt.pageCreation.public)}
                        name="public"
                        color="primary"
                    />
                }
                label="Сделать страницу публичной. Все пользователи смогут её увидеть "
            />
        </FormControl>

        <Button onClick={() => managmentSt.savePage(true)} variant="contained" color="primary" className={classes.Button}>
            Опубликовать
        </Button>
    </StyledGrid>
)))

export default StepThree