/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import {
  Stack,
  useMediaQuery,
  Typography,
  Stepper,
  Step,
  StepConnector,
  StepContent,
  stepConnectorClasses,
} from '@mui/material';

import GreenButton from 'kit/GreenButton';

import { easy } from 'texts/landing/EasyToBegin';

const steps = [
  { stepLabel: 'Шаг 1', mainLabel: 'Зарегистрируйтесь', description: 'Зарегистрируйтесь' },
  { stepLabel: 'Шаг 2', mainLabel: 'Создайте Сообщество', description: 'Создайте Сообщество' },
  {
    stepLabel: 'Шаг 3',
    mainLabel: 'Настройте Сообщество',
    description: 'Настройте Сообщество',
  },
  { stepLabel: 'Шаг 4', mainLabel: 'Пригласите Учеников', description: 'Пригласите Учеников' },
  { stepLabel: 'Шаг 5', mainLabel: 'Учитесь!', description: 'Учитесь!' },
];

const ColorlibConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 24,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(117,203,153) 0%, rgb(83,191,128) 50%, rgb(58,133,89) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(117,203,153) 0%, rgb(83,191,128) 50%, rgb(58,133,89) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: '8px',
    width: '4px',
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    marginLeft: 6,
  },
}));

const EasyToBegin: React.FC = () => {
  // @ts-ignore
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  // eslint-disable-next-line no-unused-vars
  const [activeStep, setActiveStep] = React.useState<number>(0);

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 2 }}
      sx={{
        mt: mobile ? '80px' : '140px',
        width: '100%',
        position: 'relative',
      }}>
      <Typography
        component="h1"
        textAlign="center"
        variant="h1"
        sx={{
          cursor: 'default',
          fontSize: {
            xs: '28px',
            sm: '30px',
            md: '36px',
            lg: '40px',
          },
        }}>
        {easy.main}
      </Typography>
      <Stepper
        sx={{ mt: mobile ? '30px' : '40px' }}
        connector={<ColorlibConnector />}
        activeStep={activeStep}
        orientation="vertical">
        {steps.map((step, index) => (
          <Step
            onClick={() => setActiveStep(index)}
            sx={{
              width: 396,
              borderRadius: 4,
              pt: 2,
              pr: 2,
              pl: 2,
              pb: 1,
              bgcolor: 'primary.dark',
            }}
            key={step.stepLabel}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography variant="h6">{step.mainLabel}</Typography>
              <Typography
                variant="button"
                sx={{ color: activeStep === index ? 'text.main' : 'text.secondary' }}>
                {step.stepLabel}
              </Typography>
            </Stack>
            <StepContent
              sx={{
                ml: 0,
                pl: 0,
                pt: 1,
                pb: 0,
                border: 'none',
              }}>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}>
                <Typography>{step.description}</Typography>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ mt: 1, mb: 2, width: 396, p: 2 }}>
        <Typography variant="h5" sx={{ color: 'text.secondary', mr: 'auto' }}>
          {' '}
          {`Шаг ${activeStep + 1} из 5`}{' '}
        </Typography>
        <GreenButton
          disabled={activeStep === 0}
          variant="contained"
          onClick={() => {
            if (activeStep !== 0) setActiveStep((prev) => prev - 1);
          }}
          sx={{ mt: 1, mr: 1, width: 96, height: 42, borderRadius: 2 }}>
          Назад
        </GreenButton>
        <GreenButton
          disabled={activeStep === steps.length - 1}
          variant="contained"
          onClick={() => {
            if (activeStep !== steps.length - 1) setActiveStep((prev) => prev + 1);
          }}
          sx={{ mt: 1, mr: 1, width: 96, height: 42, borderRadius: 2 }}>
          Вперёд
        </GreenButton>
      </Stack>
    </Stack>
  );
};

export default EasyToBegin;
