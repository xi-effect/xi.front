import * as React from "react";
import Head from "next/head"
import { useRouter } from "next/router"
import Image from "next/image";

import { Stack, Paper, Typography, Button, useMediaQuery } from "@mui/material";
import { inject, observer } from "mobx-react"


const Email = inject("rootStore")(observer(({ rootStore }) => {
    const router = useRouter()
    const { id } = router.query
    const mobile = useMediaQuery(theme => theme.breakpoints.down("md"));

    const [ok, setOk] = React.useState(false)

    const acceptButtonClicked = () => {
        rootStore.fetchData(`${rootStore.url}/email-confirm/`, "POST", { "code": id })
            .then((data) => {
                if (data.a) { // "Success"
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
                    backgroundColor: "background.main", // Цвета есть в файле theme.js и в дефолтной теме в MUI
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ height: mobile ? "100px" : "140px", p: mobile ? "20px" : "40px", width: "100%", }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="baseline"
                        spacing={0}
                        sx={{ width: "100%" }}
                    >
                        <Typography
                            component="h1"
                            onClick={() => {
                                router.push({
                                    pathname: "/",
                                })
                            }}

                            variant="Roboto500XiLabel"
                            sx={{
                                mt: "1px",
                                cursor: "pointer",
                                color: "secondary.main",
                                fontSize: {
                                    sm: "28px",
                                    md: "34px",
                                    lg: "40px",
                                },
                            }}
                        >
                            Ξ
                        </Typography>
                        <Typography
                            component="h1"
                            onClick={() => {
                                router.push({
                                    pathname: "/",
                                })
                            }}

                            variant="IBMPlexMono500XiLabelEnd"
                            sx={{
                                "&.MuiTypography-root": {
                                    cursor: "pointer",
                                    color: "secondary.main",
                                },
                                fontSize: {
                                    sm: "28px",
                                    md: "34px",
                                    lg: "40px",
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
                        width: "calc(100% - 32px)",
                        maxWidth: 512,
                        // mt: mobile ? "2px" : -32,
                        mt: 0,
                        bgcolor: "grey.800",
                        borderRadius: "20px",
                    }}
                >
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                        sx={{ width: "100%", p: 2, }}
                    >
                        <Image
                            alt="alt"
                            src="/assets/app/ConfirmedEmail.svg"
                            quality={100}
                            width={456}
                            height={456}
                        />
                        <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                            Подтверждение почты
                        </Typography>
                        {!ok && <Button
                            onClick={acceptButtonClicked}
                            variant="outlined"
                            size="large"
                            type="submit"
                            sx={{
                                "&.MuiButton-root": {
                                    fontFamily: "Open Sans, sans-serif",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    lineHeight: "25px",
                                    width: "160px",
                                    height: "50px",
                                    color: "text.primary",
                                    bgcolor: "secondary.main",
                                    borderRadius: "88px",
                                    "&:hover": {
                                        bgcolor: "secondary.main",
                                    },
                                    mt: 2,
                                    boxShadow: 12,
                                }
                            }}
                        >
                            Подтвердить
                        </Button>}
                        {ok && <Typography sx={{ textAlign: "center", fontSize: "20px", mt: 2 }} >
                            Ваша почта успешно подтверждена. <br /> С этой страницы можно уходить.
                        </Typography>}
                    </Stack>
                </Paper>
                <div />
            </Stack>
        </>
    );
}))

export default Email