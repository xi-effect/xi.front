/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useTheme, Input, Grid } from '@mui/material';

import { inject, observer } from 'mobx-react'
import Image from 'next/image'


const PREFIX = 'ImageComp';

const classes = {
    gridTextWrapper: `${PREFIX}-gridTextWrapper`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.gridTextWrapper}`]: {
        //textAlign: "center !important",
        width: "100%",
    }
}));


const ImageComp = inject('rootStore')(observer(({ rootStore, value }) => {

    // Simulated props for the purpose of the example
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };

    //console.log( "props", props )
    const theme = useTheme();


    React.useEffect(() => {
        if (value.authorId && value.imageId) {
            contentStore.loadImgFromServer(value.authorId, value.imageId)
        }
    }, [])

    return (
        (<Root>
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
        </Root>)
    );
}));

export default ImageComp