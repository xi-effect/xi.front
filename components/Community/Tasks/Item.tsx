import React from 'react';
import { observer } from 'mobx-react';
import { Box, Typography, Stack } from '@mui/material';
import { useRouter, NextRouter } from 'next/router';
import { Arrow } from '@xieffect/base.icons.arrow';
import { TaskT } from './types';

type ItemsT = {
  item: TaskT;
  index: number;
};

const Item: React.FC<ItemsT> = observer(({ item, index }) => {
  const router: NextRouter = useRouter();

  const { mark, title, description } = item;

  const getColor = () => {
    if (mark === 4 || mark === 5) return '#11743A';
    if (mark === 3) return '#E75223';
    return '#F42D2D';
  };

  const getBgColor = () => {
    if (mark === 4 || mark === 5) return '#B0F9CE';
    if (mark === 3) return '#FEF2EB';
    return '#FEEAEA';
  };

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      onClick={() =>
        router.push(`/community/${router.query.comid}/tasks/${router.query.chid}/task/${index}`)
      }
      sx={{
        position: 'relative',
        height: '224px',
        backgroundColor: 'grayscale.0',
        padding: 3,
        textAlign: 'center',
        width: '100%',
        minWidth: '310px',
        borderRadius: '8px',
        cursor: 'pointer',

        '&:after': {
          content: `"${mark}"`,
          position: 'absolute',
          bgcolor: getBgColor(),
          color: getColor(),
          display: 'flex',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '32px',
          justifyContent: 'center',
          alignItems: 'center',
          top: '0px',
          right: '0px',
          height: '32px',
          width: '32px',
          borderTopRightRadius: '8px',
          borderBottomLeftRadius: '16px',
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '24px',
          color: 'grayscale.100',
        }}
      >
        {title}
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
            color: 'grayscale.80',
          }}
        >
          {description}
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
            color: 'grayscale.100',
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
            color: 'grayscale.100',
            '&:before': {
              content: "''",
              bgcolor: 'grayscale.100',
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
        <Arrow color="#445AFF" />
      </Box>
    </Stack>
  );
});

export default Item;
