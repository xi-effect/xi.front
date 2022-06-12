/* eslint-disable no-unused-vars */
import React from 'react';

import { Paper, Stack, Box, Typography, IconButton, useMediaQuery } from '@mui/material';

import { inject, observer } from 'mobx-react';

import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { StoryItemProps } from './types';

const StoryItem: React.FC<StoryItemProps> = inject()(
  observer(({ index, item, setOpen }) => {
    // @ts-ignore
    const mobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

    const getImageSize = (v: number | undefined) => {
      if (v && mobile) {
        return v * 0.6;
      }
      if (v) {
        return v;
      }
      if (mobile) {
        return 126;
      }
      return 156;
    };

    const getTop = (v: number | undefined) => {
      if (v && mobile) {
        return v * -0.5;
      }
      if (v) {
        return v;
      }
      if (mobile) {
        return 0;
      }
      return 0;
    };

    const getLeft = (v: number | undefined) => {
      if (v && mobile) {
        return v * 0;
      }
      if (v) {
        return v;
      }
      if (mobile) {
        return 0;
      }
      return 0;
    };

    return (
      <Paper
        onClick={() => setOpen(index)}
        elevation={24}
        sx={{
          height: mobile ? 240 : 300,
          minWidth: mobile ? '160px' : '200px',
          maxWidth: mobile ? '160px' : '200px',
          borderRadius: 8,
          border: '4px solid',
          borderColor: 'secondary.dark',
          scrollSnapAlign: 'start',
          cursor: 'pointer',
          bgcolor: item.bgcolor ?? '',
        }}>
        <Stack
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-start"
          spacing={0}
          sx={{
            mt: -2,
            position: 'relative',
            width: '100%',
            height: '100%',
          }}>
          <Box
            sx={{
              position: 'absolute',
              top: getTop(item.top),
              left: getLeft(item.left),
              width: getImageSize(item.size),
              height: getImageSize(item.size),
            }}>
            <Image
              alt="alt"
              src={item.image}
              quality={100}
              width={getImageSize(item.size)}
              height={getImageSize(item.size)}
            />
          </Box>
          {item.label && (
            <Typography
              variant="h5"
              sx={{
                pl: 1.5,
                pr: 1,
              }}>
              {item.label}
            </Typography>
          )}
          {item.sublabel && (
            <Typography
              variant="h6"
              sx={{
                pl: 1.5,
                pr: 1,
              }}>
              {item.sublabel}
            </Typography>
          )}
          {item.body && (
            <Typography
              variant="subtitle1"
              sx={{
                pl: 1.5,
                pr: 1,
                color: 'text.secondary',
              }}>
              {item.body}
            </Typography>
          )}
        </Stack>
      </Paper>
    );
  }),
);

export default StoryItem;
