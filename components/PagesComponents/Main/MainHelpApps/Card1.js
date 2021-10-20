import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, useTheme, Pagination, PaginationItem } from '@mui/material';

import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable';

const PREFIX = 'Card1';

const classes = {
    root: `${PREFIX}-root`,
    mainLabel: `${PREFIX}-mainLabel`,
    content: `${PREFIX}-content`,
    gridPagination: `${PREFIX}-gridPagination`,
    PaginationItem: `${PREFIX}-PaginationItem`,
    labelContent: `${PREFIX}-labelContent`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`&.${classes.root}`]: {
        margin: 16,
        width: 'calc(100% - 32px)',
        height: '450px',
    },

    [`& .${classes.mainLabel}`]: {
        fontSize: 20,
        //marginLeft: 52,
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.content}`]: {
        //width: '100%',
        height: '350px',
        borderRadius: 64,
        backgroundColor: theme.palette.blueGrey["5"],
        //border: `${theme.main.palette.content.border} solid 2px`,
    },

    [`& .${classes.gridPagination}`]: {
        marginTop: 8,
    },

    [`& .${classes.PaginationItem}`]: {
        color: theme.palette.primary.contrastText,
    },

    [`& .${classes.labelContent}`]: {
        margin: 16,
        color: theme.palette.primary.contrastText,
    }
}));

const Card1 = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();



    const config = {
        delta: 10,
    }

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (page === 1) return setPage(2);
            if (page === 2) return setPage(3);
            if (page === 3) return setPage(4);
            if (page === 4) return setPage(5);
            //console.log("User Swiped!", eventData)
        },
        onSwipedRight: (eventData) => {
            if (page === 5) return setPage(4);
            if (page === 4) return setPage(3);
            if (page === 3) return setPage(2);
            if (page === 2) return setPage(1);
            //console.log("User Swiped!", eventData)
        },
        ...config,
    });

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <StyledGrid
            {...handlers}
            className={classes.root}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Typography className={classes.mainLabel}> Как начать обучение? </Typography>
            </Grid>
            <Grid
                className={classes.content}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >

                {page == 1 && <div className={classes.background}>
                    <Image
                        alt="HowBeginLearning"
                        src="/illustrations/HowBeginLearning.png"
                        //layout="fill"
                        width={350}
                        height={350}
                    //objectFit="cover"
                    //quality={100}
                    />
                </div>}
                {page == 2 && <Typography align="center" className={classes.labelContent}> {"На портале вы можете найти теорию, упражнения и тесты по многим предметам. Начните перейдя в раздел 'Знания', отмеченный в меню раскрытой книгой."} </Typography>}
                {page == 3 && <Typography align="center" className={classes.labelContent}> {"Чтобы найти именно то, что нужно, используйте фильтры. Детальная инструкция по их использованию есть в соответствующей карточке."} </Typography>}
                {page == 4 && <Typography align="center" className={classes.labelContent}> {"Все образовательные материалы, расположенные во вкладке 'Знания', сгруппированы в модули для упрощённой навигации, фильтрации и сортировки."} </Typography>}
                {page == 5 && <Typography align="center" className={classes.labelContent}> {"Модули делятся на четыре типа: стандартный модуль, блок теории, блок практики и тестирование. Об этих типах также можно узнать в соответствующей карточке."} </Typography>}

            </Grid>
            <Grid
                className={classes.gridPagination}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Pagination
                    renderItem={(item) => <PaginationItem className={classes.PaginationItem} {...item} />}
                    shape="rounded"
                    size="large"
                    count={5}
                    page={page}
                    onChange={handleChange} />
            </Grid>

        </StyledGrid>
    );

}));

export default Card1