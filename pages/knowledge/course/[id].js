/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Grid, FormControlLabel, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles';

// import SearchIcon from '@mui/icons-material/Search';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
//import CoursesList from '../../../components/app/EducationPage/CoursesList';
// import Chipper from '../../../components/app/EducationPage/Chipper';

// import AddCourse from '../../../components/app/EducationPage/AddCourse';
//import Background from '../../../components/app/help/background/background';

import { inject, observer } from 'mobx-react'

import clsx from 'clsx';

//import Quiz from '../../../../components/app/CoursePage/Quiz';
//import CourseNavigation from '../../../../components/app/CoursePage/CourseNavigation';
import dynamic from 'next/dynamic';
//import PreviewLabel from '../../../../components/app/CoursePage/PreviewLabel';
//import CourseMap from '../../../../components/app/CoursePage/CourseMap';
//import CourseStat from '../../../../components/app/CoursePage/CourseStat';

//import ReactPage from '../../../../components/app/ContentEditor/ReactPage';
import NavigationAll from './../../../components/OtherComponents/Navigation/NavigationAll';

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // height: '100%',
        margin: 0,
        padding: 0,
        //backgroundColor: theme => theme.main.palette.main.background,
    },
    main: {
        //width: '100vw',
        //height: '100vh',
        margin: 0,
        padding: 0,
        //backgroundColor: theme => theme.main.palette.main.background,
        // zIndex: 999,
        //paddingBottom: "100px",
    },
    divReactPage: {
        paddingTop: '48px',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingBottom: '32px',
    },
    divReactPageClose: {
        width: '88vw',

    },
    divReactPageOpen: {
        width: '81vw',
    }


}));

const Course = inject('store')(observer(({ store }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const router = useRouter();
    const { id } = router.query;

    // const LoadingCourse = () => {
    //     const { id } = router.query;
    //     let idFor = id
    //     console.log("id1:", id)
    //     console.log("loc:", document.location.href)
    //     if (id == undefined) {
    //         let str = document.location.href.toString()
    //         idFor = str.slice(str.lastIndexOf("/") + 1)
    //         console.log("idFor", idFor)
    //     }
    //     store.getDataScr(`${store.url}/courses/${idFor}/map/`)
    //         .then((data) => {
    //             console.log("course:", data)
    //             store.setOpenCourse(data)
    //             store.setIsLoadingCourse(true)
    //         });
    // }

    // useEffect(() => {
    //     store.setIsLoadingCourse(false)
    //     LoadingCourse()
    // }, []);



    return (
        <>
            <Head>
                <title>Ξ Образование</title>
            </Head>
            <NavigationAll>
                <div className={classes.root}>
                    {id == 6 && <Grid container direction="column" className={classes.main}>
                        {id}
                        <div className={clsx(classes.divReactPage, {
                            [classes.divReactPageOpen]: store.openMenu,
                            [classes.divReactPageClose]: !store.openMenu,
                        })}>
                            {/* <ReactPage /> */}
                        </div>
                        {/* <Quiz /> */}
                        {/* <CourseNavigation /> */}
                    </Grid>}
                    {id != 6 && <Grid container direction="column">
                        {/* <PreviewLabel />
                        <CourseMap />
                        <CourseStat /> */}
                    </Grid>}
                </div >
            </NavigationAll>
        </>
    )
}))


export default Course