/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Stack, useMediaQuery, Grid, Box, Paper, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSwipeable } from "react-swipeable";
import { features } from "../../../texts/landing/EffectFor";

const menu = [
    "Ученикам",
    "Учителям",
    "Родителям",
    "Авторам",
    "Организациям"
]

const cardsList = [
    "firstCard",
    "secondCard",
    "thirdCard",
    "fourthCard",
    "fifthCard",
]

function EffectFor() {

    const mobile = useMediaQuery(theme => theme.breakpoints.down("gx"));

    const [tab, setTab] = React.useState(0)

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            setTab(prev => prev === features.content.length - 1 ? prev = 0 : prev + 1)
        },
        onSwipedRight: () => {
            setTab(prev => prev === 0 ? prev = features.content.length - 1 : prev - 1)
        },
    });

    return (
        <Stack
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{ zIndex: 1, p: 2, mt: "330px", width: "100%", }}
        >
            <Box
                sx={{

                }}
            >
                <Typography
                    component="h3"
                    variant="IBMPlexSans700WhyLabel"
                    sx={{
                        cursor: "default",
                        textAlign: "center",
                        maxWidth: "1250px",
                        fontSize: {
                            xs: "28px",
                            sm: "30px",
                            md: "36px",
                            lg: "40px",
                        },
                    }}
                >
                    {features.label}
                </Typography>
            </Box>
            {!mobile && <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    maxWidth: "1250px",
                    minHeight: "80px",
                    mt: "80px",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 100%)",
                    boxShadow: "0px 24px 65px rgba(29, 99, 255, 0.05)",
                    borderRadius: "63px",
                }}
            >
                {menu.map((item, index) => (
                    <Grid
                        item
                        container
                        key={index.toString()}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        onClick={() => setTab(index)}
                        sx={{
                            color: tab === index ? "#FFFFFF" : "#555569",
                            bgcolor: tab === index ? "primary.main" : "transparent",
                            boxShadow: tab === index ? 12 : "none",
                            width: "232px",
                            height: "64px",
                            borderRadius: "88px",
                            fontFamily: "Open Sans",
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "27px",
                            mr: "3px",
                            cursor: "pointer",
                        }}
                    >
                        {item}
                    </Grid>
                ))}
            </Grid>}
            {mobile && <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    maxWidth: "400px",
                    minHeight: "80px",
                    mt: "80px",
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 100%)",
                    boxShadow: "0px 24px 65px rgba(29, 99, 255, 0.05)",
                    borderRadius: "63px",
                }}
            >
                <Grid item>
                    <IconButton
                        sx={{
                            color: "secondary.light",
                            mr: 2,
                        }}
                        onClick={() => {
                            if (tab === 0) setTab(4)
                            if (tab !== 0) setTab(tab - 1)
                        }}>
                        <ArrowBackIosNewIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        color: "#FFFFFF",
                        bgcolor: "primary.main",
                        boxShadow: 12,
                        width: "200px",
                        height: "64px",
                        borderRadius: "88px",
                        fontFamily: "Open Sans",
                        fontWeight: 600,
                        fontSize: "20px",
                        lineHeight: "27px",
                        mr: "3px",
                        cursor: "pointer",
                    }}
                >
                    {(tab === 0) && "Ученикам"}
                    {(tab === 1) && "Учителям"}
                    {(tab === 2) && "Родителям"}
                    {(tab === 3) && "Авторам"}
                    {(tab === 4) && "Организациям"}
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{
                            color: "secondary.light",
                            ml: 2,
                        }}
                        onClick={() => {
                            if (tab === 4) setTab(0)
                            if (tab !== 4) setTab(tab + 1)
                        }}>
                        <ArrowForwardIosIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>}
            <Paper
                {...handlers}
                elevation={24}
                sx={{
                    zIndex: 10,
                    mt: mobile ? "40px" : "80px",
                    width: mobile ? "calc(100% - 16px)" : "calc(100% - 200px)",
                    ml: mobile ? "8px" : "100px",
                    mr: mobile ? "8px" : "100px",
                    bgcolor: "grey.400",
                    borderRadius: "20px",
                    minHeight: mobile ? "1350px" : "900px",
                    position: "relative",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        bottom: "-20px",
                        left: 0,
                    }}
                >
                    <Image
                        alt="alt"
                        src="/assets/landing/Learning.svg"
                        quality={100}
                        width={256}
                        height={256}
                    />
                </Box>
                {!mobile && <Box
                    sx={{
                        position: "absolute",
                        bottom: mobile ? "330px" : "-20px",
                        right: 0,
                    }}
                >
                    <Image
                        alt="alt"
                        src="/assets/landing/BookLover.svg"
                        quality={100}
                        width={256}
                        height={256}
                    />
                </Box>}
                <AnimatePresence initial={false} exitBeforeEnter>
                    {cardsList.map((card, index) =>
                        tab === index && <Grid
                            key={card}
                            component={motion.div}
                            initial={{ opacity: 0, x: mobile ? 10 : 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: mobile ? -10 : -100 }}
                            transition={{ duration: 0.5, }}
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            sx={{
                                width: "100%",
                                zIndex: 10,
                            }}
                        >
                            {features.content[index].map((itemCard, indexCard) => (
                                <Paper
                                    key={indexCard.toString()}
                                    elevation={6}
                                    sx={{
                                        zIndex: 10,
                                        ml: 2,
                                        mr: 2,
                                        mt: 2,
                                        mb: 2,
                                        width: "100%",
                                        maxWidth: "680px",
                                        height: "340px",
                                        bgcolor: "primary.main",
                                        borderRadius: "20px",
                                    }}
                                >
                                    <Grid
                                        item
                                        container
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                    >
                                        <Grid item>
                                            <Typography
                                                component="h4"
                                                variant="IBMPlexSans700WhyLabel"
                                                sx={{
                                                    cursor: "default",
                                                    pt: mobile ? "20px" : "40px",
                                                    pl: mobile ? "16px" : "32px",
                                                    pr: mobile ? "16px" : "32px",
                                                    textAlign: "center",
                                                    fontSize: {
                                                        xs: "28px",
                                                        sm: "30px",
                                                        md: "36px",
                                                        lg: "40px",
                                                    },
                                                }}
                                            >
                                                {itemCard.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                component="p"
                                                variant="OpenSans400WhyLabel"
                                                sx={{
                                                    cursor: "default",
                                                    color: "text.secondary",
                                                    pt: mobile ? "10px" : "20px",
                                                    pl: mobile ? "16px" : "32px",
                                                    pr: mobile ? "16px" : "32px",
                                                    fontSize: {
                                                        xs: "16px",
                                                        sm: "16px",
                                                        md: "22px",
                                                        lg: "22px",
                                                    },
                                                }}
                                            >
                                                {itemCard.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            ))}
                        </Grid >
                    )}


                </AnimatePresence>
            </Paper>
        </Stack >
    );
}

export default EffectFor;