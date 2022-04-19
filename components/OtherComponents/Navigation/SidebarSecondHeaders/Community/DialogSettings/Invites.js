import React from "react";
import { inject, observer } from "mobx-react";

import { Stack, Typography, Divider } from "@mui/material";

import { useForm, } from 'react-hook-form'; // Controller
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import CreateInvite from '../../../../../../kit/CreateInvite';

const schema = yup
    .object({
        name: yup.string().email().max(100).required(),
        description: yup.string().min(6).max(256).required(),
    })
    .required();


const Invites = inject()(observer(() => {

    const {
        // control,
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
                Приглашения Сообщества
            </Typography>
            <Divider flexItem />
            <Typography sx={{ mt: 2 }} variant='subtitle1'>
                Создание приглашения
            </Typography>
            <CreateInvite />
            <Divider flexItem />
            <Typography sx={{ mt: 2 }} variant='subtitle1'>
                Ранее созданные приглашения
            </Typography>
        </Stack>
    );
}));

export default Invites;