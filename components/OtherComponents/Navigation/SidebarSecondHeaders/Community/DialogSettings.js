/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import { Typography, MenuItem, useTheme, Tab, Tabs, Radio, Switch, Button, Chip, FormControl, InputLabel, Input, Dialog, DialogContent, Stack, Tooltip, Box, IconButton, Popper, Grow, MenuList, Paper, ClickAwayListener, Divider, ListItemIcon, ListItemText, useMediaQuery, Container, DialogActions } from '@mui/material';
import Image from "next/image";
import PropTypes from 'prop-types';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            // sx={{
            //     width: '100%',
            //     heght: '100%',
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
                        width: '100%',
                        heght: '100%',
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
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const DialogSettings = inject('rootStore')(observer(({ rootStore, openDialogSettings, setOpenDialogSettings }) => {

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
            fullWidth
            maxWidth="md"
            sx={{
                // height: '100%'
            }}
        >
            <DialogContent>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{
                        height: 'calc(100vh - 64px)',
                        width: '100%',
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
                        sx={{ borderRight: 2, height: '100%', borderColor: 'divider' }}
                    >
                        <Tab label="Основные" {...a11yProps(0)} />
                        <Tab label="Роли" {...a11yProps(1)} />
                        <Tab label="Участники" {...a11yProps(2)} />
                        <Tab label="Приглашения" {...a11yProps(3)} />
                        <Tab label="Item Five" {...a11yProps(4)} />
                        <Tab label="Item Six" {...a11yProps(5)} />
                        <Tab label="Item Seven" {...a11yProps(6)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        Item One
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Four
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Item Five
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Item Six
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        Item Seven
                    </TabPanel>
                </Stack>
            </DialogContent>
        </Dialog >
    )
}));

export default DialogSettings;