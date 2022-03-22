/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Grid } from "@mui/material";

import { inject, observer } from "mobx-react"
import Image from "next/image"

const ImageComp = inject("contentSt")(observer(({ contentSt, value }) => {
    React.useEffect(() => {
        if (value.authorId && value.imageId) {
            contentSt.loadImgFromServer(value.authorId, value.imageId)
        }
    }, [])

    return (
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
                        // objectFit="contain"
                        layout="responsive"
                        src={contentSt.images[`${value.authorId}-${value.imageId}`]}
                        alt="Picture of the author"
                    />
                </div>
            }
        </Grid>
    );
}));

export default ImageComp