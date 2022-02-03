/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { inject, observer } from "mobx-react"

import { Typography, Tab, Tabs, Dialog, DialogContent, Stack, Box, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            // sx={{
            //     width: "100%",
            //     heght: "100%",
            // }}
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        p: 3,
                        width: "100%",
                        heght: "100%",
                        minWidth: 200,
                    }}
                >
                    {children}
                </Box>
            )}
        </Stack>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node.isRequired,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const DialogSettings = inject()(observer(({ openDialogSettings, setOpenDialogSettings }) => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            fullScreen
            open={openDialogSettings ?? false}
            onClose={() => setOpenDialogSettings(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                // height: "100%"
            }}
        >
            <DialogContent>
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        height: "calc(100vh - 64px)",
                        width: "100%",
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        sx={{
                            width: "100%",
                            maxWidth: 1200,
                            pl: 24,
                        }}
                    >
                        <Typography variant="h6">
                            Настройки сообщества
                        </Typography>
                        <IconButton
                            aria-label="закрыть"
                            sx={{
                                ml: "auto"
                            }}
                            onClick={() => setOpenDialogSettings(false)}
                        >
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        sx={{
                            height: "100%",
                            width: "100%",
                            maxWidth: 1200,
                        }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            textColor="inherit"
                            sx={{ borderRight: 2, height: "100%", borderColor: "divider" }}
                        >
                            <Tab label="Основные" {...a11yProps(0)} />
                            <Tab label="Приглашения" {...a11yProps(1)} />
                            <Tab label="Участники" {...a11yProps(2)} />
                            <Tab label="Роли" {...a11yProps(3)} />
                            <Tab label="Дополнительные" {...a11yProps(4)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            Основные
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Приглашения
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Участники
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Роли
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            Дополнительные
                        </TabPanel>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog >
    )
}));

export default DialogSettings;