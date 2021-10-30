import { styled } from '@mui/material/styles';
import Router from 'next/router'
import Image from 'next/image'
import React from 'react';
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { Divider, AppBar, Toolbar, Tabs, Tab, Input, Stack, Tooltip, InputAdornment, FormControl, useMediaQuery, Link, Button, IconButton, Grid, Box, Paper, useTheme, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const schema = yup.object({
    message: yup.string().max(100).required(),
}).required();

import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? "#455a64"
            : "#90a4ae",
    // flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        // marginLeft: theme.spacing(1),
        // marginBottom: 1,
        // padding: 0,
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ChatBar = inject('rootStore', 'uiStore')(observer(({ rootStore, uiStore }) => {
    const theme = useTheme();
    const router = useRouter()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [expanded, setExpanded] = React.useState(false);

    const onSubmit = data => authorizationStore.clickEnterButton(data);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            position: 'fixed',
            top: 'auto',
            bottom: 0,
            left: 0,
            right: 0,
        }}>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        // marginLeft: 'calc(50% - 400px)',
                        ml: 37,
                        maxWidth: 1200,
                        minHeight: 64,
                        width: '100%',
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        backgroundColor: 'background.2',
                        zIndex: 10000,
                        // top: 'auto',
                        // bottom: 0,
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Box component="form" sx={{ width: "100%", pt: 2, pl: 2, pr: 2 }} onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <FormControl error={errors?.message?.type === "required"} fullWidth variant="outlined">
                                    <Input
                                        sx={{ backgroundColor: 'background.2', width: "100%", }}
                                        label="Адрес почты"
                                        type='text'
                                        multiline
                                        maxRows={5}
                                        placeholder="Отправить сообщение"
                                        {...field}
                                    />
                                </FormControl>}
                            />
                        </Box>
                    </Stack>
                    <Accordion sx={{ width: '100%', mt: 1, mb: 1 }} expanded={expanded}>
                        <AccordionSummary expandIcon={null} aria-controls="panel1d-content" id="panel1d-header">
                            <IconButton onClick={() => setExpanded(!expanded)} size="large">
                                <ExpandMoreIcon
                                    sx={{
                                        transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                                        transition: "0.2s",
                                    }}
                                />
                            </IconButton>
                            <IconButton size="large">
                                <Tooltip title="Добавить пользователя" arrow>
                                    <PersonAddIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton sx={{ ml: 'auto', mr: 0.2 }} edge="end" size="large">
                                <Tooltip title="Отправить" arrow>
                                    <SendIcon sx={{ color: 'text.main' }} />
                                </Tooltip>
                            </IconButton>
                        </AccordionSummary>
                        <AccordionDetails sx={{ bgcolor: 'background.2' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                aria-label="full width tabs example"
                                //variant="fullWidth"
                                // centered
                            >
                                <Tab label={<GroupIcon sx={{color: 'text.main'}}/>} {...a11yProps(0)} />
                                <Tab label={<DescriptionIcon sx={{color: 'text.main'}}/>} {...a11yProps(1)} />
                                <Tab label={<AttachFileIcon sx={{color: 'text.main'}}/>} {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                1
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                2
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                3
                            </TabPanel>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </Stack>
        </Box>
    );
}))

export default ChatBar