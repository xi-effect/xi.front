
import React, { useEffect, useRef } from 'react';

import { Stack, Button, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react';
import { useLocalStorage } from 'react-use';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StoryItem from './StoryItem';
import DialogStory from './DialogStory';

const stories = [
  {
    label: '0.4.3',
    sublabel: 'Обновление',
    body: 'Что нового?',
    size: 256,
    top: -20,
    left: -28,
    bgcolor: 'primary.dark',
    image: '/assets/3d/download.png',
  },
  {
    label: null,
    sublabel: 'Математика',
    body: '10 задач из 6 класса',
    size: 242,
    top: 1,
    left: -28,
    bgcolor: 'primary.dark',
    image: '/assets/3d/alphaM.png',
  },
  {
    label: null,
    sublabel: 'Альпаки',
    body: 'Кто не любит Альпак?',
    size: 242,
    top: 1,
    left: -28,
    bgcolor: 'primary.dark',
    image: '/assets/3d/alphaa.png',
  },
  {
    label: 'Аватарки',
    sublabel: 'Что это?',
    body: 'Рассказываем подробнее',
    size: 256,
    top: -20,
    left: -28,
    bgcolor: 'primary.dark',
    image: '/assets/3d/avatarsBox.png',
  },
  {
    label: null,
    sublabel: 'Сообщества',
    body: 'Как создать сообщество?',
    size: 256,
    top: -20,
    left: -36,
    bgcolor: 'primary.dark',
    image: '/assets/3d/community.png',
  },
];

const Stories: React.FC = inject()(
  observer(() => {
    const [open, setOpen] = React.useState<number | null>(null);

    const [valueLS, setValueLS] = useLocalStorage('second-menu-c-upper-items-position-is-vert');

    useEffect(() => {
      if (valueLS === undefined) {
        setValueLS(true);
      }
    }, []);

    const scrollContainer = useRef<HTMLDivElement>();

    const handleRight = () => {
      if (scrollContainer && scrollContainer.current) {
        scrollContainer.current.scrollLeft += 216;
      }
    };

    const handleLeft = () => {
      if (scrollContainer && scrollContainer.current) {
        scrollContainer.current.scrollLeft -= 216;
      }
    };

    const [progress, setProgress] = React.useState(1);

    let timer;

    const handleCloseDialog = () => {
      setOpen(null);
      setProgress(1);
      clearInterval(timer);
    };

    const handleOpenDialog = (v: number) => {
      setOpen(v);
      timer = setInterval(() => {
        if (progress !== 90) {
          setProgress((prevProgress) => prevProgress + 2);
        } else {
          handleCloseDialog();
          setProgress(1);
        }
      }, 100);
      setTimeout(() => {
        setOpen(null);
        setProgress(1);
        clearInterval(timer);
      }, 5000);
    };

    return (
      <>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{
            width: '100%',
            pl: 4,
            pr: 4,
          }}>
          <Button
            variant="contained"
            sx={{
              '&.MuiButtonBase-root': {
                height: 36,
                width: 36,
                minWidth: 36,
                bgcolor: 'secondary.dark',
              },
              ':disabled': {
                bgcolor: 'transparent',
              },
            }}
            onClick={handleLeft}>
            <ArrowBackIosNewIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              '&.MuiButtonBase-root': {
                height: 36,
                width: 36,
                minWidth: 36,
                bgcolor: 'secondary.dark',
              },
              ':disabled': {
                bgcolor: 'transparent',
              },
            }}
            onClick={handleRight}>
            <ArrowForwardIosIcon />
          </Button>
          <Typography
            variant="h6"
            sx={{
              fontSize: 22,
              ml: 2,
              color: 'text.secondary',
            }}>
            Истории:
          </Typography>
        </Stack>
        <Stack
          ref={scrollContainer}
          id="scroll-container-stories"
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          sx={{
            p: 2,
            width: '100%',
            scrollSnapType: 'x-mandatory',
            transition: '0.4s',
            scrollBehavior: 'smooth',
          }}>
          {stories.map((item, index) => (
            <StoryItem
              index={index}
              item={item}
              handleOpenDialog={handleOpenDialog}
              key={index.toString()}
            />
          ))}
        </Stack>
        <DialogStory
          progress={progress}
          item={stories[open ?? 0]}
          open={open}
          handleCloseDialog={handleCloseDialog}
        />
      </>
    );
  }),
);

export default Stories;
