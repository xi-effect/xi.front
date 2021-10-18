import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import cx from 'clsx';
import { Input, InputLabel, NativeSelect, FormControl, Grid, FormControlLabel, Switch, Typography, useTheme, Tooltip } from '@mui/material';


import { inject, observer } from 'mobx-react'

const PREFIX = 'StepOne';

const classes = {
    gridWrapper: `${PREFIX}-gridWrapper`,
    title: `${PREFIX}-title`,
    stepLabel: `${PREFIX}-stepLabel`,
    stepSecondLabel: `${PREFIX}-stepSecondLabel`,
    input: `${PREFIX}-input`,
    FormControl: `${PREFIX}-FormControl`,
    categoryLabel: `${PREFIX}-categoryLabel`,
    InputLabel: `${PREFIX}-InputLabel`,
    NativeSelect: `${PREFIX}-NativeSelect`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.gridWrapper}`]: {
        margin: 16,
        width: "calc(100% - 32px)",
    },

    [`& .${classes.title}`]: {
        marginLeft: theme => theme.spacing(2),
        flex: 1,
    },

    [`& .${classes.stepLabel}`]: {
        fontSize: 24,
        color: theme => theme.palette.primary.contrastText,
        cursor: 'default',
    },

    [`& .${classes.stepSecondLabel}`]: {
        fontSize: 20,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.input}`]: {
        // width: "calc(100% - 64px)",
        color: theme => theme.palette.primary.contrastText,
        // // height: "32px",
        // margin: 16,
    },

    [`& .${classes.FormControl}`]: {
        width: "calc(100% - 64px)",
        color: theme => theme.palette.primary.contrastText,
        // height: "32px",
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16,
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
    }
}));

const StepOne = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();



    return (
        <StyledGrid
            className={classes.gridWrapper}
            xs={12} sm={12} md={6} lg={6} xl={6}
            container
            item
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.stepLabel}> Шаг 1. Основная информация</Typography>
            <Typography className={classes.stepSecondLabel}> Заполните основную информацию о вашем новом модуле</Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Название модуля
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={managmentStore.moduleCreation.name}
                    onChange={(event) => managmentStore.setModuleCreation("name", event.target.value)}
                // margin='dense'
                //multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Тип модуля
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    // defaultValue={'Не выбрано'}
                    value={managmentStore.moduleCreation.type}
                    onChange={(event) => managmentStore.setModuleCreation("type", event.target.value)}
                >
                    <option value={'standard'}> Стандартный </option>
                    <option value={'practice-block'}> Практика </option>
                    <option value={'theory-block'}> Теория </option>
                    <option value={'test'}> Проверочная </option>
                </NativeSelect>
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Тема модуля
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    // defaultValue={'Не выбрано'}
                    value={managmentStore.moduleCreation.theme}
                    onChange={(event) => managmentStore.setModuleCreation("theme", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'not selected'}>Не выбрано</option>
                    <option value={'math'}>Математика</option>
                    <option value={'algebra'}>Алгебра</option>
                    <option value={'geometry'}>Геометрия</option>
                    <option value={'languages'}>Языки</option>
                    <option value={'physics'}>Физика</option>
                    <option value={'chemistry'}>Химия</option>
                    <option value={'biology'}>Биология</option>
                    <option value={'geography'}>География</option>
                    <option value={'history'}>История</option>
                    <option value={'social-science'}>Обществознание</option>
                    <option value={'philosophy'}>Философия</option>
                    <option value={'literature'}>Литература</option>
                    <option value={'arts'}>Искусства</option>
                    <option value={'informatics'}>Информатика</option>
                </NativeSelect>
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Категория модуля
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    // defaultValue={'Не выбрано'}
                    value={managmentStore.moduleCreation.category}
                    onChange={(event) => managmentStore.setModuleCreation("category", event.target.value)}
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
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Сложность модуля
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    // defaultValue={'Не выбрано'}
                    value={managmentStore.moduleCreation.difficulty}
                    onChange={(event) => managmentStore.setModuleCreation("difficulty", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option className={classes.option} value={'not selected'}>Не выбрано</option>
                    <option value={'review'}> Обзорный</option>
                    <option value={'newbie'}> Новичок</option>
                    <option value={'amateur'}> Любитель</option>
                    <option value={'enthusiast'}> Энтузиаст</option>
                    <option value={'professional'}> Профи</option>
                    <option value={'expert'}> Эксперт</option>
                </NativeSelect>
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Описание модуля
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={managmentStore.moduleCreation.description}
                    onChange={(event) => managmentStore.setModuleCreation("description", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>

            {/* <Typography className={classes.categoryLabel}> Теперь выберете тип, к которому относится ваша страница </Typography>

            <FormControl className={classes.FormControl} fullWidth>
                <FormControlLabel
                    control={
                        <Switch
                            checked={managmentStore.moduleCreation.blueprint}
                            onChange={() => managmentStore.setModuleCreation("blueprint", !managmentStore.moduleCreation.blueprint)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Чертёж"
                />
            </FormControl> */}
        </StyledGrid>
    );
}))

export default StepOne