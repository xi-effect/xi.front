/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { Divider, useMediaQuery, Link, Button, Grid, Box, Paper, useTheme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'

const cards = [
    {
        firstCardLabel: 'Всё в одном месте',
        firstCardContentS1: 'Мы собрали все сервисы',
        firstCardContentS2: 'для вашего образование в одном месте',
        firstCardContentS3: '',
        firstSrc: "/school/045-website.png",
        secondCardLabel: 'Образовательный контент',
        secondCardContentS1: 'Получайте знания и делитесь ими!',
        secondCardContentS2: 'Мы создали для этого удобный,',
        secondCardContentS3: 'интерактивный формат страниц и модулей',
        secondSrc: "/school/046-education.png"
    },
    {
        firstCardLabel: 'Общайтесь!',
        firstCardContentS1: 'Мы создали место для общения!',
        firstCardContentS2: 'Ученики, преподаватели и родители',
        firstCardContentS3: 'теперь могут вести диалог с комфортом',
        firstSrc: "/school/018-conversation.png",
        secondCardLabel: 'Что-то',
        secondCardContentS1: 'Текст я не придумал',
        secondCardContentS2: 'Это точно',
        secondCardContentS3: 'какая жалость :(',
        secondSrc: "/school/020-online library.png"
    },

]

const useStyles = makeStyles((theme) => ({
    ContentGrid1: {
        width: '100%',
        height: 396,
        //background: `linear-gradient(0deg, #EECFBA, #C5DDE8)`;
        backgroundColor: theme => theme.palette.background["2"],
    },
    ContentGrid2: {
        width: '100%',
        height: 396,
        backgroundColor: theme => theme.palette.background["1"],
    },
    firstCardLabel: {
        [theme.breakpoints.down('md')]: {
            fontSize: 24,
        },
        margin: "0.5em",
        color: theme => theme.palette.text.main,
    },
    firstCardContent: {
        [theme.breakpoints.down('md')]: {
            fontSize: 18,
        },
        margin: "1em",
        color: theme => theme.palette.text.main,
        fontSize: 24,
    },
    Image: {
        [theme.breakpoints.down('md')]: {
            height: 128,
            width: 128,
        },
        height: 256,
        width: 256,
    }
}));

const Card = ({ card }) => {
    const theme = useTheme();
    const classes = useStyles(theme);
    //const mobile = useMediaQuery(theme => theme.breakpoints.down('md'));

    return (
        <>
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.ContentGrid1}>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ maxWidth: 1600, }}
                >
                    <Grid item >
                        <Typography className={classes.firstCardLabel} variant="h3">
                            {card.firstCardLabel}
                        </Typography>
                        <Typography className={classes.firstCardContent} variant="body1">
                            {card.firstCardContentS1}<br />
                            {card.firstCardContentS2}<br />
                            {card.firstCardContentS3}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img
                            alt="Изображение у карточки"
                            className={classes.Image}
                            src={card.firstSrc}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                className={classes.ContentGrid2}>
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                    sx={{ maxWidth: 1600, }}
                >
                    <Grid item>
                        <img
                            alt="Изображение у карточки"
                            className={classes.Image}
                            src={card.secondSrc}
                        />
                    </Grid>
                    <Grid item >
                        <Typography className={classes.firstCardLabel} variant="h3">
                            {card.secondCardLabel}
                        </Typography>
                        <Typography className={classes.firstCardContent} variant="body1">
                            {card.secondCardContentS1}<br />
                            {card.secondCardContentS2}<br />
                            {card.secondCardContentS3}
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>
        </>
    )
}

const CardsList = () => {

    return (
        <>
            {cards.map((card, index) => (
                <Card card={card} key={index.toString()} />
            ))}
        </>
    )
}

export default CardsList