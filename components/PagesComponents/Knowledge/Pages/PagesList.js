/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Link from "next/link";
import cx from 'clsx';
import clsx from 'clsx';
import { Divider, CardContent, MenuItem, Popper, MenuList, Avatar, Paper, Accordion, IconButton, Chip, AccordionSummary, AccordionDetails, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { inject, observer } from 'mobx-react'

const Views = React.memo(({ views }) => {
    const theme = useTheme()

    if (views < 1000) {
        return (
            <>
                <VisibilityIcon />
                <Typography sx={{ color: "white" }}> {`${views}`} </Typography>
            </>
        )
    }
    if (views >= 1000 && views < 1000000) {
        return (
            <>
                <VisibilityIcon />
                <Typography sx={{ color: "white" }}> {`${Math.round(views / 1000)}к`} </Typography>
            </>
        )
    }
    if (views > 1000000) {
        return (
            <>
                <VisibilityIcon />
                <Typography sx={{ color: "white" }}> {`${Math.round(views / 1000000)} млн`} </Typography>
            </>
        )
    }
})


const PagesList = inject('knowledgeStore', 'uiStore')(observer(({ knowledgeStore, uiStore }) => {
    const theme = useTheme();

    const knowledgeUI = uiStore.knowledgeUI
    const [openMenu, setOpenMenu] = React.useState(false)

    const kindSelect = (value) => {
        if (value === "theory") return "Теория"
        if (value === "practice") return "Практика"
        if (value === "task") return "Проверочная работа"
    }

    const buttonLabelSelect = (value) => {
        if (value === "theory") return "теории"
        if (value === "practice") return "практике"
        if (value === "task") return "проверочной"
    }

    return (
        <Grid
            container
            //direction={knowledgeUI.gridTypeOnPage === "grid" ? "row" : "column"}
            //justifyContent="center"
            //alignItems="center"
            sx={{
                margin: 4,
                width: "calc(100% - 64px)",
                borderRadius: 2,
                //backgroundColor: 'background.1',
            }}
        >
            {
                knowledgeStore.pageList.pages.map((page, index) => (
                    <Grid
                        xs={12} sm={12} md={6} lg={4} xl={3}
                        item
                        sx={{ p: 1, }}
                        container
                        justifyContent="center"
                        alignItems="center"
                        key={index.toString()}>
                        <Card elevation={24} sx={{
                            position: 'relative',
                            border: '2px solid',
                            borderColor: 'primary.dark',
                            borderRadius: 8,
                            transition: '0.4s',
                            '&:hover': {
                                borderColor: 'primary.light',
                            },
                            width: '100%',
                            overflow: 'initial',
                            backgroundColor: 'background.2',
                        }}>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 1.5,
                                    right: 1.5,
                                    color: 'text.main',
                                }}
                                variant="contained"
                                color="primary"
                                onClick={(event) => setOpenMenu(event.currentTarget)}
                                size="large">
                                <MoreVertIcon />
                            </IconButton>
                            <Popper sx={{ zIndex: 1000, }} id={undefined} open={Boolean(openMenu)} onClose={() => setOpenMenu(false)} anchorEl={openMenu}>
                                <Paper sx={{ zIndex: 1000, }}>
                                    <MenuList
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                    >
                                        <MenuItem onClick={() => setOpenMenu(false)}>Скрыть курс</MenuItem>
                                        <MenuItem onClick={() => setOpenMenu(false)}>Пожаловаться</MenuItem>
                                        <MenuItem onClick={() => setOpenMenu(false)}>Logout</MenuItem>
                                    </MenuList>
                                </Paper>
                            </Popper>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ marginBottom: 0.5, }}
                            >
                                {/* wrap="nowrap" spacing={2} */}
                                <Grid item container>
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <Tooltip arrow title={`Название: ${page.name}`}>
                                                <Typography sx={{
                                                    cursor: "default",
                                                    marginTop: 2,
                                                    marginLeft: 2,
                                                    marginRight: 8.5,
                                                    fontSize: "24px",
                                                }} noWrap>{page.name}</Typography>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>

                                </Grid>
                            </Grid>
                            <Divider variant="middle" sx={{
                                marginTop: 0.5,
                                marginBottom: 0.5,
                                height: "1px",
                                //width: "100%",
                                backgroundColor: 'text.main',
                            }} />
                            <CardContent sx={{
                                marginTop: 0,
                                width: "300px",
                                height: "196px",
                            }}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="flex-start"
                                >
                                    {knowledgeUI.contentTypeOnPage === "info" && <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Typography sx={{ fontWeight: "bold", }}> Тематика Страницы </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography> {page.theme} </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{
                                                marginTop: 1,
                                                fontWeight: "bold",
                                            }}> Тип Страницы </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography> {kindSelect(page.kind)}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{
                                                marginTop: 1,
                                                fontWeight: "bold",
                                            }}> Просмотры </Typography>
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                        >
                                            <Views views={page.views} />
                                        </Grid>
                                    </Grid>}
                                    {knowledgeUI.contentTypeOnPage === "description" && <Grid
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Typography sx={{ fontWeight: "bold", }}> Описание </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography> {page.description != null ? page.description : "Автор не оставил описание страницы"} </Typography>
                                        </Grid>
                                    </Grid>}
                                    {knowledgeUI.contentTypeOnPage === "author" && <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Avatar sx={{
                                                borderRadius: 2,
                                                fontSize: 6,
                                                width: 18,
                                                height: 18,
                                            }}> {page["author-name"][0].toUpperCase()} </Avatar>
                                            <Typography sx={{
                                                marginLeft: 1,
                                                fontWeight: "bold",
                                            }}> Автор </Typography>
                                            <Typography sx={{ marginLeft: 1, }}>{page["author-name"]}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography sx={{
                                                marginLeft: 1,
                                                fontWeight: "bold",
                                            }}>Об Авторе </Typography>
                                            <Typography sx={{ marginLeft: 1, }}>Информация об авторе</Typography>
                                        </Grid>
                                    </Grid>}
                                </Grid>
                            </CardContent>
                            <Divider variant="middle" sx={{
                                marginTop: 0.5,
                                marginBottom: 0.5,
                                height: "1px",
                                //width: "100%",
                                backgroundColor: 'text.main',
                            }} />
                            <CardActions sx={{
                                marginTop: "auto",
                                marginBottom: 0,
                            }}>
                                <Grid spacing={1} container justifyContent="center" >
                                    <Grid>
                                        <Link
                                            href={{
                                                pathname: '/knowledge/page/[id]',
                                                query: { id: page.id },
                                            }}
                                            passHref>
                                            <Button variant="contained" sx={{
                                                marginTop: "5px",
                                                height: "40px",
                                                marginBottom: "5px",
                                            }}>
                                                <Typography variant="subtitle1">{`Перейти к ${buttonLabelSelect(page.kind)}`}</Typography>
                                                {/* <Typography variant="subtitle1">Продолжить модуль</Typography>} */}
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))

            }
        </Grid>
    );
}));



export default PagesList;