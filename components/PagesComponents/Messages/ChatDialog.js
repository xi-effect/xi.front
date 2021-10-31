import React, { useRef, useEffect } from "react";
import { Skeleton, Stack, Radio, Input, Grid, Box, InputLabel, Link, InputAdornment, Tooltip, IconButton, Checkbox, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, } from "@mui/material";
import { inject, observer } from 'mobx-react'

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const schema = yup.object({
    search: yup.string().required(),
}).required();

const ChatDialog = inject('rootStore', 'messageStore')(observer(({ rootStore, messageStore }) => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmitSearch = data => messageStore.searchUsers(data.search);


    return (
        <Dialog
            open={messageStore.ui.openDialog}
            onClose={() => messageStore.setUi("openDialog", false)}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle sx={{ bgcolor: 'background.2' }} id="scroll-dialog-title">
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Typography variant="h5"> Создание чата </Typography>
                    <Box component="form" sx={{ width: "100%", }}>
                        <FormControl fullWidth variant="outlined">
                            <Input
                                sx={{ backgroundColor: 'background.2', width: "100%", }}
                                type='text'
                                value={messageStore.dialogChatCreation.chatName}
                                onChange={(e) => messageStore.setDialogChatCreation("chatName", e.target.value)}
                                placeholder="Имя чата (не обязательно)"
                            />
                        </FormControl>
                    </Box>
                    <Typography> Пользователи в новом чате: </Typography>
                    {messageStore.dialogChatCreation.usersForChat.length === 0 && <Typography sx={{ width: '100%' }} align="center" variant="subtitle1"> Вы пока не выбрали ни одного пользователя </Typography>}
                    {messageStore.dialogChatCreation.usersForChat.length !== 0 && messageStore.usersForChat.map((item, index) => (
                        <Stack
                            key={index.toString()}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={0}
                            sx={{
                                width: 'calc(100% - 72px)',
                            }}
                        >
                            <Checkbox
                                color="default"
                                sx={{ color: 'text.main' }}
                                checked={true}
                                onChange={null}
                            />
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                // spacing={1}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Link
                                    sx={{
                                        fontSize: 22,
                                        cursor: "pointer",
                                        color: 'text.main',
                                    }}
                                    // onClick={() => {
                                    //     router.push({
                                    //         pathname: '/students',
                                    //     })
                                    // }}
                                    underline="hover"
                                >
                                    Человек
                                </Link>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap>ыыамтфлаифримажфлыаитфвлоаиржлыаомртэыжфшаиртфатифжыаоитж</Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <IconButton>
                                <AccountCircleIcon />
                            </IconButton>
                        </Stack>
                    ))}


                </Stack>
            </DialogTitle>
            <DialogContent sx={{ bgcolor: 'background.2' }} dividers>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={1}
                >
                    <Box component="form" sx={{ width: "100%", }} onSubmit={handleSubmit(onSubmitSearch)}>
                        <Controller
                            name="search"
                            control={control}
                            render={({ field }) => <FormControl error={errors?.search?.type === "required"} fullWidth variant="outlined">
                                <Input
                                    sx={{ backgroundColor: 'background.2', width: "100%", }}
                                    type='text'
                                    // value={emailReset}
                                    // onChange={null}
                                    {...field}
                                    placeholder="Поиск"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton type="submit" edge="end" size="large">
                                                <Tooltip title="Найти" arrow>
                                                    <SearchIcon sx={{ color: 'text.main' }} />
                                                </Tooltip>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>}
                        />
                    </Box>
                    <Typography> Результаты поиска: </Typography>
                    {messageStore.dialogChatCreation.searchResults.length === 0 && <Typography sx={{ width: '100%' }} align="center" variant="subtitle1"> Введите поисковой запрос </Typography>}
                    {messageStore.dialogChatCreation.searchResults.length !== 0 && messageStore.dialogChatCreation.searchResults.map((item, index) => (
                        <Stack
                            key={index.toString()}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={0}
                            sx={{
                                width: 'calc(100% - 72px)',
                            }}
                        >
                            <Checkbox
                                color="default"
                                sx={{ color: 'text.main' }}
                                checked={null}
                                onChange={null}
                            />
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                // spacing={1}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Link
                                    sx={{
                                        fontSize: 22,
                                        cursor: "pointer",
                                        color: 'text.main',
                                    }}
                                    // onClick={() => {
                                    //     router.push({
                                    //         pathname: '/students',
                                    //     })
                                    // }}
                                    underline="hover"
                                >
                                    Человек
                                </Link>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap>ыыамтфлаифримажфлыаитфвлоаиржлыаомртэыжфшаиртфатифжыаоитж</Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                            <IconButton>
                                <AccountCircleIcon />
                            </IconButton>
                        </Stack>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions sx={{ bgcolor: 'background.2' }}>
                <Button sx={{ color: 'text.main' }} onClick={() => messageStore.setUi("openDialog", false)}>Отмена</Button>
                <Button sx={{ color: 'text.main' }} onClick={() => messageStore.createChat()}>Готово</Button>
            </DialogActions>
        </Dialog>
    );
}))

export default ChatDialog