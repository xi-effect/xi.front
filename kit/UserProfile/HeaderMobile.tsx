import React from 'react';
import { observer } from 'mobx-react';
import { Box, IconButton, Stack, Theme, useMediaQuery } from '@mui/material';
import { Close } from '@xieffect/base.icons.close';
import { useStore } from 'store/connect';

type HeaderMobile = {
  children: React.ReactNode;
};

const HeaderMobile = observer(({ children }: HeaderMobile) => {
  const rootStore = useStore();
  const {
    userMediaSt: { stopStream },
    uiSt,
  } = rootStore;

  const mobile700: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(700));

  return (
    <Box sx={{ width: '100%' }}>
      {mobile700 && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%', position: 'relative' }}
        >
          {/* custom btn */}
          {children}

          {/* close btn */}
          <IconButton
            onClick={() => {
              stopStream();
              uiSt.setDialogs('userProfile', false);
            }}
            sx={{
              width: '40px',
              height: '40px',
              bgcolor: 'grayscale.0',
              position: 'absolute',
              right: 0,
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
});

export default HeaderMobile;

