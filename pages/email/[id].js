import * as React from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image';

import {Stack, Paper, Grid, Typography,  Box, Button, useMediaQuery } from '@mui/material';


import { inject, observer } from 'mobx-react'


const Email = inject('rootStore')(observer(({ rootStore }) => {
    

    const router = useRouter()
    const { id } = router.query
    const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    const [ok, setOk] = React.useState(false)

    const acceptButtonClicked = () => {
        rootStore.fetchData(`${rootStore.url}/email-confirm/`, "POST", { "code": id })
            .then((data) => {
                if (data.a) { //"Success"
                    setOk(true)
                }
            })
    }

    return (
        <>
            <Head>
                <title>Ξ Подтверждение почты</title>
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
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ height: mobile ? '100px' : "140px", p: mobile ? '20px' : '40px', width: '100%', }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="baseline"
                        spacing={0}
                        sx={{ width: "100%" }}
                    >
                        <Typography
                            component={"h1"}
                            onClick={() => {
                                router.push({
                                    pathname: '/',
                                })
                            }}

                            variant="Roboto500XiLabel"
                            sx={{
                                mt: '1px',
                                cursor: 'pointer',
                                color: 'secondary.main',
                                fontSize: {
                                    sm: '28px',
                                    md: '34px',
                                    lg: '40px',
                                },
                            }}
                        >
                            Ξ
                        </Typography>
                        <Typography
                            component={"h1"}
                            onClick={() => {
                                router.push({
                                    pathname: '/',
                                })
                            }}

                            variant="IBMPlexMono500XiLabelEnd"
                            sx={{
                                '&.MuiTypography-root': {
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                },
                                fontSize: {
                                    sm: '28px',
                                    md: '34px',
                                    lg: '40px',
                                },
                            }}
                        >
                            ffect
                        </Typography>
                    </Stack>
                </Stack>
                <Paper
                    elevation={24}
                    sx={{
                        zIndex: 10,
                        width: 'calc(100% - 32px)',
                        maxWidth: 512,
                        // mt: mobile ? "2px" : -32,
                        mt: 0,

                        bgcolor: "grey.800",
                        borderRadius: "20px",
                    }}
                >
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
                                    <Typography variant="h4" style={{ fontWeight: "normal" }}> Подтверждение почты </Typography>

                                </Grid>
                                {!ok ? <Image src={"https://cdn.icon-icons.com/icons2/402/PNG/512/email-info_40462.png"} width={200} height={200} layout='fixed' /> : <Image src={"https://cdn.icon-icons.com/icons2/402/PNG/512/email-validated_40467.png"} width={200} height={200} layout='fixed' />}
                                {!ok && <Button
                                    onClick={acceptButtonClicked}
                                    variant="outlined"
                                    size="large"
                                    type="submit"
                                    sx={{
                                        '&.MuiButton-root': {
                                            fontFamily: 'Open Sans, sans-serif',
                                            fontStyle: 'normal',
                                            fontWeight: 600,
                                            fontSize: '16px',
                                            lineHeight: '25px',
                                            width: '160px',
                                            height: '50px',
                                            color: 'text.primary',
                                            bgcolor: 'secondary.main',
                                            borderRadius: '88px',
                                            '&:hover': {
                                                bgcolor: 'secondary.main',
                                            },
                                            mt: 2,
                                            boxShadow: 12,
                                        }
                                    }}
                                >
                                    Подтвердить
                            </Button>}
                                {ok && <Grid container direction="row" justifyContent="center" alignItems="center" >
                                    <Typography style={{ textAlign: "center", fontSize: "20px" }} > Ваша почта успешно подтверждена. <br /> С этой страницы можно уходить.</Typography>
                                </Grid>}
                            </Grid>
                        </Stack>
                    </Box>
                </Paper>
                <div>
                </div>
            </Stack>
        </>
    );
}))

export default Email