import React from "react";
import { useRouter } from "next/router"
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stack, useMediaQuery, Button, Grid, Box, Paper, Typography } from "@mui/material";

import { labels } from "../../../texts/landing/MainLabel";

function MainLabel() {
    const router = useRouter()
    const mobile = useMediaQuery(theme => theme.breakpoints.down("dl"));


    return (
        <Box
            sx={{
                position: "relative",
                width: "calc(100% - 64px)",
            }}
        >
            <Paper
                elevation={24}
                sx={{
                    zIndex: 10,
                    mt: "20px",
                    width: mobile ? "calc(100% - 0px)" : "calc(100% - 200px)",
                    ml: mobile ? "0px" : "100px",
                    mr: mobile ? "0px" : "100px",
                    bgcolor: "grey.400",
                    borderRadius: "20px",
                    // minHeight: "500px",
                    position: "relative",
                }}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{

                    }}
                >
                    <Typography
                        // component={"h1"}
                        variant="OpenSans700MainLabel"
                        sx={{
                            "&.MuiTypography-root": {
                                cursor: "default",
                                color: "#272731",
                                textAlign: "center",
                                p: 2,

                            },
                            fontSize: {
                                xs: "28px",
                                sm: "36px",
                                md: "44px",
                                lg: "60px",
                            },
                            lineHeight: {
                                xs: "44px",
                                sm: "44px",
                                md: "71px",
                                lg: "71px",
                            },
                            mt: "20px",
                        }}
                    >
                        {labels.title}
                    </Typography>
                    <Typography
                        // component={"h2"}
                        variant="OpenSans500MainLabel"
                        sx={{
                            cursor: "default",
                            color: "#555569",
                            textAlign: "center",
                            p: 2,
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                                md: "20px",
                                lg: "22px",
                            },
                        }}
                    >
                        {labels.subtitle}
                    </Typography>
                    <Grid
                        container
                        direction={mobile ? "column" : "row"}
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Grid
                            item
                            md={12}
                            dl={4}
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                        >
                            <Image
                                alt="alt"
                                src="/landing/Knowledge.svg"
                                quality={100}
                                width={256}
                                height={256}
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            dl={4}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                onClick={() => {
                                    router.push({
                                        pathname: "/registration",
                                    })
                                }}
                                sx={{
                                    "&.MuiButton-root": {
                                        width: "272px",
                                        height: "60px",
                                        color: "text.main",
                                        bgcolor: "primary.main",
                                        borderRadius: "88px",
                                        boxShadow: 24,
                                        "&:hover": {
                                            bgcolor: "primary.main",
                                        },
                                    },
                                    mt: "20px",
                                    mb: "20px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        "&.MuiTypography-root": {
                                            fontFamily: "Open Sans, sans-serif",
                                            fontStyle: "normal",
                                            fontWeight: 600,
                                            fontSize: "18px",
                                            lineHeight: "25px",
                                        },
                                        ml: "32px",
                                        color: "text.primary",
                                    }}
                                >
                                    {labels.enterButton}
                                </Typography>
                                <Stack
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{
                                        color: "text.primary",
                                        bgcolor: "secondary.main",
                                        height: "46px",
                                        width: "46px",
                                        borderRadius: "50%",
                                        ml: "auto",
                                        mr: "0px",
                                    }}
                                >
                                    <ArrowForwardIcon />
                                </Stack>
                            </Button>
                        </Grid>
                        <Grid
                            item
                            md={12}
                            dl={4}
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            <Image
                                alt="alt"
                                src="/landing/OnlineLearning.svg"
                                quality={100}
                                width={256}
                                height={256}
                            />
                        </Grid>
                    </Grid>
                    {/* {mobile && <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        sx={{
                            width: "100%"
                        }}
                    >
                        <Image
                            alt="alt"
                            src={"/landing/Knowledge.svg"}
                            quality={100}
                            width={256}
                            height={256}
                        />
                    </Stack >} */}
                    {/* {<Button
                        onClick={() => {
                            router.push({
                                pathname: "/registration",
                            })
                        }}
                        sx={{
                            "&.MuiButton-root": {
                                width: "272px",
                                height: "60px",
                                color: "text.main",
                                bgcolor: "primary.main",
                                borderRadius: "88px",
                                boxShadow: 24,
                                "&:hover": {
                                    bgcolor: "primary.main",
                                },
                            },
                            mt: mobile ? "20px" : "90px",
                            mb: "20px",
                        }}
                    >
                        <Typography
                            sx={{
                                "&.MuiTypography-root": {
                                    fontFamily: "Open Sans, sans-serif",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "25px",
                                },
                                ml: "32px",
                                color: "text.primary",
                            }}
                        >
                            {labels.enterButton}
                        </Typography>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                color: "text.primary",
                                bgcolor: "secondary.main",
                                height: "46px",
                                width: "46px",
                                borderRadius: "50%",
                                ml: "auto",
                                mr: "0px",
                            }}
                        >
                            <ArrowForwardIcon />
                        </Stack>
                    </Button>}
                    {mobile && <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            width: "100%"
                        }}
                    >
                        <Image
                            alt="alt"
                            src={"/landing/OnlineLearning.svg"}
                            quality={100}
                            width={256}
                            height={256}
                        />
                    </Stack >} */}
                </Stack >
            </Paper>

        </Box>

    );
}

export default MainLabel