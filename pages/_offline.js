/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Grid, Divider, useMediaQuery, Typography, Link } from "@mui/material"

import { useRouter } from "next/router"

// eslint-disable-next-line no-underscore-dangle
export default function () {
    const mobile = useMediaQuery(theme => theme.breakpoints.down("lg"));
    const router = useRouter()

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                margin: "0",
                padding: "0",
                backgroundImage: "url(https://cdna.artstation.com/p/assets/images/images/012/086/010/large/mikael-gustafsson-amongtrees-2-8.jpg?1532971442)",
                height: "100%",
                width: "100%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                backgroundColor: "#659DBD",
            }}
        >
            <Grid sx={{ margin: 2, }} />
            <Grid
                item
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Typography variant="h1" sx={{
                    margin: 2,
                    cursor: "default",
                    color: "text.primary",
                }}> 404 </Typography>
                <Divider sx={{
                    height: 3,
                    width: 100,
                    backgroundColor: "text.primary",
                }} />
                <Typography variant="h5" sx={{
                    margin: 2,
                    cursor: "default",
                    color: "text.primary",
                }}> Упс, вы заблудились... </Typography>
                <Link
                    sx={{
                        fontSize: mobile ? 34 : 28,
                        margin: 1,
                        cursor: "pointer",
                        color: "text.primary",
                    }}
                    onClick={() => {
                        router.push({
                            pathname: "/",
                        })
                    }}
                    underline="hover"
                >
                    Вернуться в Ξffect
                </Link>
            </Grid>
            <Grid item />
        </Grid>
    );
}