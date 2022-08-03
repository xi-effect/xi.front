import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Stack, useMediaQuery, Button, Grid, Box, Paper, Typography } from '@mui/material';

import { labels } from 'texts/landing/MainLabel';

function MainLabel() {
  const router = useRouter();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('dl'));

  return (
    <Box
      sx={{
        position: 'relative',
        width: 'calc(100% - 64px)',
      }}
    >
      <Paper
        elevation={24}
        sx={{
          zIndex: 10,
          mt: '20px',
          width: mobile ? 'calc(100% - 0px)' : 'calc(100% - 200px)',
          ml: mobile ? '0px' : '100px',
          mr: mobile ? '0px' : '100px',
          bgcolor: 'grey.400',
          borderRadius: '20px',
          position: 'relative',
        }}
      >
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              cursor: 'default',
              color: '#272731',
              fontWeight: 800,
              textAlign: 'center',
              p: 2,
              fontSize: {
                xs: '28px',
                sm: '36px',
                md: '44px',
                lg: '60px',
              },
              lineHeight: {
                xs: '44px',
                sm: '44px',
                md: '71px',
                lg: '71px',
              },
              mt: '20px',
            }}
          >
            {labels.title}
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              cursor: 'default',
              color: '#555569',
              textAlign: 'center',
              fontWeight: 600,
              p: 2,
              fontSize: {
                xs: '20px',
                sm: '22px',
                md: '24px',
                lg: '26px',
              },
            }}
          >
            {labels.subtitle}
          </Typography>
          <Grid
            container
            direction={mobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
            }}
          >
            <Grid
              item
              md={12}
              dl={4}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Image
                alt="alt"
                src="/assets/landing/Knowledge.svg"
                quality={100}
                width={256}
                height={256}
              />
            </Grid>
            <Grid
              item
              md={12}
              dl={4}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                aria-label="signup"
                onClick={() => {
                  router.push({
                    pathname: '/signup',
                  });
                }}
                sx={{
                  '&.MuiButton-root': {
                    width: '256px',
                    height: '60px',
                    color: 'text.main',
                    bgcolor: 'primary.main',
                    borderRadius: '88px',
                    boxShadow: 24,
                    '&:hover': {
                      bgcolor: 'primary.main',
                    },
                  },
                  mt: '20px',
                  mb: '20px',
                }}
              >
                <Typography
                  sx={{
                    '&.MuiTypography-root': {
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: '18px',
                      lineHeight: '25px',
                    },
                    ml: '32px',
                    color: 'text.primary',
                  }}
                >
                  {labels.enterButton}
                </Typography>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    color: 'text.primary',
                    bgcolor: 'secondary.main',
                    height: '46px',
                    width: '46px',
                    borderRadius: '50%',
                    ml: 'auto',
                    mr: '0px',
                  }}
                >
                  <ArrowForwardIcon />
                </Stack>
              </Button>
            </Grid>
            <Grid
              item
              md={12}
              dl={4}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Image
                alt="alt"
                src="/assets/landing/OnlineLearning.svg"
                quality={100}
                width={256}
                height={256}
              />
            </Grid>
          </Grid>
        </Stack>
      </Paper>
    </Box>
  );
}

export default MainLabel;
