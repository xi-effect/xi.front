import React from "react";
import { useRouter } from "next/router"
import { Stack, useMediaQuery, Button, Typography } from "@mui/material";


function Header() {
    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down("md"));

    return (
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
            <Button
                onClick={() => {
                    router.push({
                        pathname: "/home",
                    })
                }}
                sx={{
                    "&.MuiButton-root": {
                        fontFamily: "Open Sans, sans-serif",
                        fontStyle: "normal",
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: "25px",
                        width: mobile ? "120px" : "180px",
                        height: mobile ? "40px" : "60px",
                        color: "text.primary",
                        bgcolor: "secondary.main",
                        borderRadius: mobile ? "62px" : "88px",
                        "&:hover": {
                            bgcolor: "secondary.main",
                        },
                    }
                }}
            >
                Войти
            </Button>
        </Stack>
    );
}

export default Header