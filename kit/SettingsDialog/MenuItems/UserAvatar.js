import React from 'react';
import { Stack, Grid, Divider, Typography, IconButton } from '@mui/material';
import { inject, observer } from 'mobx-react';

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckIcon from '@mui/icons-material/Check';
import {
  bgcolor,
  topType,
  accessoriesType,
  hairColor,
  facialHairType,
  clotheType,
  eyeType,
  eyebrowType,
  mouthType,
  skinColor,
} from 'kit/Avatar/const';

const items = [
  { length: topType.length, label: 'Верх', type: 'topType' },
  { length: accessoriesType.length, label: 'Очки', type: 'accessoriesType' },
  { length: hairColor.length, label: 'Цвет Волос', type: 'hairColor' },
  { length: clotheType.length, label: 'Одежда', type: 'clotheType' },
  { length: eyeType.length, label: 'Глаза', type: 'eyeType' },
  { length: eyebrowType.length, label: 'Брови', type: 'eyebrowType' },
  { length: mouthType.length, label: 'Рот', type: 'mouthType' },
  { length: skinColor.length, label: 'Кожа', type: 'skinColor' },
  { length: facialHairType.length, label: 'Усы', type: 'facialHairType' },
];

const UserAvatar = inject('userSt')(
  observer(({ userSt }) => (
    <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
        {items.map((item, index) => (
          <Grid
            key={index.toString()}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ maxWidth: 240, m: 1 }}
          >
            <IconButton
              onClick={() =>
                userSt.setSettingsSecond(
                  'avatar',
                  item.type,
                  userSt.settings.avatar[item.type] === 0
                    ? item.length - 1
                    : userSt.settings.avatar[item.type] - 1,
                )
              }
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography>{`${item.label} № ${userSt.settings.avatar[item.type] + 1}`}</Typography>
            <IconButton
              onClick={() =>
                userSt.setSettingsSecond(
                  'avatar',
                  item.type,
                  userSt.settings.avatar[item.type] === item.length - 1
                    ? 0
                    : userSt.settings.avatar[item.type] + 1,
                )
              }
            >
              <NavigateNextIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ height: 1, bgcolor: 'text.dark', width: '100%' }} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx={{ mt: 2, ml: 2 }}
      >
        <Typography> Компактный вариант: </Typography>
        <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start">
          {bgcolor.map((item, index) => (
            <Stack
              key={index.toString()}
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              {userSt.settings.avatar.bgcolor === index && <CheckIcon />}
            </Stack>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )),
);

export default UserAvatar;
