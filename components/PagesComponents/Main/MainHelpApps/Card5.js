import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, useTheme, Pagination, PaginationItem } from '@mui/material';

import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import { useSwipeable } from 'react-swipeable';

const PREFIX = 'Card5';

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
        fontSize: 18,
        //marginLeft: 52,
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.content}`]: {
        //width: '100%',
        height: '350px',
        borderRadius: 64,
        backgroundColor: theme => theme.palette.blueGrey["5"],
        //border: `${theme.main.palette.content.border} solid 2px`,
    },

    [`& .${classes.gridPagination}`]: {
        marginTop: 8,
    },

    [`& .${classes.PaginationItem}`]: {
        color: theme => theme.palette.primary.contrastText,
    },

    [`& .${classes.labelContent}`]: {
        margin: 16,
        color: theme => theme.palette.primary.contrastText,
    }
}));

const Card5 = inject('store')(observer((props) => {
    const theme = useTheme();


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
                <Typography className={classes.mainLabel}> Что, если возникла ошибка на сайте? </Typography>
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
                        alt="HowFiltersWork"
                        src="/illustrations/HowFiltersWork.png"
                        //layout="fill"
                        width={350}
                        height={350}
                    //objectFit="cover"
                    //quality={100}
                    />
                </div>}
                {page == 2 && <Typography align="center" className={classes.labelContent}> {"Все настройки доступны в соответствующем пункте меню, он отмечен шестерёнкой. Здесь собраны как настройки аккаунта, так и внешнего вида сайта. Настройки внешнего вида сохраняются автоматически."} </Typography>}
                {page == 3 && <Typography align="center" className={classes.labelContent}> {"Будьте осторожны с изменением почты и пароля. Кроме того, не доверяйте пароль от аккаунта или доступ к почте посторонним. Если вы забудете пароль, его восстановление возможно только через привязанную к аккаунту почту."} </Typography>}
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
                    count={3}
                    page={page}
                    onChange={handleChange} />
            </Grid>

        </StyledGrid>
    );

}))

export default Card5