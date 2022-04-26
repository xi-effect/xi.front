import { Tab, Tabs, Typography, Stack, Box } from "@mui/material";

import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import Image from "next/image";
import Head from "next/head";
import React from "react";
// import { useRouter } from "next/router"

// import CustomAvatar from "components/OtherComponents/Avatar/CustomAvatar";
import Navigation from "components/OtherComponents/Navigation/Navigation";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{
                width: "100%"
            }}
            {...other}
        >
            {value === index && children}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}


const Profile = inject("userSt")(observer(({ userSt }) => {
    // const router = useRouter()
    console.log(userSt);
    // React.useEffect(() => {
    //     if (router.query.id !== undefined) {
    //         userSt.loadUserInfo(router.query.id)
    //     }
    // }, [userSt, router.query.id]);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Head>
                <title>
                    Ξffect | Профиль
                </title>
                <meta name="robots" content="noindex" />
            </Head>
            <Navigation>
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    sx={{
                        p: 2,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                        sx={{
                            height: "300px",
                            width: "100%",
                        }}
                    >
                        {/* <Box sx={{ height: 290, width: 290, }}>
                            <CustomAvatar avatar={{ ...userSt.settings.avatar, bgcolor: null }} viewBox={{ x: "-175", y: "-100", width: "1256", height: "1256" }} />
                        </Box> */}
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                            sx={{ pt: 4 }}
                        >
                            {/* {userSt?.user?.name && <Typography sx={{ cursor: "default" }} variant="h5">
                                {userSt.user.name}
                            </Typography>}
                            {userSt?.user?.surname && <Typography sx={{ cursor: "default" }} variant="h5">
                                {userSt.user.surname}
                            </Typography>}
                            {userSt?.user?.username && <Typography sx={{ cursor: "default" }} variant="h5">
                                {userSt.user.username}
                            </Typography>} */}
                        </Stack>
                    </Stack>
                    <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                        sx={{
                            width: "100%",
                        }}
                    >
                        <Box sx={{ borderBottom: 1, width: "100%", borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Профиль" {...a11yProps(0)} />
                                <Tab label="Сообщества" {...a11yProps(1)} />
                                <Tab label="Контент" {...a11yProps(2)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{ width: "100%", minHeight: 300 }}
                            >
                                <Image
                                    alt="alt"
                                    src="/assets/app/NoData.svg"
                                    quality={100}
                                    width={256}
                                    height={232}
                                />
                                <Typography sx={{ cursor: "default" }} variant="h6">
                                    Профиль пользователя пуст
                                </Typography>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{ width: "100%", minHeight: 300 }}
                            >
                                <Image
                                    alt="alt"
                                    src="/assets/app/NoData.svg"
                                    quality={100}
                                    width={256}
                                    height={232}
                                />
                                <Typography sx={{ cursor: "default" }} variant="h6">
                                    Пользователь не вступил ещё ни в одно сообщество
                                </Typography>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                sx={{ width: "100%", minHeight: 300 }}
                            >
                                <Image
                                    alt="alt"
                                    src="/assets/app/NoData.svg"
                                    quality={100}
                                    width={256}
                                    height={232}
                                />
                                <Typography sx={{ cursor: "default" }} variant="h6">
                                    Контент пользователя пуст
                                </Typography>
                            </Stack>
                        </TabPanel>
                    </Stack>
                </Stack>
            </Navigation>
        </>
    );
}));

export default Profile;
