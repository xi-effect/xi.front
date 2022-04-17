import React from "react";
import { inject, observer } from "mobx-react"

import { Stack, Box, Typography, FormControl, Select, InputLabel, MenuItem, Divider, IconButton } from "@mui/material";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Avatar from "boring-avatars";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { blue, teal, green, orange, red, blueGrey, indigo } from '@mui/material/colors';
import TextFieldCustom from "../../../../../../kit/TextFieldCustom";


const getColor = () => {
    const color = Math.floor(Math.random() * (7 - 1) + 1);
    const colorIndex = Math.floor(Math.random() * (9 - 1) + 1);
    switch (color) {
        case 1: return blue[Number(`${colorIndex}00`)]
        case 2: return teal[Number(`${colorIndex}00`)]
        case 3: return green[Number(`${colorIndex}00`)]
        case 4: return orange[Number(`${colorIndex}00`)]
        case 5: return red[Number(`${colorIndex}00`)]
        case 6: return blueGrey[Number(`${colorIndex}00`)]
        case 7: return indigo[Number(`${colorIndex}00`)]
        default: return green[`${colorIndex}00`]
    }
};

const getNewColorsArray = (colors) => colors.map(() => getColor())

const schema = yup
    .object({
        name: yup.string().email().max(100).required(),
        description: yup.string().min(6).max(256).required(),
    })
    .required();


const Review = inject()(observer(() => {

    const {
        control,
        // trigger,
        // formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const onSubmit = () => {
    //     trigger();
    //     // authorizationSt.clickEnterButton(data, trigger);
    // };

    const [avatarType, setAvatarType] = React.useState('marble');

    const handleChange = (event) => {
        setAvatarType(event.target.value);
    };

    const [colors, setColors] = React.useState(["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]);

    const generateNewColors = () => {
        const newColors = getNewColorsArray(colors);
        setColors(newColors);
    }

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            component="form"
            sx={{
                width: "100%"
            }}
        >
            <Typography variant='h5'>
                Обзор Сообщества
            </Typography>
            <Divider flexItem />
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{
                    p: 2,
                    width: "100%"
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{
                        width: '100%',
                    }}
                >
                    <Box>
                        <Avatar
                            size={128}
                            name="Maria l"
                            variant={avatarType}
                            colors={colors}
                        />
                    </Box>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                        sx={{
                            pl: 1,
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography variant="h6">
                                Аватар сообщества
                            </Typography>
                            <IconButton onClick={generateNewColors}>
                                <AutorenewIcon />
                            </IconButton>
                        </Stack>
                        <FormControl variant="filled" sx={{ m: 1, minWidth: 240 }}>
                            <InputLabel id="demo-simple-select-filled-label">Тема Аватара</InputLabel>
                            <Select
                                value={avatarType}
                                onChange={handleChange}
                            >
                                <MenuItem value="marble">marble</MenuItem>
                                <MenuItem value="beam">beam</MenuItem>
                                <MenuItem value="pixel">pixel</MenuItem>
                                <MenuItem value="sunset">sunset</MenuItem>
                                <MenuItem value="ring">ring</MenuItem>
                                <MenuItem value="bauhaus">bauhaus</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextFieldCustom
                            variant="filled"
                            type="text"
                            fullWidth
                            label="Название сообщества"
                            {...field}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextFieldCustom
                            variant="filled"
                            fullWidth
                            label="Описание сообщества"
                            minRows={5}
                            multiline
                            {...field}
                        />
                    )}
                />
            </Stack>

        </Stack>
    )
}));

export default Review;