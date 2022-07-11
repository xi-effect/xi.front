import React from "react";
import { useRouter } from "next/router";
import { Stack, useMediaQuery, Button } from "@mui/material";
import XiLogo from "kit/XiLogo";

function Header() {
    const router = useRouter();
    const mobile = useMediaQuery(theme => theme.breakpoints.down("md"));

    return (
        <Stack
            component="header"
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
                <XiLogo />
            </Stack>
            <Button
                aria-label="signin"
                onClick={() => {
                    router.push({
                        pathname: "/signin",
                    });
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

export default Header;