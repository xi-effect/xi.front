import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Input, InputLabel, NativeSelect, FormControl, Grid, FormControlLabel, Switch, Typography, useTheme, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';


import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    gridWrapper: {
        margin: 16,
        width: "calc(100% - 32px)",
    },
    title: {
        marginLeft: theme => theme.spacing(2),
        flex: 1,
    },
    stepLabel: {
        fontSize: 24,
        color: theme => theme.palette.primary.contrastText,
        cursor: 'default',
    },
    stepSecondLabel: {
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },
    input: {
        // width: "calc(100% - 64px)",
        color: theme => theme.palette.primary.contrastText,
        // // height: "32px",
        // margin: 16,
    },
    FormControl: {
        width: "calc(100% - 64px)",
        color: theme => theme.palette.primary.contrastText,
        // height: "32px",
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16,
    },
    categoryLabel: {
        paddingTop: 12,
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },
    InputLabel: {
        color: theme => theme.palette.primary.contrastText,
    },
    NativeSelect: {
        color: theme => theme.palette.primary.main
    },
}));

const StepOne = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid
            className={classes.gridWrapper}
            xs={12} sm={12} md={6} lg={6} xl={6}
            container
            item
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.stepLabel}> Шаг 1. Основная информация</Typography>
            <Typography className={classes.stepSecondLabel}> Заполните основную информацию о вашем новой страницы</Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Название страницы
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={managmentStore.pageCreation.name}
                    onChange={(event) => managmentStore.setPageCreation("name", event.target.value)}
                // margin='dense'
                //multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Описание страницы
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={managmentStore.pageCreation.description}
                    onChange={(event) => managmentStore.setPageCreation("description", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Тематика страницы
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={managmentStore.pageCreation.theme}
                    onChange={(event) => managmentStore.setPageCreation("theme", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <Typography className={classes.categoryLabel}> Теперь выберете тип, к которому относится ваша страница </Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Тип страницы
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    // defaultValue={'Не выбрано'}
                    value={managmentStore.pageCreation.kind}
                    onChange={(event) => managmentStore.setPageCreation("kind", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'not selected'}> Не выбрано </option>
                    <option value={'theory'}> Теория </option>
                    <option value={'practice'}> Практика </option>
                    <option value={'task'}> Тестовое задание </option>
                </NativeSelect>
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <FormControlLabel
                    control={
                        <Switch
                            checked={managmentStore.pageCreation.blueprint}
                            onChange={() => managmentStore.setPageCreation("blueprint", !managmentStore.pageCreation.blueprint)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Чертёж"
                />
            </FormControl>
        </Grid>
    )
}))

export default StepOne