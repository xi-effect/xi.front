import React from 'react';
import { Stack, Typography } from '@mui/material';

import { inject, observer } from 'mobx-react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { motion } from 'framer-motion';

const arrowVariants = {
  open: {
    rotate: 90,
    x: -15,
  },
  closed: {
    rotate: 0,
  },
};

const Materials = inject()(
  observer(() => {
    const [materials, setMaterials] = React.useState(false);

    return (
      <>
        <Stack
          onClick={() => setMaterials(!materials)}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            width: '100%',
            pl: 0,
            pr: 1,
            cursor: 'pointer',
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
            },
            zIndex: 1,
          }}
        >
          <ArrowForwardIosIcon
            component={motion.svg}
            variants={arrowVariants}
            animate={materials ? 'open' : 'closed'}
            transition={{ type: 'ease', duration: 0.2 }}
            sx={{ fontSize: 8 }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              ml: 1,
              fontSize: 14,
            }}
          >
            материалы
          </Typography>
        </Stack>
        {materials && (
          <Typography variant="subtitle1">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
            consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
            nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </Typography>
        )}
      </>
    );
  }),
);

export default Materials;
