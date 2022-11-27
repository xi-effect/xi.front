/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { observer } from 'mobx-react';
import { Typography, Stack } from '@mui/material';

const Content = observer(() => (
  <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="flex-start"
    sx={{
      mt: '24px',
      position: 'relative',
      backgroundColor: 'grayscale.0',
      padding: 3,
      width: '100%',
      borderRadius: '8px',
    }}
  >
    <Typography
      sx={{
        fontWeight: 400,
        fontSize: '16px',
        lineHeight: '24px',
        color: 'grayscale.100',
      }}
    >
      Учащиеся нашего колледжа, представители сборной Москвы в компетенции «Полиграфические
      технологии» блестяще справились с конкурсным заданием и завоевали два золота и два серебра: 🥇
      Анастасия Моисеева (Школа № 763) 🥈 Елизавета Куликова (Школа № 1577) 🥇 Никита Рыбников (МИПК
      им. И. Федорова) 🥈 Милена Поливанова (МИПК им. И. Федорова) Техник-технолог в области
      полиграфии вовлечен во все этапы процесса печати, начиная с первоначального планирования и
      подготовки и заканчивая тиражированием издания. Он проверяет качество и выполняет завершающие
      операции после печати тиража. Углубленное знание оборудования и используемых материалов важно
      для эффективного и экономичного производства продукции высокого качества для соблюдения
      требований заказчика и соответствию стандартам отрасли. 🏆Поздравляем!
    </Typography>
  </Stack>
));

export default Content;
