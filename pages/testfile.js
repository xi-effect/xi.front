import Head from 'next/head';
import React from 'react';
import { Grid, Button, Typography, Tab, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { inject, observer } from 'mobx-react'
import NavigationAll from "./../components/OtherComponents/Navigation/NavigationAll";


const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
    buttons: {
        width: '33%',
        height: '100px',


    }

}));

const dataSource = { // Допустим это данные которые пришли с сервера
    name: 'Иванов Иван Иванович',
    class: '11Б',
    bio: 'Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum',
    nickName: 'Perspiciatis'
};



const user = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <>
            <Head>
                <title>
                    Ξ Effect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid className={classes.main} >
                    <Grid>
                    </Grid>
                    <Grid>
                        <Typography variant={"h4"} justifyContent={'center'} display={'flex'}>
                            {dataSource.name}
                            <Typography>
                                {dataSource.nickName}
                            </Typography>
                        </Typography>
                        <Typography variant={"body1"} justifyContent={"flex-end"}>
                            класс {dataSource.class}
                        </Typography>


                        <Grid marginLeft={'23%'} maxWidth={'700px'} textAlign={'left'}>
                            <Typography variant={"h6"} textAlign={"center"}>
                                Обо мне:
                                <hr />
                            </Typography>
                            <Typography>
                                {dataSource.bio}
                            </Typography>
                        </Grid>

                    </Grid>
                    <button className={classes.buttons}>МОДУЛИ</button>
                    <button className={classes.buttons}>КУРСЫ</button>
                    <button className={classes.buttons}>РАСПИСАНИЕ</button>
                </Grid>
            </NavigationAll>

        </>
    );
}))

export default user