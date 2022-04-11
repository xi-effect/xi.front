/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Stack } from "@mui/material"
// import { useRouter } from "next/router"
import Header from "../components/PagesComponents/Landing/Header";

export default function ComponentDidCatch() {
    // const mobile = useMediaQuery(theme => theme.breakpoints.down("lg"));
    // const router = useRouter()

    return (
        <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
        >
            <Header />
        </Stack>
    );
}