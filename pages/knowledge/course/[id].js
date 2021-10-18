/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Grid, FormControlLabel, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@mui/material'


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

const PREFIX = 'Course';

const classes = {
    root: `${PREFIX}-root`,
    main: `${PREFIX}-main`,
    divReactPage: `${PREFIX}-divReactPage`,
    divReactPageClose: `${PREFIX}-divReactPageClose`,
    divReactPageOpen: `${PREFIX}-divReactPageOpen`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        // width: '100%',
        // height: '100%',
        margin: 0,
        padding: 0,
        //backgroundColor: theme => theme.main.palette.main.background,
    },

    [`& .${classes.main}`]: {
        //width: '100vw',
        //height: '100vh',
        margin: 0,
        padding: 0,
        //backgroundColor: theme => theme.main.palette.main.background,
        // zIndex: 999,
        //paddingBottom: "100px",
    },

    [`& .${classes.divReactPage}`]: {
        paddingTop: '48px',
        paddingLeft: '32px',
        paddingRight: '32px',
        paddingBottom: '32px',
    },

    [`& .${classes.divReactPageClose}`]: {
        width: '88vw',

    },

    [`& .${classes.divReactPageOpen}`]: {
        width: '81vw',
    }
}));

const Course = inject('store')(observer(({ store }) => {
    const theme = useTheme();


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
        (<Root>
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
        </Root>)
    );
}))


export default Course