import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
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
  observer(({ uiSt }) => (
    <AnimatePresence>
      {(uiSt.load.loading || true) && (
        <Grid
          component={motion.div}
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            p: '98px 100px',
            position: 'fixed',
            height: '100vh',
            width: '100vw',
            zIndex: 99999,
            bgcolor: 'primary.dark',
            overflow: 'hidden',
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Box
            sx={{
              pl: '4px',
            }}
          >
            <ImpulseSpinner />
          </Box>
          <Typography
            sx={{
              mt: '64px',
              color: '#FFFFFF',
              fontSize: '36px',
              maxWidth: '752px',
              lineHeight: '48px',
            }}
          >
            {quotes[randomValue].text}
          </Typography>
          <Typography
            sx={{
              mt: '24px',
              color: '#FFFFFF',
              fontSize: '36px',
              lineHeight: '48px',
            }}
          >
            {`© ${quotes[randomValue ?? 0].author}`}
          </Typography>
        </Grid>
      )}
    </AnimatePresence>
  )),
);

export default Loading;
