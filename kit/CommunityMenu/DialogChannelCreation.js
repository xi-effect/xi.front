/* eslint-disable react/prop-types */
import React from "react";
import { inject, observer } from "mobx-react";

import { Button, Box, Stack, Typography, Radio, IconButton, Dialog, DialogContent, useMediaQuery } from "@mui/material";

import MobileDialog from 'kit/MobileDialog';
import CloseIcon from '@mui/icons-material/Close';
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ForumIcon from "@mui/icons-material/Forum";
import ArticleIcon from '@mui/icons-material/Article';
import { grey } from '@mui/material/colors';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextFieldCustom from 'kit/TextFieldCustom';

const schema = yup
    .object({
        name: yup.string().min(0).max(100).required(),
    })
    .required();

const content = [
    {
        label: 'Текстовый канал',
        description: 'Отправляйте сообщения, изображения, эмодзи',
        icon: <ForumIcon sx={{ fontSize: 30 }} />,
    },
    {
        label: 'Голосовой канал',
        description: 'Совершайте групповые звонки с возможностью использовать видеосвязь и демонстрацию экрана',
        icon: <RecordVoiceOverIcon sx={{ fontSize: 30 }} />,
    },
    {
        label: 'Страница',
        description: 'Создавайте и делитесь контентом. Например, это может быть конспект к уроку',
        icon: <ArticleIcon sx={{ fontSize: 30 }} />,
    },
];

const getType = (num) => {
    if (num === 0) return "chat";
    if (num === 1) return "room";
    if (num === 2) return "page";
    return "room";
};

const Content = inject()(observer((props) => {
    const { communityChannelsSt, uiSt } = props;

    // @ts-ignore
    const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));
    const [channelSelect, setChannelSelect] = React.useState(0);
    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("onSubmit");
        trigger();
        const type = getType(channelSelect);
        communityChannelsSt.pushNewChannel({ ...data, type });
        uiSt.setDialogs("channelCreation", false);
    };

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                height: 500,
                width: "100%",
            }}
            spacing={1}
        >
            {content.map((item, index) => (
                <Stack
                    key={index.toString()}
                    onClick={() => setChannelSelect(index)}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        p: 1,
                        minHeight: 96,
                        width: "100%",
                        boxShadow: 12,
                        bgcolor: channelSelect === index ? grey[700] : grey[800],
                        borderRadius: 2,
                        cursor: "pointer",
                    }}
                    spacing={1}
                >
                    <Box sx={{ p: 1 }}>
                        {item.icon}
                    </Box>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={0.5}
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Typography sx={{ fontSize: 22, fontWeight: 700 }}>
                            {item.label}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }}>
                            {item.description}
                        </Typography>
                    </Stack>

                    <Radio
                        checked={channelSelect === index}
                        color="default"
                    />
                </Stack>
            ))}
            <Typography variant="subtitle2" sx={{ color: "text.secondary", pt: 2, pb: 1 }}> НАЗВАНИЕ </Typography>
            <Box
                sx={{ width: '100%' }}
            >
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextFieldCustom
                            variant="filled"
                            error={
                                errors?.email?.type === 'email'
                            }
                            type="text"
                            fullWidth
                            label="Название канала"
                            {...field}
                        />
                    )}
                />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: '100%', pt: 2, pb: 4 }}
                    spacing={2}
                >
                    <Button
                        size="large"
                        onClick={() => uiSt.setDialogs("channelCreation", false)}
                        sx={{
                            '&.MuiButton-root': {
                                fontFamily: 'Roboto',
                                fontSize: '15px',
                                lineHeight: '26px',
                                letterSpacing: '0.46000000834465027px',
                                width: mobile ? '140px' : '140px',
                                height: mobile ? '42px' : '42px',
                                color: 'text.primary',
                                borderRadius: mobile ? '62px' : '88px',
                            },
                        }}>
                        Отмена
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSubmit(onSubmit)}
                        sx={{
                            '&.MuiButton-root': {
                                fontFamily: 'Roboto',
                                fontSize: '15px',
                                lineHeight: '26px',
                                letterSpacing: '0.46000000834465027px',
                                width: mobile ? '196px' : '196px',
                                height: mobile ? '42px' : '42px',
                                color: 'text.primary',
                                bgcolor: 'secondary.main',
                                borderRadius: mobile ? '62px' : '88px',
                                '&:hover': {
                                    bgcolor: 'secondary.dark',
                                },
                                boxShadow: 2,
                            },
                        }}>
                        Готово
                    </Button>
                </Stack>
            </Box>
        </Stack>);
}));

const DialogChannelCreation = inject("communityChannelsSt", "uiSt")(observer(({ communityChannelsSt, uiSt }) => {
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

    return (
        <>
            {!fullScreen && <Dialog
                open={uiSt.dialogs.channelCreation}
                onClose={() => uiSt.setDialogs("channelCreation", false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="md"
                sx={{
                    borderRadius: 8,
                }}
                PaperProps={{
                    sx: {
                        borderRadius: 8,
                    }
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        height: 64,
                        width: "100%",
                        p: 1,
                    }}
                >
                    <Typography sx={{ mt: 2, ml: 2, mr: "auto" }} variant="h6">
                        Создать канал
                    </Typography>
                    <IconButton onClick={() => uiSt.setDialogs("channelCreation", false)} sx={{ mt: 2 }}>
                        <CloseIcon sx={{ fontSize: 32, color: 'text.secondary' }} />
                    </IconButton>
                </Stack>
                <DialogContent>
                    <Content communityChannelsSt={communityChannelsSt} uiSt={uiSt} />
                </DialogContent>
            </Dialog>}
            {fullScreen && <MobileDialog
                open={uiSt.dialogs.channelCreation}
                setOpen={() => uiSt.setDialogs("channelCreation", false)}
                title="Создание канала"
            >
                <Stack>
                    <Content communityChannelsSt={communityChannelsSt} uiSt={uiSt} />
                </Stack>
            </MobileDialog>}
        </>
    );
}));


export default DialogChannelCreation;