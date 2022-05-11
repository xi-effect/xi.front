/* eslint-disable arrow-body-style */
import React from 'react';
import { Stack, Typography } from '@mui/material';
import CommunityMenu from 'kit/CommunityMenu';

type AdministrationProps = {};

const Administration: React.FC<AdministrationProps> = () => {
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2}>
      <Typography variant="h6" sx={{ color: 'text.secondary' }} component="h1">
        Управление сообществом
      </Typography>
      <CommunityMenu />
    </Stack>
  );
};

export default Administration;
