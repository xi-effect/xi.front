import React from "react";
import { Input, InputLabel, NativeSelect, FormControl, FormControlLabel, Switch, Typography, Stack } from "@mui/material";



import { inject, observer } from "mobx-react"


const StepOne = inject("managmentSt")(observer(({ managmentSt }) => (
    <Stack
        spacing={2}
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
            width: "100%",
            p: 4,
            maxWidth: 800,
        }}
    >
        <Typography
            variant="Roboto500XiLabel"
            sx={{
                marginLeft: 2,
                fontSize: 24,
                cursor: "default",
            }}
        > Шаг 1. Основная информация</Typography>
        <Typography> Заполните основную информацию о вашем новой страницы</Typography>
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Название страницы
            </InputLabel>
            <Input
                required
                value={managmentSt.pageCreation.name}
                onChange={(event) => managmentSt.setPageCreation("name", event.target.value)}
            // margin="dense"
            // multiline={true}
            // fullWidth={true}
            />
        </FormControl>
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Описание страницы
            </InputLabel>
            <Input
                required
                value={managmentSt.pageCreation.description}
                onChange={(event) => managmentSt.setPageCreation("description", event.target.value)}
                multiline
            // fullWidth={true}
            />
        </FormControl>
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Тематика страницы
            </InputLabel>
            <Input
                required
                value={managmentSt.pageCreation.theme}
                onChange={(event) => managmentSt.setPageCreation("theme", event.target.value)}
                multiline
            // fullWidth={true}
            />
        </FormControl>
        <Typography > Теперь выберете тип, к которому относится ваша страница </Typography>
        <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Тип страницы
            </InputLabel>
            <NativeSelect

                // defaultValue={"Не выбрано"}
                value={managmentSt.pageCreation.kind}
                onChange={(event) => managmentSt.setPageCreation("kind", event.target.value)}
                inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                }}
            >
                <option value="not selected"> Не выбрано </option>
                <option value="theory"> Теория </option>
                <option value="practice"> Практика </option>
                <option value="task"> Тестовое задание </option>
            </NativeSelect>
        </FormControl>
        <FormControl fullWidth>
            <FormControlLabel
                control={
                    <Switch
                        checked={managmentSt.pageCreation.blueprint}
                        onChange={() => managmentSt.setPageCreation("blueprint", !managmentSt.pageCreation.blueprint)}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Чертёж"
            />
        </FormControl>
    </Stack>
)))

export default StepOne