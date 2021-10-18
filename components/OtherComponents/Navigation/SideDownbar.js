import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'

import { Grid, Drawer, useTheme, List, Tooltip, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton, AppBar, Toolbar } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';

import { useSwipeable } from 'react-swipeable';

const PREFIX = 'SideDownbar';

const classes = {
    appBar: `${PREFIX}-appBar`,
    drawerPaper: `${PREFIX}-drawerPaper`,
    listItem: `${PREFIX}-listItem`,
    listItemActive: `${PREFIX}-listItemActive`,
    listItemIcon: `${PREFIX}-listItemIcon`,
    icon: `${PREFIX}-icon`,
    content: `${PREFIX}-content`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.appBar}`]: {
        top: 'auto',
        bottom: 0,
        zIndex: 1,
        height: 72,
        flexShrink: 0,
        backgroundColor: theme => theme.palette.blueGrey["0"],
    },

    [`& .${classes.drawerPaper}`]: {
        height: 72,
    },

    // necessary for content to be below app bar
    [`& .${classes.listItem}`]: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginLeft: 12,
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

    [`& .${classes.listItemActive}`]: {
        backgroundColor: theme => theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme => theme.palette.primary.main,
        },
        borderRadius: 8,
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

    [`& .${classes.content}`]: {
        flexGrow: 1,
        backgroundColor: theme => theme.palette.background.default,
        padding: theme => theme.spacing(3),
    }
}));

const SideDownbar = inject('store')(observer(({ store, openSideMenu, setOpenSideMenu }) => {
    const theme = useTheme();



    const router = useRouter()

    const [menuList, setMenuList] = React.useState([
        {
            id: 0,
            icon: <HomeIcon fontSize="large" className={classes.icon} />,
            label: "Главная",
            href: '/',
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

    const config = {
        delta: 8,
    }

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (router.pathname === "/") router.push("/knowledge")
            if (router.pathname === "/knowledge") router.push("/settings")
            // console.log("User Swiped!", eventData)
        },
        onSwipedRight: (eventData) => {
            if (router.pathname === "/knowledge") router.push("/")
            if (router.pathname === "/settings") router.push("/knowledge")
            // console.log("User Swiped!", eventData)
        },
        ...config,
    });


    return (
        (<Root>
            <AppBar
                {...handlers}
                position="fixed"
                // classes={{
                //     //paper: classes.drawerPaper,
                // }}
                className={classes.appBar}
            >
                <List>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid>
                            <Tooltip title="Главная" placement="top" arrow>
                                <ListItem onClick={() => router.push('/')} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/main' })}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <HomeIcon fontSize="large" className={classes.icon} />
                                    </ListItemIcon>
                                </ListItem>
                            </Tooltip>
                        </Grid>
                        <Grid>
                            <Tooltip title="Знания" placement="top" arrow>
                                <ListItem onClick={() => router.push('/knowledge')} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname.includes('/knowledge') })}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <MenuBookIcon fontSize="large" className={classes.icon} />
                                    </ListItemIcon>
                                </ListItem>
                            </Tooltip>
                        </Grid>
                        <Grid>
                            <Tooltip title="Настройки" placement="top" arrow>
                                <ListItem onClick={() => router.push('/settings')} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/settings' })}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <SettingsIcon fontSize="large" className={classes.icon} />
                                    </ListItemIcon>
                                </ListItem>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </List>

            </AppBar>
        </Root>)
    );
}));

export default SideDownbar