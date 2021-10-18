/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'

import { Grid, Drawer, Collapse, List, useTheme, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import SubjectIcon from '@mui/icons-material/Subject';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

const PREFIX = 'Sidebar';

const classes = {
    drawer: `${PREFIX}-drawer`,
    drawerGrid: `${PREFIX}-drawerGrid`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    listItem: `${PREFIX}-listItem`,
    listItemIcon: `${PREFIX}-listItemIcon`,
    icon: `${PREFIX}-icon`,
    smallIcon: `${PREFIX}-smallIcon`,
    content: `${PREFIX}-content`,
    divider: `${PREFIX}-divider`,
    dividerVert: `${PREFIX}-dividerVert`,
    dividerButton: `${PREFIX}-dividerButton`,
    smallListItem: `${PREFIX}-smallListItem`,
    listItemActive: `${PREFIX}-listItemActive`
};

const StyledDrawer = styled(Drawer)((
    {
        theme
    }
) => ({
    [`& .${classes.drawer}`]: {
        zIndex: 1,
        width: 72,
        flexShrink: 0,
    },

    [`& .${classes.drawerGrid}`]: {
        //width: 76,
    },

    [`& .${classes.drawerPaper}`]: {
        zIndex: 1,
        width: 72,
        backgroundColor: theme => theme.palette.blueGrey["0"]
    },

    // necessary for content to be below app bar
    [`& .${classes.listItem}`]: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 12,
        height: 56,
        width: 56,
        backgroundColor: theme => theme.palette.blueGrey["2"],
        cursor: "pointer",
        transition: '0.4s',
        borderRadius: 18,
        '&:hover': {
            borderRadius: 8,
        },
    },

    [`& .${classes.listItemIcon}`]: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.icon}`]: {
        fontSize: "38px !important",
        height: 38,
        width: 38,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.smallIcon}`]: {
        fontSize: "32px !important",
        height: 32,
        width: 32,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.content}`]: {
        flexGrow: 1,
        backgroundColor: theme => theme.palette.background.default,
        padding: theme => theme.spacing(3),
    },

    [`& .${classes.divider}`]: {
        marginTop: 12,
        backgroundColor: theme => theme.palette.background.default,
        width: 56,
    },

    [`& .${classes.dividerVert}`]: {
        marginTop: 0,
        backgroundColor: theme => theme.palette.background.default,
        height: 12,
        width: 4,
    },

    [`& .${classes.dividerButton}`]: {
        cursor: "pointer",
        height: 8,
        width: 38,
        borderRadius: 4,
        marginTop: 2,
        padding: 0,
        backgroundColor: theme => theme.palette.primary.dark,
        transition: '0.4s',
        '&:hover': {
            transition: '0.4s',
            backgroundColor: theme => theme.palette.primary.light,
        },
    },

    [`& .${classes.smallListItem}`]: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 0,
        height: 42,
        width: 42,
        backgroundColor: theme => theme.palette.blueGrey["2"],
        cursor: "pointer",
        transition: '0.4s',
        borderRadius: 18,
        '&:hover': {
            borderRadius: 8,
        },
    },

    [`& .${classes.listItemActive}`]: {
        backgroundColor: theme => theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme => theme.palette.primary.main,
        },
        borderRadius: 8,
    }
}));


const FadeMenuManagment = (props) => {
    const theme = useTheme();

    const router = useRouter()

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            {...props}>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Управление контентом" placement="right" arrow>
                <ListItem onClick={() => router.push('/managment/content')} className={clsx(classes.smallListItem, { [classes.listItemActive]: router.pathname === '/managment/content' })}>
                    <SubjectIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Модерация контента" placement="right" arrow>
                <ListItem onClick={() => router.push('/managment/moderation')} className={clsx(classes.smallListItem, { [classes.listItemActive]: router.pathname === '/managment/moderation' })}>
                    <SettingsEthernetIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Создать учебное заведение" placement="right" arrow>
                <ListItem className={classes.smallListItem} onClick={null}>
                    <AddBoxIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
        </Grid>
    );
}

const Sidebar = inject('store')(observer(({ store, openSideMenu, setOpenSideMenu }) => {
    const theme = useTheme();


    const router = useRouter()

    const [openManagment, setOpenManagment] = React.useState(false)

    // const handleChange = () => {
    //     if (router.pathname.includes('/managment/') && openManagment) router.push('/managment/')
    //     setOpenManagment((prev) => !prev);
    //     //console.log("openManagment", openManagment)
    // };

    // React.useEffect(() => {
    // })

    const HomeIconClicked = () => {
        router.push('/main')
        setOpenManagment(false)
    }

    const MenuBookIconClicked = () => {
        router.push('/knowledge')
        setOpenManagment(false)
    }

    const AddToQueueIconClicked = () => {
        router.push('/managment')
        setOpenManagment(true)
    }

    const SettingsIconClicked = () => {
        router.push('/settings')
        setOpenManagment(false)
    }

    React.useEffect(() => {
        if (router.pathname.includes('/managment')) setOpenManagment(true)
    })

    const [menuList, setMenuList] = React.useState([
        {
            id: 0,
            icon: <HomeIcon fontSize="large" className={classes.icon} />,
            label: "Главная",
            href: '/main',
        },
        {
            id: 1,
            icon: <MenuBookIcon fontSize="large" className={classes.icon} />,
            label: "Знания",
            href: '/knowledge',
        },
        {
            id: 2,
            icon: <SettingsIcon fontSize="large" className={classes.icon} />,
            label: "Настройки",
            href: '/settings',
        }
    ])

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <Grid
                className={classes.drawerGrid}
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
            >
                {/* <List>
                    {menuList.map((item, index) =>
                        <Grid key={item.id}>
                            <Tooltip title={item.label} placement="right" arrow>
                                <ListItem onClick={() => router.push(item.href)} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === item.href })}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        {item.icon}
                                    </ListItemIcon>
                                </ListItem>
                            </Tooltip>
                        </Grid>
                    )}
                </List> */}
                <List>
                    <Grid
                        className={classes.drawerGrid}
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                    >
                        <Tooltip title="Главная" placement="right" arrow>
                            <ListItem onClick={HomeIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/main' })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <HomeIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        <Tooltip title="Знания" placement="right" arrow>
                            <ListItem onClick={MenuBookIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname.includes('/knowledge') })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <MenuBookIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        <Tooltip title="Управление" placement="right" arrow>
                            <ListItem onClick={AddToQueueIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/managment' })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <AddToQueueIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        {openManagment && <Collapse in={openManagment}>
                            <FadeMenuManagment />
                        </Collapse>}
                        {/* <Divider orientation="vertical" className={classes.dividerVert}/> */}
                        <Divider className={classes.divider} />
                        <Tooltip title="Настройки" placement="right" arrow>
                            <ListItem onClick={SettingsIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/settings' })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <SettingsIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                    </Grid>
                </List>
            </Grid>

        </Drawer >
    );
}));

export default Sidebar