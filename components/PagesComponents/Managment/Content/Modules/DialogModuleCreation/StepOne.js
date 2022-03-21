import React from "react";
import { Input, InputLabel, NativeSelect, FormControl, Typography, Stack } from "@mui/material";
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
        <Typography variant="Roboto500XiLabel" sx={{ cursor: "default", fontSize: 20 }}> Шаг 1. Основная информация</Typography>
        <Typography variant="h6" sx={{ cursor: "default" }}> Заполните основную информацию о вашем новом модуле</Typography>
        <FormControl sx={{
            width: "calc(100% - 64px)",
            color: "text.main",
            marginTop: 1,
            marginLeft: 2,
            marginRight: 2,
        }} fullWidth>
            <InputLabel sx={{
                color: "text.main",
            }} variant="standard" htmlFor="uncontrolled-native">
                Название модуля
            </InputLabel>
            <Input
                sx={{
                    color: "text.main",
                }}
                required
                value={managmentSt.moduleCreation.name}
                onChange={(event) => managmentSt.setModuleCreation("name", event.target.value)}
            // margin="dense"
            // multiline={true}
            // fullWidth={true}
            />
        </FormControl>
        <FormControl sx={{
            width: "calc(100% - 64px)",
            color: "text.main",
            marginTop: 1,
            marginLeft: 2,
            marginRight: 2,
        }} fullWidth>
            <InputLabel sx={{
                color: "text.main",
            }} variant="standard" htmlFor="uncontrolled-native">
                Тип модуля
            </InputLabel>
            <NativeSelect
                sx={{
                    color: "text.main",
                }}
                // defaultValue={"Не выбрано"}
                value={managmentSt.moduleCreation.type}
                onChange={(event) => managmentSt.setModuleCreation("type", event.target.value)}
            >
                <option value="standard"> Стандартный </option>
                <option value="practice-block"> Практика </option>
                <option value="theory-block"> Теория </option>
                <option value="test"> Проверочная </option>
            </NativeSelect>
        </FormControl>
        <FormControl sx={{
            width: "calc(100% - 64px)",
            color: "text.main",
            marginTop: 1,
            marginLeft: 2,
            marginRight: 2,
        }} fullWidth>
            <InputLabel sx={{
                color: "text.main",
            }} variant="standard" htmlFor="uncontrolled-native">
                Тема модуля
            </InputLabel>
            <NativeSelect
                sx={{
                    color: "text.main",
                }}
                // defaultValue={"Не выбрано"}
                value={managmentSt.moduleCreation.theme}
                onChange={(event) => managmentSt.setModuleCreation("theme", event.target.value)}
                inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                }}
            >
                <option value="not selected">Не выбрано</option>
                <option value="math">Математика</option>
                <option value="algebra">Алгебра</option>
                <option value="geometry">Геометрия</option>
                <option value="languages">Языки</option>
                <option value="physics">Физика</option>
                <option value="chemistry">Химия</option>
                <option value="biology">Биология</option>
                <option value="geography">География</option>
                <option value="history">История</option>
                <option value="social-science">Обществознание</option>
                <option value="philosophy">Философия</option>
                <option value="literature">Литература</option>
                <option value="arts">Искусства</option>
                <option value="informatics">Информатика</option>
            </NativeSelect>
        </FormControl>
        <FormControl sx={{
            width: "calc(100% - 64px)",
            color: "text.main",
            marginTop: 1,
            marginLeft: 2,
            marginRight: 2,
        }} fullWidth>
            <InputLabel sx={{
                color: "text.main",
            }} variant="standard" htmlFor="uncontrolled-native">
                Категория модуля
            </InputLabel>
            <NativeSelect
                sx={{
                    color: "text.main",
                }}
                // defaultValue={"Не выбрано"}
                value={managmentSt.moduleCreation.category}
                onChange={(event) => managmentSt.setModuleCreation("category", event.target.value)}
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
        <FormControl sx={{
            width: "calc(100% - 64px)",
            color: "text.main",
            marginTop: 1,
            marginLeft: 2,
            marginRight: 2,
        }} fullWidth>
            <InputLabel sx={{
                color: "text.main",
            }} variant="standard" htmlFor="uncontrolled-native">
                Сложность модуля
            </InputLabel>
            <NativeSelect
                sx={{
                    color: "text.main",
                }}
                // defaultValue={"Не выбрано"}
                value={managmentSt.moduleCreation.difficulty}
                onChange={(event) => managmentSt.setModuleCreation("difficulty", event.target.value)}
                inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                }}
            >
                <option value="not selected">Не выбрано</option>
                <option value="review"> Обзорный</option>
                <option value="newbie"> Новичок</option>
                <option value="amateur"> Любитель</option>
                <option value="enthusiast"> Энтузиаст</option>
                <option value="professional"> Профи</option>
                <option value="expert"> Эксперт</option>
            </NativeSelect>
        </FormControl>
        <FormControl sx={{
            width: "calc(100% - 64px)",
            color: "text.main",
            marginTop: 1,
            marginLeft: 2,
            marginRight: 2,
        }} fullWidth>
            <InputLabel sx={{
                color: "text.main",
            }} variant="standard" htmlFor="uncontrolled-native">
                Описание модуля
            </InputLabel>
            <Input
                required
                sx={{
                    color: "text.main",
                }}
                value={managmentSt.moduleCreation.description}
                onChange={(event) => managmentSt.setModuleCreation("description", event.target.value)}
                multiline
            // fullWidth={true}
            />
        </FormControl>
    </Stack>
)))

export default StepOne