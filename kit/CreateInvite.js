import React from "react";
import {
    Stepper,
    Paper,
    Button,
    Box,
    Step,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    StepLabel,
    StepContent,
    Typography, Grow, Stack, Chip, Tooltip,
} from "@mui/material";

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { inject, observer } from "mobx-react";
import { useSnackbar } from "notistack";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useCopyToClipboard } from "react-use";
import TextFieldCustom from "./TextFieldCustom";

const steps = [
    {
        label: 'Выберите роль',
        description: `Выбранная вами роль будет автоматически добавлена пользователю, который присоеденится по этому приглашению`,
    },
    {
        label: 'Задайте время действия',
        description:
            'Вы можете дополнительно задать время действия приглашения с момента его создания',
    },
    {
        label: 'Добавьте ограничение на использование',
        description: `Вы можете дополнительно задать количетство новых участников, которые могут воспользоваться этим приглашением`,
    },
];

const schema = yup
    .object({
        role: yup
            .string(),
        time: yup
            .number()
            .integer()
            .positive()
            .max(30, "Количество дней не должно быть больше 30")
            .nullable(true)
            // конвертируем undefined в null
            .transform((_, val) => val ? Number(val.slice(0, 2)) : null)
        ,
        count: yup
            .number()
            .integer()
            .positive()
            .max(100, "Количество использований не должно быть больше 100")
            .transform((_, val) => val ? Number(val) : null)
            .nullable(true)
            // конвертируем undefined в null
            .transform((_, val) => val ? Number(val) : null),
    })
    .required();

