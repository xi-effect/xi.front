import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import cx from 'clsx';
import { Input, InputLabel, NativeSelect, FormControl, Grid, FormControlLabel, Switch, Typography, useTheme, Tooltip, Stack } from '@mui/material';



import { inject, observer } from 'mobx-react'


const StepOne = inject('managmentStore')(observer(({ managmentStore }) => {
    const theme = useTheme();


    return (
        <Stack
            spacing={2}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                width: '100%',
                p: 4,
                maxWidth: 800,
            }}
        >
            <Typography
                variant='Roboto500XiLabel'
                sx={{
                    marginLeft: 2,
                    fontSize: 24,
                    cursor: 'default',
                }}
            > Шаг 1. Основная информация</Typography>
            <Typography> Заполните основную информацию о вашем новой страницы</Typography>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Название страницы
                </InputLabel>
                <Input
                    required
                    value={managmentStore.pageCreation.name}
                    onChange={(event) => managmentStore.setPageCreation("name", event.target.value)}
                // margin='dense'
                //multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Описание страницы
                </InputLabel>
                <Input
                    required
                    value={managmentStore.pageCreation.description}
                    onChange={(event) => managmentStore.setPageCreation("description", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Тематика страницы
                </InputLabel>
                <Input
                    required
                    value={managmentStore.pageCreation.theme}
                    onChange={(event) => managmentStore.setPageCreation("theme", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <Typography > Теперь выберете тип, к которому относится ваша страница </Typography>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Тип страницы
                </InputLabel>
                <NativeSelect

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
            <FormControl fullWidth>
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
        </Stack>
    );
}))

export default StepOne