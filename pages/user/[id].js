import { Button, Grid, Tab, Typography, Divider, useTheme, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import React from 'react';
import { styled } from '@mui/material/styles';
import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";



const dataSource = { // Допустим это данные которые пришли с сервера
    name: 'Иванов Иван Иванович',
    class: '11Б',
    bio: 'Учусь в школе, люблю паять и вышивать, Марина Ивановна по биологии меня гнобит каждый урок, я хочу прижечь ее паяльником',
    nickName: 'Prizshigatel'
};

const CustomButton = styled(Button)(({ theme }) => ({
    width: '33%',
    height: '100px',
    top: '50%',
}));

const User = inject('rootStore')(observer(({ rootStore }) => {
    const theme = useTheme();

    return (
        <>
            <Head>
                <title>
                    Ξ Effect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid sx={{
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                }} >
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
                        <Grid sx={{justifyContent: "start"}}>
                            <Avatar src='/illustrations/shkolnik.jpg' sx={{width: 212, height: 212, marginLeft: '15%'}}/>
                        </Grid>

                        <Grid sx={{marginLeft: '23%', maxWidth: '700px', textAlign: 'left' }}>
                            <Typography variant={"h6"} textAlign={"center"}>
                                Обо мне:
                            </Typography>
                            <Divider variant="middle" sx={{bgcolor: 'text.main', height: 1,}} />
                            <Typography sx={{justifyContent: "center", display: "flex"}}>
                                {dataSource.bio}
                            </Typography>
                        </Grid>

                    </Grid>
                    <CustomButton color="inherit">МОДУЛИ</CustomButton>
                    <CustomButton color="inherit">КУРСЫ</CustomButton>
                    <CustomButton color="inherit">РАСПИСАНИЕ</CustomButton>
                </Grid>
            </NavigationAll>

        </>
    );
}))

export default User

