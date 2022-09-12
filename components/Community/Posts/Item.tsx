/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { Box, Typography, Stack } from '@mui/material';
import MyIcon from 'kit/MyIcon';
import { useRouter, NextRouter } from 'next/router';

type ItemsT = {
  rootStore?: any;
  index: number
};

const Item: React.FC<ItemsT> = inject('rootStore')(
  observer(({ index }) => {
    const router: NextRouter = useRouter();

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        onClick={() => router.push(`/community/${router.query.comid}/posts/${router.query.chid}/post/${index}`)}
        sx={{
          position: 'relative',
          height: '224px',
          backgroundColor: 'gray.0',
          padding: 3,
          textAlign: 'center',
          width: '100%',
          minWidth: '310px',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            color: 'gray.100',
          }}
        >
          Театральная постановка
        </Typography>
        <Box
          sx={{
            mt: 2,
            height: '100%',
          }}
        >
          <Typography
            textAlign="left"
            sx={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: 'gray.80',
            }}
          >
            23 мая в актовом зале состоится театральная постановка.
          </Typography>
        </Box>
        <Stack
          sx={{
            width: '100%',
            height: '24px',
          }}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            textAlign="left"
            sx={{
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: 'gray.100',
            }}
          >
            3 мая 2022
          </Typography>
          <Typography
            textAlign="left"
            sx={{
              position: 'relative',
              ml: '11px',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: 'gray.100',
              '&:before': {
                content: "''",
                bgcolor: 'gray.100',
                position: 'absolute',
                left: '-7px',
                top: '7px',
                height: '3px',
                width: '3px',
                borderRadius: '100%',
              },
            }}
          >
            Юшкевич О.А.
          </Typography>
        </Stack>
        <Box
          sx={{
            width: '24px',
            height: '24px',
            position: 'absolute',
            bottom: '24px',
            right: '24px',
          }}
        >
          <MyIcon name="arrow" color="#445AFF" />
        </Box>
      </Stack>
    );
  }),
);

export default Item;
