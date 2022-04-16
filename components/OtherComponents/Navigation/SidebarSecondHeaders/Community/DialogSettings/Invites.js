import React from "react";
import { inject, observer } from "mobx-react"

import { Stack, Stepper, Paper, Button, Box, Step, StepLabel, StepContent, Typography, Divider } from "@mui/material";

import { useForm, } from 'react-hook-form'; // Controller
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from "../../../../../../kit/TextFieldCustom";

const steps = [
    {
        label: 'Выберите роль',
        description: `Выбранная вами роль будет автоматически добавлена пользователю, который присоедениться по этому приглашению`,
    },
    {
        label: 'Задайте время действия',
        description:
            'Вы можете дополнительно задать время действия приглшения с момента его создания',
    },
    {
        label: 'Добавте ограничение на использование',
        description: `Вы можете дополнительно задать количетство новых участников, которые могут воспользоваться этим приглашением`,
    },
];

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

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Последний шаг</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Завершить' : 'Вперёд'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Назад
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3, borderRadius: 4 }}>
                    <Typography>Новое приглашение только что создано!</Typography>
                    <Typography variant="subtitle2">Скопируйте ссылку ниже и отправьте её пользователю, которого хотите пригласить</Typography>
                    <TextFieldCustom
                        variant="filled"
                        type="text"
                        fullWidth
                        label="Ссылка-приглашение"
                    />
                    <Button color="inherit" onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Создать ещё одно приглашение
                    </Button>
                </Paper>
            )}
            <Divider flexItem />
            <Typography sx={{ mt: 2 }} variant='subtitle1'>
                Ранее созданные приглашения
            </Typography>
        </Stack>
    )
}));

export default Invites;