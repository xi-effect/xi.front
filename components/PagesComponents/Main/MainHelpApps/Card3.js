import React from 'react';
import { Grid, Typography, useTheme, Pagination, PaginationItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 16,
        width: 'calc(100% - 32px)',
        height: '450px',
    },
    mainLabel: {
        fontSize: 20,
        //marginLeft: 52,
        color: theme => theme.palette.primary.contrastText,
    },
    content: {
        //width: '100%',
        height: '350px',
        borderRadius: 64,
        backgroundColor: theme => theme.palette.blueGrey["5"],
        //border: `${theme.main.palette.content.border} solid 2px`,
    },
    gridPagination: {
        marginTop: 8,
    },
    PaginationItem: {
        color: theme => theme.palette.primary.contrastText,
    },
    labelContent: {
        margin: 16,
        color: theme => theme.palette.primary.contrastText,
    }
}));

const Card3 = inject('store')(observer((props) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

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

    return (
        <Grid
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
                <Typography className={classes.mainLabel}> Как работают фильтры? </Typography>
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
                        alt="HowCreateCourse"
                        src="/illustrations/HowCreateCourse.png"
                        //layout="fill"
                        width={350}
                        height={350}
                    //objectFit="cover"
                    //quality={100}
                    />
                </div>}
                {page == 2 && <Typography align="center" className={classes.labelContent}> {"Вкладка 'Знания' содержит абсолютно все модули сайта и разбираться среди них довольно трудно. Поэтому вам доступны фильтры. Их можно найти вверху страницы."} </Typography>}
                {page == 3 && <Typography align="center" className={classes.labelContent}> {"Модули в этом списке можно добавлять в избранное и закреплять. Позже такие модули можно выделить через выбор соответствующего глобального фильтра. Для удобства последний выбор глобального фильтра сохраняется."} </Typography>}
                {page == 4 && <Typography align="center" className={classes.labelContent}> {"Чтобы найти что-то конкретное, фильтруйте модули по темам (предметные области), категориям и сложности. Сложность в данном случае скорее обозначает уровень вхождения: чем выше сложность, тем больше познаний нужно иметь перед началом работы с модулем."} </Typography>}
                {page == 5 && <Typography align="center" className={classes.labelContent}> {"И, наконец, сортировка. Она поможет приблизить к началу популярные, новые или недавно посещённые модули. Последний тип помещает посещённые модули выше других, сортируя по дате последнего визита, а остальные сортирует по популярности."} </Typography>}
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

        </Grid>
    )

}))

export default Card3