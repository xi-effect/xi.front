/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useTheme, Grid } from '@mui/material';

import { inject, observer } from 'mobx-react'
import Image from 'next/image'

const ImageComp = inject('rootStore')(observer(({ rootStore, value }) => {
    const props = { fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };
    const theme = useTheme();


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
                sx={{ width: "100%", }}
            >
                {value.authorId != null && value.imageId != null &&
                    <div>
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