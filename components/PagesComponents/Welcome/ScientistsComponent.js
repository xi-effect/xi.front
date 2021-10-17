import React from 'react';
import { useTheme, Paper, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((props) => ({
    Paper: {
        position: "absolute",
        top: props => props.top,
        left: props => props.left,
        right: props => props.right,
        height: props => props.height,
        width: props => props.width,
        //backgroundColor: theme => theme.palette.green.light,
        borderRadius: props => props.height / 8,
    },
}));

const ScientistsComponent = inject('uiStore')(observer(({ uiStore, src, height, width, top, left, right, alt = 'background' }) => {
    const theme = useTheme();
    const props = { top: top, left: left, right: right, height: height + 32, width: width + 32, }
    const classes = useStyles({ ...theme, ...props });
    const router = useRouter()
    const onLoad = () => {
        uiStore.setLoading(router.pathname)
    }

    return (
        <Paper
            className={classes.Paper}
            elevation={24}
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ height: "100%" }}
            >
                <Grid item>
                    <Image
                        alt={alt}
                        src={src}
                        height={height}
                        width={width}
                        quality={100}
                    />
                </Grid>

            </Grid>
        </Paper>

    )

}));

export default ScientistsComponent
