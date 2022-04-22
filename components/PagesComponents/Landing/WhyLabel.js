import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Stack, useMediaQuery, Grid, Box, Paper, Typography } from "@mui/material";

import { whys } from "../../../texts/landing/WhyLabel";

function WhyLabel() {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("md"));

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            sx={{
                mt: mobile ? "90px" : "180px",
                width: "100%",
                position: "relative",
            }}
        >
            <Typography
                component="h3"
                textAlign="center"
                variant="IBMPlexSans700WhyLabel"
                sx={{
                    cursor: "default",
                    fontSize: {
                        xs: "28px",
                        sm: "30px",
                        md: "36px",
                        lg: "40px",
                    },
                }}
            >
                {whys.main}
            </Typography>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    mt: mobile ? "30px" : "80px",
                    width: "100%",
                    zIndex: 10,
                }}
            >
                {whys.cards.map((item, index) => (
                    <Paper
                        key={index.toString()}
                        component={motion.div}
                        whileHover={{ y: -20 }}
                        elevation={24}
                        sx={{
                            zIndex: 10,
                            ml: 2,
                            mr: 2,
                            mt: 2,
                            mb: 2,
                            maxWidth: "400px",
                            width: "100",
                            height: "500px",
                            bgcolor: "grey.400",
                            borderRadius: "20px",
                        }}
                    >
                        <Grid
                            item
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{
                            }}
                        >
                            <Grid item>
                                <Typography
                                    component="h4"
                                    variant="OpenSans600WhyLabel"
                                    sx={{
                                        cursor: "default",
                                        color: "#272731",
                                        pt: "40px",
                                        pl: "32px",
                                        pr: "32px",
                                        textAlign: "center",
                                        fontSize: {
                                            xs: "20px",
                                            sm: "20px",
                                            md: "20px",
                                            lg: "20px",
                                        },
                                    }}
                                >
                                    {item.title}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    component="p"
                                    variant="OpenSans400WhyLabel"
                                    sx={{
                                        cursor: "default",
                                        color: "#555569",
                                        pt: "20px",
                                        pl: "32px",
                                        pr: "32px",
                                        fontSize: {
                                            xs: "18px",
                                            sm: "18px",
                                            md: "18px",
                                            lg: "18px",
                                        },
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Grid>
                            <Grid item
                                sx={{
                                    width: "312px",
                                    height: "312px",
                                    mt: "auto",
                                    mb: "60px",
                                }}
                            >
                                <Image
                                    alt="alt"
                                    src={item.image}
                                    quality={100}
                                    width={312}
                                    height={312}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Grid >
            <Box
                sx={{
                    width: "calc(100vw - 8px)",
                    height: "333px",
                    bgcolor: "primary.main",
                    position: "absolute",
                    bottom: "-210px",
                    zIndex: 0,
                }}
            />
        </Stack >
    );
}

export default WhyLabel;