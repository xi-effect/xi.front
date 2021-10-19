import * as React from 'react';
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { CircularProgress, useTheme, Divider, Stack, Paper, Grid, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Box, Container, Fab, Zoom, Button } from '@mui/material';



import { inject, observer } from 'mobx-react'
import BackgroundImg from '../../components/OtherComponents/Background/BackgroundImg'
import Loading from './../../components/OtherComponents/Loading/Loading';

const Email = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();

    const router = useRouter()
    const { id } = router.query

    const [ok, setOk] = React.useState(false)

    const acceptButtonClicked = () => {
        rootStore.fetchData(`${rootStore.url}/email-confirm/`, "POST", { "code": id },)
            .then((data) => {
                if (data.a) { //"Success"
                    setOk(true)
                }
            })
    }

    return (
        <>
            <Head>
                <title>Ξ Регистрация</title>
            </Head>
            <Stack
                direction="column"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: 'background.1',
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={0}
                    sx={{ width: "100%" }}
                >
                    <Typography

                        onClick={() => router.push('/')}
                        variant="h3"
                        sx={{ color: 'text.main', m: 2, }}
                    >
                        Ξffect
                    </Typography>
                </Stack>
                <Box sx={{ width: "100%", }} >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{ width: "100%", p: 2, }}
                    >
                        <Grid container direction="column" justifyContent="flex-start" alignItems="center">
                            <Grid container direction="row" justifyContent="center" alignItems="center" >
                                <Typography variant="h4"> Подтверждение почты </Typography>
                            </Grid>
                            {!ok && <Button sx={{ color: 'text.main', m: 2, }} onClick={acceptButtonClicked} >
                                Подтвердить
                            </Button>}
                            {ok && <Grid container direction="row" justifyContent="center" alignItems="center" >
                                <Typography > Ваша почта успешно подтверждена. С этой страницы можно уходить.</Typography>
                            </Grid>}
                        </Grid>
                    </Stack>
                </Box>
                <div>

                </div>

            </Stack>
        </>
    );
}))

export default Email