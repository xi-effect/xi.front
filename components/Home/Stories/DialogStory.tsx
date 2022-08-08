/* eslint-disable no-unused-vars */
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';

import {
  Stack,
  Typography,
  Dialog,
  Box,
  useMediaQuery,
  IconButton,
  LinearProgress,
} from '@mui/material';

import { inject, observer } from 'mobx-react';
import { Item } from './types';

type Props = {
  progress: number;
  item: Item | null;
  open: number | null;
  handleCloseDialog: () => void;
};

const DialogStory: React.FC<Props> = inject()(
  observer(({ progress, item, open, handleCloseDialog }) => {
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
      <Dialog fullScreen={mobile} onClose={handleCloseDialog} open={open !== null}>
        {item !== null && (
          <Box
            sx={{
              height: '100vh',
              width: '100%',
              maxHeight: '900px',
              aspectRatio: '9 / 18',
              bgcolor: item?.bgcolor ?? '',
            }}
          >
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
              }}
            >
              <Stack
                sx={{
                  position: 'absolute',
                  top: 24,
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  height: 16,
                }}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Box sx={{ width: '100%', ml: 1, mr: 1 }}>
                  <LinearProgress color="inherit" variant="determinate" value={progress} />
                </Box>
              </Stack>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  top: 48,
                  right: 8,
                }}
              >
                <CloseIcon sx={{ fontSize: 48 }} />
              </IconButton>
              <Box
                sx={{
                  position: 'absolute',
                  top: getTop(item?.top),
                  left: getLeft(item?.left),
                  width: getImageSize(item?.size),
                  height: getImageSize(item?.size),
                }}
              >
                {item?.image && (
                  <Image
                    alt="alt"
                    src={item?.image}
                    quality={100}
                    width={getImageSize(item?.size)}
                    height={getImageSize(item?.size)}
                  />
                )}
              </Box>
              {item?.label && (
                <Typography
                  variant="h5"
                  sx={{
                    pl: 1.5,
                    pr: 1,
                  }}
                >
                  {item?.label}
                </Typography>
              )}
              {item?.sublabel && (
                <Typography
                  variant="h6"
                  sx={{
                    pl: 1.5,
                    pr: 1,
                  }}
                >
                  {item?.sublabel}
                </Typography>
              )}
              {item?.body && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    pl: 1.5,
                    pr: 1,
                    color: 'text.secondary',
                  }}
                >
                  {item?.body}
                </Typography>
              )}
            </Stack>
          </Box>
        )}
      </Dialog>
    );
  }),
);

export default DialogStory;
