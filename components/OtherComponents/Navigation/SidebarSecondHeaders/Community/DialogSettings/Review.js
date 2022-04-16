/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react"

import { Stack, Typography } from "@mui/material";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from "../../../../../../kit/TextFieldCustom";

const schema = yup
    .object({
        name: yup.string().email().max(100).required(),
        description: yup.string().min(6).max(256).required(),
    })
    .required();


const Review = inject()(observer(() => {

    const {
        control,
        handleSubmit,
        trigger,
        // formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = () => {
        trigger();
        // authorizationSt.clickEnterButton(data, trigger);
    };

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: "100%"
            }}
        >
            <Typography variant='h5'>
                Обзор Сообщества
            </Typography>
            <Controller
                name="name"
                control={control}
                defaultValue="ывпрыпр"
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
    )
}));

export default Review;