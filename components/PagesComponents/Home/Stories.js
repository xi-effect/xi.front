/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Button, Paper, Stack, Box, Typography, IconButton } from "@mui/material";

import { inject, observer } from "mobx-react";

import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

const stories = [
    {
        label: "Текст заголовка, название штуки, я не смог в название",
        image: "/assets/app/OrganizingProjects.svg",
    },
    {
        label: "Текст заголовка, название штуки, я не смог в название",
        image: "/assets/app/Notebook.svg",
    },
    {
        label: "Текст заголовка, название штуки, я не смог в название",
        image: "/assets/app/Schedule.svg",
    },
    {
        label: "Текст заголовка, название штуки, я не смог в название",
        image: "/assets/app/StaticWebsite.svg",
    },
    {
        label: "Текст заголовка, название штуки, я не смог в название",
        image: "/assets/app/JavaScriptFrameworks.svg",
    },
    {
        label: "Текст заголовка, название штуки, я не смог в название",
        image: "/assets/app/Content.svg",
    },
    {
        label: "Текст заголовка, название штуки, я не смог в название",
        image: "/assets/app/AdvancedCustomization.svg",
    },
];

const Story = inject()(observer(({ item }) => (
    <Paper
        elevation={24}
        sx={{
            height: 300,
            minWidth: 300,
            borderRadius: 2,
        }}
    >
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
                mt: -2,
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    width: 216,
                    height: 216,
                }}
            >
                <Image
                    alt="alt"
                    src={item.image}
                    quality={100}
                    width={216}
                    height={216}
                />
            </Box>
            <Typography
                sx={{
                    pl: 1,
                    pr: 1,
                }}
            >
                {item.label}
            </Typography>
            <IconButton
                sx={{
                    position: "absolute",
                    bottom: -8,
                    right: 8,
                    boxShadow: 4,
                    bgcolor: "secondary.main",
                    "&:hover": {
                        bgcolor: "secondary.main",
                    }
                }}
            >
                <ArrowForwardIcon />
            </IconButton>
        </Stack>
    </Paper>
)));


const Stories = inject()(observer(() => {
    const [cardIndex, setCardIndex] = React.useState(0);

    return (
        <>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                sx={{
                    width: "100%",
                    p: 1,
                }}
            >
                <Typography
                    variant="OpenSans600WhyLabel"
                    sx={{
                        fontSize: 22,
                        ml: 2,
                    }}
                >
                    Гид по платформе:
                </Typography>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        pr: 2
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            "&.MuiButtonBase-root": {
                                height: 36,
                                width: 36,
                                minWidth: 36,
                                bgcolor: "secondary.dark",
                            }
                        }}
                        disabled={cardIndex === 0}
                        onClick={() => setCardIndex(cardIndex - 1)}
                    >
                        <ArrowBackIosNewIcon />
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            "&.MuiButtonBase-root": {
                                height: 36,
                                width: 36,
                                minWidth: 36,
                                bgcolor: "secondary.dark",
                            }
                        }}
                        disabled={cardIndex === stories.length - 1}
                        onClick={() => setCardIndex(cardIndex + 1)}
                    >
                        <ArrowForwardIosIcon />
                    </Button>
                </Stack>

            </Stack>
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: cardIndex * -316 }}
                transition={{ duration: 0.6 }}
                sx={{
                    width: "100%",
                    mt: 1,
                    ml: 3,
                    position: "relative",
                }}
            >
                {stories.map((item, index) => (
                    <Story item={item} key={index.toString()} />
                ))}
            </Stack>
        </>
    );
}));


export default Stories;