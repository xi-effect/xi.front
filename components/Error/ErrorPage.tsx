import { Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { NextRouter, useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { errorCode, errorMessages } from 'texts/errorMessages/errorMessages';
import Header from 'components/Landing/Header';

type ScreenSize = 'min480' | 'min1000' | 'min1336' | 'min1920' | 'max1920';
type ScreenToString = { [key in ScreenSize]: string }; // eslint-disable-line no-unused-vars

type ErrorPageProps = {
  code: errorCode;
};

export default function ErrorPage({ code }: ErrorPageProps) {
  const mainFontSize: ScreenToString = {
    min480: '100px',
    min1000: '160px',
    min1336: '160px',
    min1920: '220px',
    max1920: '220px',
  };

  const mainMarginTop: ScreenToString = {
    min480: '65px', // + 5 instead of line height of main
    min1000: '78px',
    min1336: '78px',
    min1920: '94px',
    max1920: '94px',
  };

  const secondaryFontSize: ScreenToString = {
    min480: '16px',
    min1000: '24px',
    min1336: '24px',
    min1920: '32px',
    max1920: '32px',
  };

  const secondaryLineHeight: ScreenToString = {
    min480: '32px',
    min1000: '32px',
    min1336: '32px',
    min1920: '42px',
    max1920: '42px',
  };

  const secondaryMarginTop: ScreenToString = {
    min480: '5px', // + 5 instead of line height of main
    min1000: '24px',
    min1336: '24px',
    min1920: '32px',
    max1920: '32px',
  };

  const buttonFontSize: ScreenToString = {
    min480: '18px',
    min1000: '24px',
    min1336: '24px',
    min1920: '24px',
    max1920: '24px',
  };

  const buttonHeight: ScreenToString = {
    min480: '48px',
    min1000: '64px',
    min1336: '64px',
    min1920: '64px',
    max1920: '64px',
  };

  const buttonWidth: ScreenToString = {
    min480: '167px',
    min1000: '201px',
    min1336: '201px',
    min1920: '201px',
    max1920: '201px',
  };

  const buttonMarginTop: ScreenToString = {
    min480: '48px',
    min1000: '64px',
    min1336: '64px',
    min1920: '100px',
    max1920: '100px',
  };

  // скопировано из Main в pages/index.tsx
  const mobile1920: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1920));
  const mobile1336: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1336));
  const mobile1000: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down(1000));
  const mobilesm: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const getDeviceWidth = () => {
    if (mobilesm) return 'min480';
    if (mobile1000) return 'min1000';
    if (mobile1336) return 'min1336';
    if (mobile1920) return 'min1920';
    return 'max1920';
  };

  const screenSize: ScreenSize = getDeviceWidth();
  const router: NextRouter = useRouter();

  return (
    <Stack // скопировано из pages/index.tsx кроме alignItems
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 2 }}
      direction="column"
      justifyContent="flex-start"
      sx={{
        zIndex: 1,
        margin: 0,
        overflow: 'auto',
        minHeight: mobilesm ? 'calc(100vh - 14px)' : '100vh',
        height: '100%',
        bgcolor: 'primary.pale',
        p: mobile1336 ? '20px 16px 20px 16px' : '16px 84px 64px 84px',
      }}
    >
      <Header />
      <Typography
        sx={{
          marginLeft: mobile1336 ? '4px' : '16px', // скопировано из components/Landing/Header
          marginTop: mainMarginTop[screenSize],
          fontSize: mainFontSize[screenSize],
          lineHeight: mainFontSize[screenSize],
          fontWeight: 600,
        }}
      >
        {code}
      </Typography>
      <Typography
        sx={{
          marginLeft: mobile1336 ? '4px' : '16px', // скопировано из components/Landing/Header
          marginTop: secondaryMarginTop[screenSize],
          fontSize: secondaryFontSize[screenSize],
          lineHeight: secondaryLineHeight[screenSize],
          fontWeight: 400,
        }}
      >
        {errorMessages[code]}
      </Typography>
      <Button
        variant="contained"
        onClick={() => router.push('/')}
        sx={{
          marginLeft: mobile1336 ? '4px' : '16px', // скопировано из components/Landing/Header
          marginTop: buttonMarginTop[screenSize],
          height: buttonHeight[screenSize],
          width: buttonWidth[screenSize],
          fontSize: buttonFontSize[screenSize],
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        На главную
      </Button>
    </Stack>
  );
}
