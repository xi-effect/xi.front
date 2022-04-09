/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Stack, Input, Grid, Link, InputAdornment, Tooltip, IconButton, Checkbox, FormControl, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, } from "@mui/material";
import { inject, observer } from "mobx-react"
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";


const ChatDialog = inject("messageSt")(observer(({ messageSt }) => (
    <Dialog
        open={messageSt.dialogChatCreation.openDialog}
        onClose={() => messageSt.setDialogChatCreation("openDialog", false)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
    >
        <DialogTitle sx={{ bgcolor: "background.2" }} id="scroll-dialog-title">
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={1}
            >
                <Typography variant="h5"> Создание чата </Typography>
                <FormControl sx={{ width: "100%", }} fullWidth variant="outlined">
                    <Input
                        sx={{ backgroundColor: "background.2", width: "100%", }}
                        type="text"
                        value={messageSt.dialogChatCreation.chatName}
                        onChange={(e) => messageSt.setDialogChatCreation("chatName", e.target.value)}
                        placeholder="Имя чата (не обязательно)"
                    />
                </FormControl>
                <Typography> Пользователи в новом чате: </Typography>
                {messageSt.dialogChatCreation.usersForChat.length === 0 && <Typography sx={{ width: "100%" }} align="center" variant="subtitle1"> Вы пока не выбрали ни одного пользователя </Typography>}
                {messageSt.dialogChatCreation.usersForChat.length !== 0 && messageSt.dialogChatCreation.usersForChat.map((item, index) => (
                    <Stack
                        key={index.toString()}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0}
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Checkbox
                            color="default"
                            sx={{ color: "text.main" }}
                            checked
                            onClick={() => messageSt.deleteInUsersForChat(index)}
                        />
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Link
                                sx={{
                                    fontSize: 22,
                                    cursor: "pointer",
                                    color: "text.main",
                                }}
                                underline="hover"
                            >
                                {item.username}
                            </Link>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <Typography sx={{ maxWidth: 400, }} noWrap>{item.bio}</Typography>
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
        <DialogContent sx={{ bgcolor: "background.2" }} dividers>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={1}
                sx={{ width: 500, }}
            >
                <FormControl fullWidth variant="outlined">
                    <Input
                        sx={{ backgroundColor: "background.2", width: "100%", }}
                        type="text"
                        value={messageSt.dialogChatCreation.search}
                        onChange={(e) => messageSt.setDialogChatCreation("search", e.target.value)}
                        placeholder="Поиск"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => messageSt.searchUsers()} type="submit" edge="end" size="large">
                                    <Tooltip title="Найти" arrow>
                                        <SearchIcon sx={{ color: "text.main" }} />
                                    </Tooltip>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <Typography> Результаты поиска: </Typography>
                {messageSt.dialogChatCreation.searchResults.length === 0 && <Typography sx={{ width: "100%" }} align="center" variant="subtitle1"> Введите поисковой запрос </Typography>}
                {messageSt.dialogChatCreation.searchResults.length !== 0 && messageSt.dialogChatCreation.searchResults.map((item, index) => (
                    <Stack
                        key={index.toString()}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={0}
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Checkbox
                            color="default"
                            sx={{ color: "text.main" }}
                            checked={null}
                            onClick={() => messageSt.selectUserInSearch(index)}
                        />
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                width: "100%",
                            }}
                        >
                            <Link
                                sx={{
                                    fontSize: 22,
                                    cursor: "pointer",
                                    color: "text.main",
                                }}
                                underline="hover"
                            >
                                {item.username}
                            </Link>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <Typography sx={{ maxWidth: 400, }} noWrap>{item.bio}</Typography>
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
        <DialogActions sx={{ bgcolor: "background.2" }}>
            <Button sx={{ color: "text.main" }} onClick={() => messageSt.setDialogChatCreation("openDialog", false)}>Отмена</Button>
            <Button sx={{ color: "text.main" }} onClick={() => messageSt.createChat()}>Готово</Button>
        </DialogActions>
    </Dialog>
)))

export default ChatDialog