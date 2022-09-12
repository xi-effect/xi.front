import React from 'react';
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { inject, observer } from 'mobx-react';
import ImpulseSpinner from 'kit/Loading/ImpulseSpinner';

const quotes = [
  {
    text: 'Ученик, который учится без желания, — это птица без крыльев',
    author: 'Саади',
  },
  {
    text: 'Задача образования — заменить пустой разум свободным',
    author: 'Малькольм Форбс',
  },
  {
    text: 'Когда мы смотрим в небо и видим звёзды — мы видим лишь отсвет далёкого ядерного синтеза',
    author: 'Карл Саган',
  },
  {
    text: 'Дипломат — мужчина, который всегда помнит день рождения женщины, но никогда не помнит её возраста',
    author: 'Роберт Фрост',
  },
  {
    text: 'Будущее принадлежит тем, кто готовится к нему сегодня',
    author: 'Малкольм Икс',
  },
  {
    text: 'Люди любят узнавать новое, и это продолжает науку',
    author: 'Ральф Уолдо Эмерсон',
  },
  {
    text: 'Никакое дело не покажется невыполнимым, если разбить его на мелкие части',
    author: 'Генри Форд',
  },
  {
    text: 'Стабильность — признак мастерства',
    author: 'Соловьёва В.В.',
  },
];

const randomValue = Math.floor(Math.random() * quotes.length);

const Loading = inject('uiSt')(
  observer(({ uiSt }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));

    return (
      <AnimatePresence>
        {uiSt.load.loading && (
          <Grid
            component={motion.div}
            container
            direction="column"
            justifyContent={mobile ? 'flex-start' : 'center'}
            alignItems={mobile ? 'center' : 'center'}
            sx={{
              p: mobile ? '56px 20px' : '98px 100px',
              position: 'fixed',
              height: '100vh',
              width: '100vw',
              zIndex: 99999,
              bgcolor: 'primary.pale',
              overflow: 'hidden',
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                height: '28px',
                position: 'relative',
                maxWidth: '540px',
                width: '100%',
              }}
            >
              <ImpulseSpinner />
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  position: 'absolute',
                  top: '66px',
                  maxWidth: '540px',
                  width: '100%',
                }}
              >
                <Typography
                  align={mobile ? 'left' : 'center'}
                  sx={{
                    width: '100%',
                    color: 'gray.80',
                    fontSize: mobile ? '20px' : '20px',
                    maxWidth: '540px',
                    lineHeight: mobile ? '28px' : '28px',
                    fontWeight: 500,
                  }}
                >
                  {quotes[randomValue].text}
                </Typography>
                <Typography
                  align={mobile ? 'left' : 'center'}
                  sx={{
                    width: '100%',
                    mt: '24px',
                    color: 'gray.80',
                    fontSize: mobile ? '20px' : '20px',
                    lineHeight: '48px',
                    fontWeight: 500,
                  }}
                >
                  {`© ${quotes[randomValue ?? 0].author}`}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        )}
      </AnimatePresence>
    );
  }),
);

export default Loading;
