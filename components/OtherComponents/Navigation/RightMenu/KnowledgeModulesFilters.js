/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react";

import { Button, InputLabel, Radio, FormControl, Select, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material";

const categoryList = [
    { key: 9, title: "Все категории", name: "default" },
    { key: 0, title: "Средняя школа", name: "middle-school" },
    { key: 1, title: "Основная школа", name: "main-school" },
    { key: 2, title: "Высшая школа", name: "high-school" },
    { key: 3, title: "Высшее образование", name: "university" },
    { key: 4, title: "Кружки", name: "clubs" },
    { key: 5, title: "Хобби", name: "hobby" },
    { key: 6, title: "ОГЭ", name: "bne" },
    { key: 7, title: "ЕГЭ", name: "une" },
    { key: 8, title: "Профессиональные навыки", name: "prof-skills" },
]

const themeList = [
    { key: 14, title: "Все темы", name: "default" },
    { key: 0, title: "Математика", name: "math" },
    { key: 1, title: "Алгебра", name: "algebra" },
    { key: 2, title: "Геометрия", name: "geometry" },
    { key: 3, title: "Языки", name: "languages" },
    { key: 4, title: "Физика", name: "physics" },
    { key: 5, title: "Химия", name: "chemistry" },
    { key: 6, title: "Биология", name: "biology" },
    { key: 7, title: "География", name: "geography" },
    { key: 8, title: "История", name: "history" },
    { key: 9, title: "Обществознание", name: "social-science" },
    { key: 10, title: "Искусства", name: "arts" },
    { key: 11, title: "Информатика", name: "informatics" },
    { key: 12, title: "Литература", name: "literature" },
    { key: 13, title: "Философия", name: "philosophy" },
]

const difficultyList = [
    { key: 9, title: "Все уровни", name: "default" },
    { key: 0, title: "Обзорный", name: "review" },
    { key: 1, title: "Новичок", name: "newbie" },
    { key: 2, title: "Любитель", name: "amateur" },
    { key: 3, title: "Энтузиаст", name: "enthusiast" },
    { key: 4, title: "Профи", name: "professional" },
    { key: 5, title: "Эксперт", name: "expert" },
]


const KnowledgeModulesFilters = inject(
    "knowledgeSt",
)(
    observer(({ knowledgeSt }) => (
        <MenuList
            // spacing={2}
            sx={{
                // p: 0.5,
            }}
        >
            <MenuItem
                sx={{
                    p: 0,
                    pl: 0.5,
                }}
                onClick={() => {
                    knowledgeSt.setModuleListDataSecondary("filters", "global", "default")
                }}
            >
                <ListItemIcon>
                    <Radio
                        checked={knowledgeSt.moduleList.filters.global === "default"}
                        color="default"
                    />
                </ListItemIcon>
                <ListItemText>Все модули</ListItemText>
            </MenuItem>
            <MenuItem
                sx={{
                    p: 0,
                    pl: 0.5,
                }}
                onClick={() => {
                    if (knowledgeSt.moduleList.filters.global === "starred") return knowledgeSt.setModuleListDataSecondary("filters", "global", "default")
                    if (knowledgeSt.moduleList.filters.global !== "starred") return knowledgeSt.setModuleListDataSecondary("filters", "global", "starred")
                    return null
                }}
            >
                <ListItemIcon>
                    <Radio
                        checked={knowledgeSt.moduleList.filters.global === "starred"}
                        color="default"
                    />
                </ListItemIcon>
                <ListItemText>Избранные модули</ListItemText>
            </MenuItem>
            <MenuItem
                sx={{
                    p: 0,
                    pl: 0.5,
                }}
                onClick={() => {
                    if (knowledgeSt.moduleList.filters.global !== "started") return knowledgeSt.setModuleListDataSecondary("filters", "global", "started")
                    if (knowledgeSt.moduleList.filters.global === "started") return knowledgeSt.setModuleListDataSecondary("filters", "global", "default")
                    return null
                }}
            >
                <ListItemIcon>
                    <Radio
                        checked={knowledgeSt.moduleList.filters.global === "started"}
                        color="default"
                    />
                </ListItemIcon>
                <ListItemText>Начатые модули</ListItemText>
            </MenuItem>
            <MenuItem
                sx={{
                    p: 0,
                    pl: 0.5,
                }}
                onClick={() => {
                    if (knowledgeSt.moduleList.filters.global !== "pinned") return knowledgeSt.setModuleListDataSecondary("filters", "global", "pinned")
                    if (knowledgeSt.moduleList.filters.global === "pinned") return knowledgeSt.setModuleListDataSecondary("filters", "global", "default")
                    return null
                }}
            >
                <ListItemIcon>
                    <Radio
                        checked={knowledgeSt.moduleList.filters.global === "pinned"}
                        color="default"
                    />
                </ListItemIcon>
                <ListItemText>Смотреть позже</ListItemText>
            </MenuItem>
            <FormControl fullWidth variant="standard" sx={{ mt: 2, ml: 2, mr: 2, width: "calc(100% - 32px)" }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Тема
                </InputLabel>
                <Select
                    sx={{
                        color: "text.main",
                    }}
                    value={knowledgeSt.moduleList.filters.theme ?? null}
                    onChange={(event) => knowledgeSt.setModuleListDataSecondary("filters", "theme", event.target.value)}
                >
                    {themeList.map((item, index) => (
                        <MenuItem key={index.toString()} sx={{ color: "text.main" }} value={item.name}> {item.title} </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" sx={{ mt: 2, ml: 2, mr: 2, width: "calc(100% - 32px)" }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Категория
                </InputLabel>
                <Select
                    sx={{
                        color: "text.main",
                    }}
                    value={knowledgeSt.moduleList.filters.category ?? null}
                    onChange={(event) => knowledgeSt.setModuleListDataSecondary("filters", "category", event.target.value)}
                >
                    {categoryList.map((item, index) => (
                        <MenuItem key={index.toString()} sx={{ color: "text.main" }} value={item.name}> {item.title} </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth variant="standard" sx={{ mt: 2, ml: 2, mr: 2, width: "calc(100% - 32px)" }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Сложность
                </InputLabel>
                <Select
                    sx={{
                        color: "text.main",
                    }}
                    value={knowledgeSt.moduleList.filters.difficulty ?? null}
                    onChange={(event) => knowledgeSt.setModuleListDataSecondary("filters", "difficulty", event.target.value)}
                >
                    {difficultyList.map((item, index) => (
                        <MenuItem key={index.toString()} sx={{ color: "text.main" }} value={item.name}> {item.title} </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={() => knowledgeSt.loadModuleList()} variant="contained" sx={{ color: "text.primary", ml: 8, mt: 2, }}>
                Применить
            </Button>
        </MenuList>
    ))
);

export default KnowledgeModulesFilters;