const CreateInvite = inject(
    "rootStore"
)(
    observer(({rootStore}) => {
        const {enqueueSnackbar} = useSnackbar();

        const [statusCopy, setStatusCopy] = React.useState(false);
        const [, copyToClipboard] = useCopyToClipboard();

        const [activeStep, setActiveStep] = React.useState(0);

        const handleNext = () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            const errorsOnFields = errors?.role?.message || errors?.count?.message || errors?.time?.message;

            if (activeStep === steps.length - 1) {
                reset({
                    role: trackedRole,
                    time: trackedDays,
                    count: trackedCount
                });
            }

            if ((activeStep === steps.length - 1) && (errorsOnFields)) {
                enqueueSnackbar("В одном из шагов допущена ошибка. Этот шаг помечен красным", {
                    variant: "warning",
                });
                handleReset();
            }
        };

        const handleBack = () => {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };

        const handleReset = () => {
            setActiveStep(0);
            setInviteLink(null);
        };

        const {
            control,
            formState: {errors},
            handleSubmit,
            reset,
        } = useForm({
            mode: 'onChange',
            resolver: yupResolver(schema),
        });

        const [inviteLink, setInviteLink] = React.useState(null);

        const onSubmit = data => {
            const errorsOnFields = errors?.role?.message || errors?.count?.message || errors?.time?.message;

            const communityId = window.location.href.split("/").pop();

            if (!errorsOnFields) {
                rootStore.fetchData(`${rootStore.url}/communities/${communityId}/invitations/`,
                    "POST",
                    {
                        "role": data.role,
                        "limit": '' || data.count,
                        "days": '' || data.time,
                    }
                ).then((response) => {
                    if (response.code)
                        setTimeout(() => setInviteLink(`https://xieffect.ru/invite/community/${response.code}`), 1000);
                });
            }
        };

        const [trackedRole, setTrackedRole] = React.useState('base');

        const roleStep = (
            <FormControl variant="filled" sx={{mt: 2, mb: 2, minWidth: 296}}>
                <InputLabel>Роль пользователя</InputLabel>
                <Controller
                    name="role"
                    control={control}
                    defaultValue='base'
                    render={({field}) => (
                        <Select {...field} error={errors?.role?.type === 'string'}
                                value={trackedRole}
                                onChange={(e) => setTrackedRole(e.target.value)}
                        >
                            <MenuItem value="base">Без роли</MenuItem>
                            <MenuItem value="owner">Владелец</MenuItem>
                        </Select>
                    )}
                />
                <Typography variant="caption">
                    {errors?.role?.type === 'string' && 'Ошибка в роли'}
                </Typography>
            </FormControl>
        );

        const [trackedDays, setTrackedDays] = React.useState("");

        const handleClickDayChip = (e) => {
            setTrackedDays(e.target.innerText.replace(/\s(дней|день)$/g, ''));
            reset({
                time: trackedDays
            }, {
                keepValues: true
            });
        };

        const timeStep = (
            <FormControl variant="filled" sx={{mt: 2, mb: 2, minWidth: 296}}>
                <Controller
                    name="time"
                    control={control}
                    render={({field}) => (
                        <TextFieldCustom
                            {...field}
                            onInput={(e) => setTrackedDays(e.target.value.toString()
                                .replace(/^0*/g, '') // не может начинаться с нуля
                                .replace(/[^0-9]/g, '')
                                .slice(0, 2))
                            }
                            value={trackedDays}
                            autoFocus
                            variant="filled"
                            id="time"
                            error={
                                errors?.time?.type === 'number' ||
                                errors?.time?.type === 'integer' ||
                                errors?.time?.type === 'max' ||
                                errors?.time?.type === 'positive'
                            }
                            fullWidth
                            label="Время действия"
                            helperText={(errors?.time?.type === 'number' ||
                                    errors?.time?.type === 'integer' ||
                                    errors?.time?.type === 'max' ||
                                    errors?.time?.type === 'positive') &&
                                errors?.time?.message
                            }
                        />
                    )}
                />
                <Stack direction="row" spacing={1} sx={{mt: 2}}>
                    <Chip label="1 день" size="small" onClick={handleClickDayChip}/>
                    <Chip label="7 дней" size="small" onClick={handleClickDayChip}/>
                    <Chip label="14 дней" size="small" onClick={handleClickDayChip}/>
                    <Chip label="30 дней" size="small" onClick={handleClickDayChip}/>
                </Stack>
            </FormControl>
        );

        const [trackedCount, setTrackedCount] = React.useState("");

        const handleClickCountChip = (e) => {
            setTrackedCount(e.target.innerText.replace(/\s(участник(ов)?)$/g, ''));
            reset({
                count: trackedCount
            }, {
                keepValues: true
            });
        };

        const countStep = (
            <FormControl variant="filled" sx={{mt: 2, mb: 2, minWidth: 296}}>
                <Controller
                    name="count"
                    control={control}
                    render={({field}) => (
                        <TextFieldCustom
                            {...field}
                            onInput={(e) => setTrackedCount(e.target.value.toString()
                                .replace(/^0*/g, '') // не может начинаться с нуля
                                .replace(/[^0-9]/g, ''))
                            }
                            value={trackedCount}
                            autoFocus
                            variant="filled"
                            id="time"
                            error={
                                errors?.count?.type === 'number' ||
                                errors?.count?.type === 'integer' ||
                                errors?.count?.type === 'max' ||
                                errors?.count?.type === 'positive'
                            }
                            fullWidth
                            label="Количество использований"
                            helperText={(errors?.count?.type === 'number' ||
                                    errors?.count?.type === 'integer' ||
                                    errors?.count?.type === 'max' ||
                                    errors?.count?.type === 'positive') &&
                                errors?.count?.message
                            }
                        />
                    )}
                />
                <Stack direction="row" spacing={1} sx={{mt: 2}}>
                    <Chip label="1 участник" size="small" onClick={handleClickCountChip}/>
                    <Chip label="5 участников" size="small" onClick={handleClickCountChip}/>
                    <Chip label="10 участников" size="small" onClick={handleClickCountChip}/>
                    <Chip label="100 участников" size="small" onClick={handleClickCountChip}/>
                </Stack>
            </FormControl>
        );

        const generatedLinkBlock = (
            <Paper square elevation={0} sx={{p: 3, borderRadius: 4}}>
                <Typography>{inviteLink ? "Новое приглашение только что создано!" : "Ваша ссылка генерируется..."}</Typography>
                <Typography variant="subtitle2">
                    {inviteLink ? "Скопируйте ссылку ниже и отправьте её пользователю, которого хотите пригласить" :
                        "Вы сможете скопировать ссылку как только она сгенерируется"}
                </Typography>
                <Tooltip
                    title={
                        statusCopy
                            ? "Ссылка успешно скопирован в буфер обмена!"
                            : "Кликните чтобы скопировать ссылку"
                    }
                >
                    <TextFieldCustom
                        focused
                        variant="filled"
                        type="text"
                        fullWidth
                        label="Ссылка-приглашение"
                        disabled={!inviteLink}
                        value={inviteLink}
                        onClick={() => {
                            if (inviteLink) {
                                copyToClipboard(inviteLink);
                                setStatusCopy(true);
                            }
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button sx={{color: "text.primary"}} disabled={!inviteLink}>
                                        <ContentCopyIcon/>
                                    </Button>
                                </InputAdornment>
                            ),
                            readOnly: true,
                            style: {
                                cursor: "pointer",
                                width: "100%",
                            },
                        }}
                    />
                </Tooltip>
                <Button color="inherit"
                        onClick={() => {
                            setTrackedRole("base");
                            setTrackedDays("");
                            setTrackedCount("");
                            handleReset();
                        }}
                        sx={{mt: 1, mr: 1}}
                        disabled={!inviteLink}
                >
                    Создать ещё одно приглашение
                </Button>
            </Paper>
        );

        return (
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                error={
                                    (errors?.role?.message && index === 0) ||
                                    (errors?.time?.message && index === 1) ||
                                    (errors?.count?.message && index === 2)
                                }
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
                                {index === 0 && roleStep}
                                {index === 1 && timeStep}
                                {index === 2 && countStep}
                                <Box sx={{mb: 2}}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{mt: 1, mr: 1}}
                                            type={index === steps.length - 1 ? 'submit' : 'button'}
                                        >
                                            {index === steps.length - 1 ? 'Завершить' : 'Вперёд'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{mt: 1, mr: 1}}
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
                    <Grow in
                          style={{transformOrigin: '0 0 0'}}
                          {...({timeout: 1500})}
                    >
                        {generatedLinkBlock}
                    </Grow>
                )}
            </Box>
        );
    })
);

export default CreateInvite;
