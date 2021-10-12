/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useTheme, Input, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react'
import Image from 'next/image'


const useStyles = makeStyles((theme) => ({
    gridTextWrapper: {
        //textAlign: "center !important",
        width: "100%",
    },
}));


const ImageComp = inject('rootStore')(observer(({ rootStore, value }) => {

    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    //console.log( "props", props )
    const theme = useTheme();
    const classes = useStyles({ ...props, ...theme });

    React.useEffect(() => {
        if (value.authorId && value.imageId) {
            contentStore.loadImgFromServer(value.authorId, value.imageId)
        }
    }, [])

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="center"
                // alignItems="center"
                className={classes.gridTextWrapper}
            >
                {value.authorId != null && value.imageId != null &&
                    <div className={classes.imgWrapper}>
                        <Image
                            width={960}
                            height={540}
                            //objectFit="contain"
                            layout='responsive'
                            src={contentStore.images[`${value.authorId}-${value.imageId}`]}
                            alt="Picture of the author"
                        />
                    </div>
                }
            </Grid>
        </>
    );
}));

export default ImageComp