import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Input, InputLabel, NativeSelect, FormControl, Grid, FormControlLabel, Switch, Typography, useTheme, Tooltip } from '@mui/material';


import { inject, observer } from 'mobx-react'


const StepOne = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();



    return (
        <Grid
            sx={{
                margin: 2,
                width: "calc(100% - 32px)",
            }}
            xs={12} sm={12} md={6} lg={6} xl={6}
            container
            item
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Typography varinat="h5" sx={{ cursor: 'default' }}> Шаг 1. Основная информация</Typography>
            <Typography varinat="h6" sx={{ cursor: 'default' }}> Заполните основную информацию о вашем новом модуле</Typography>
            <FormControl sx={{
                width: "calc(100% - 64px)",
                color: 'text.main',
                marginTop: 1,
                marginLeft: 2,
                marginRight: 2,
            }} fullWidth>
                <InputLabel sx={{
                    color: 'text.main',
                }} variant="standard" htmlFor="uncontrolled-native">
                    Название модуля
                </InputLabel>
                <Input
                    sx={{
                        color: 'text.main',
                    }}
                    required
                    value={managmentStore.moduleCreation.name}
                    onChange={(event) => managmentStore.setModuleCreation("name", event.target.value)}
                // margin='dense'
                //multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl sx={{
                width: "calc(100% - 64px)",
                color: 'text.main',
                marginTop: 1,
                marginLeft: 2,
                marginRight: 2,
            }} fullWidth>
                <InputLabel sx={{
                    color: 'text.main',
                }} variant="standard" htmlFor="uncontrolled-native">
                    Тип модуля
                </InputLabel>
                <NativeSelect
                    sx={{
                        color: 'text.main',
                    }}
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
            <FormControl sx={{
                width: "calc(100% - 64px)",
                color: 'text.main',
                marginTop: 1,
                marginLeft: 2,
                marginRight: 2,
            }} fullWidth>
                <InputLabel sx={{
                    color: 'text.main',
                }} variant="standard" htmlFor="uncontrolled-native">
                    Тема модуля
                </InputLabel>
                <NativeSelect
                    sx={{
                        color: 'text.main',
                    }}
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
            <FormControl sx={{
                width: "calc(100% - 64px)",
                color: 'text.main',
                marginTop: 1,
                marginLeft: 2,
                marginRight: 2,
            }} fullWidth>
                <InputLabel sx={{
                    color: 'text.main',
                }} variant="standard" htmlFor="uncontrolled-native">
                    Категория модуля
                </InputLabel>
                <NativeSelect
                    sx={{
                        color: 'text.main',
                    }}
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
            <FormControl sx={{
                width: "calc(100% - 64px)",
                color: 'text.main',
                marginTop: 1,
                marginLeft: 2,
                marginRight: 2,
            }} fullWidth>
                <InputLabel sx={{
                    color: 'text.main',
                }} variant="standard" htmlFor="uncontrolled-native">
                    Сложность модуля
                </InputLabel>
                <NativeSelect
                    sx={{
                        color: 'text.main',
                    }}
                    // defaultValue={'Не выбрано'}
                    value={managmentStore.moduleCreation.difficulty}
                    onChange={(event) => managmentStore.setModuleCreation("difficulty", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'not selected'}>Не выбрано</option>
                    <option value={'review'}> Обзорный</option>
                    <option value={'newbie'}> Новичок</option>
                    <option value={'amateur'}> Любитель</option>
                    <option value={'enthusiast'}> Энтузиаст</option>
                    <option value={'professional'}> Профи</option>
                    <option value={'expert'}> Эксперт</option>
                </NativeSelect>
            </FormControl>
            <FormControl sx={{
                width: "calc(100% - 64px)",
                color: 'text.main',
                marginTop: 1,
                marginLeft: 2,
                marginRight: 2,
            }} fullWidth>
                <InputLabel sx={{
                    color: 'text.main',
                }} variant="standard" htmlFor="uncontrolled-native">
                    Описание модуля
                </InputLabel>
                <Input
                    required
                    sx={{
                        color: 'text.main',
                    }}
                    value={managmentStore.moduleCreation.description}
                    onChange={(event) => managmentStore.setModuleCreation("description", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
        </Grid>
    );
}))

export default StepOne