/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMediaQuery, Link, Grid, Box, Typography, Container, IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';
import TermsOfUse from './TermsOfUse';
import GratitudeDialog from './GratitudeDialog';

const Footer = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const [openTermsOfUse, setOpenTermsOfUse] = React.useState(false);
  const [type, setType] = React.useState(0);

  const [openGratitudeDialog, setOpenGratitudeDialog] = React.useState(false);

  React.useEffect(() => {
    if (router.query.dialog && router.query.dialog === 'gratitude') setOpenGratitudeDialog(true);
  }, [router.query]);

  const thisFnWIP = () =>
    enqueueSnackbar('Эту функцию мы ещё только разрабатываем', {
      variant: 'info',
    });

  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 2 }}
      sx={{
        width: 'calc(100vw - 8px)',
        minHeight: mobile ? '425px' : '128px',
        bgcolor: 'primary.main',
        mt: '100px',
        zIndex: 0,
      }}
    >
      <Container>
        {!mobile && (
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              maxWidth: 1920,
              p: 2,
              width: '100%',
            }}
          >
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                height: 48,
              }}
            >
              <Grid item>
                <Link
                  component="span"
                  onClick={thisFnWIP}
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                >
                  {' '}
                  Справочник{' '}
                </Link>
                <Link
                  component="span"
                  onClick={() => router.push(`/support`)}
                  sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}
                >
                  {' '}
                  Поддержка{' '}
                </Link>
                <Link
                  component="span"
                  onClick={thisFnWIP}
                  sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}
                >
                  {' '}
                  Приложение{' '}
                </Link>
                <Link
                  component="span"
                  onClick={() => {
                    router.push(`/?dialog=gratitude`);
                    setOpenGratitudeDialog(true);
                  }}
                  sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}
                >
                  {' '}
                  Благодарности{' '}
                </Link>
              </Grid>
              <Grid
                item
                sx={{
                  ml: 'auto',
                  mr: 1,
                }}
              >
                <Typography sx={{ cursor: 'default' }}> Социальные сети </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                height: 48,
              }}
            >
              <Grid
                item
                container
                direction="row"
                sx={{
                  maxWidth: 700,
                }}
              >
                <Typography> © 2022 xieffect.ru </Typography>
                <Link
                  component="span"
                  sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}
                  onClick={() => {
                    setType(0);
                    setOpenTermsOfUse(true);
                  }}
                >
                  Пользовательское соглашение
                </Link>
                <Link
                  component="span"
                  sx={{ color: 'text.primary', ml: 1.5, cursor: 'pointer' }}
                  onClick={() => {
                    setType(1);
                    setOpenTermsOfUse(true);
                  }}
                >
                  Лицензионное соглашение
                </Link>
              </Grid>
              <Grid
                item
                sx={{
                  ml: 'auto',
                  mr: 1,
                }}
              >
                <IconButton
                  aria-label="go to our discord"
                  onClick={() => window.open('https://discord.gg/aNQfXXb')}
                >
                  <Image
                    alt="alt"
                    src="/assets/landing/DiscordLogoWhite.svg"
                    quality={100}
                    width={32}
                    height={32}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )}
        {mobile && (
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              maxWidth: 1920,
              p: 2,
              width: '100%',
            }}
          >
            <Link
              component="span"
              onClick={thisFnWIP}
              sx={{ color: 'text.primary', cursor: 'pointer' }}
            >
              {' '}
              Справочник{' '}
            </Link>
            <Link
              component="span"
              onClick={thisFnWIP}
              sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}
            >
              {' '}
              Поддержка{' '}
            </Link>
            <Link
              component="span"
              onClick={thisFnWIP}
              sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}
            >
              {' '}
              Приложение{' '}
            </Link>
            <Link
              component="span"
              onClick={() => {
                router.push(`/?dialog=gratitude`);
                setOpenGratitudeDialog(true);
              }}
              sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}
            >
              {' '}
              Благодарности{' '}
            </Link>
            <Typography sx={{ mt: 2, cursor: 'default' }}> Социальные сети </Typography>
            <IconButton
              aria-label="go to our discord"
              sx={{ mt: 1 }}
              onClick={() => window.open('https://discord.gg/aNQfXXb')}
            >
              <Image
                alt="alt"
                src="/assets/landing/DiscordLogoWhite.svg"
                quality={100}
                width={32}
                height={32}
              />
            </IconButton>
            <Link component="span" sx={{ color: 'text.primary', mt: 2, cursor: 'pointer' }}>
              {' '}
              Пользовательское соглашение{' '}
            </Link>
            <Link component="span" sx={{ color: 'text.primary', mt: 1, cursor: 'pointer' }}>
              {' '}
              Лицензионное соглашение
            </Link>
            <Typography sx={{ mt: 3 }}> © 2022 xieffect.ru </Typography>
          </Grid>
        )}
      </Container>
      <GratitudeDialog open={openGratitudeDialog} setOpen={setOpenGratitudeDialog} />
      <TermsOfUse open={openTermsOfUse} setOpen={setOpenTermsOfUse} type={type} />
    </Box>
  );
};

export default Footer;
