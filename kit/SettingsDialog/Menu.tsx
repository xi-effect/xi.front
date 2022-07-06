// @ts-nocheck
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserAvatar from './MenuItems/UserAvatar';
import Interface from './MenuItems/Interface';
import Secure from './MenuItems/Secure';
import Invite from './MenuItems/Invite';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            sx={{
                width: 'calc(100% - 272px)'
            }}
        >
            {value === index && (
                <Box sx={{ p: 4 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Menu() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, p: 2, bgcolor: 'background.main', display: 'flex' }}
        >
            <Tabs
                textColor="inherit"
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                sx={{ borderRight: 2, borderColor: 'divider', pl: 2, width: 128 }}
            >
                <Tab label="Аккаунт" {...a11yProps(0)} />
                <Tab label="Аватар" {...a11yProps(1)} />
                <Tab label="Интерфейс" {...a11yProps(2)} />
                <Tab label="Безопасность" {...a11yProps(3)} />
                <Tab label="Приглашения" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                Аккаунт
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserAvatar />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Interface />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Secure />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Invite />
            </TabPanel>
        </Box>
    );
}