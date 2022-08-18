import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Stack } from '@mui/material';
import StepOneForm from './StepOneForm';
import StepTwoForm from './StepTwoForm';

const schema = yup
  .object({
    code: yup.string().required(),
    username: yup.string().min(1).max(100).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().min(6).max(100).required(),
  })
  .required();

interface ISignupForm {
  authorizationSt?: any;
}

type SignupFormValues = {
  code: string;
  username: string;
  email: string;
  password: string;
};

const SignupForm: React.FC<ISignupForm> = inject('authorizationSt')(
  observer(({ authorizationSt }) => {
    const [activeStep, setActiveStep] = useState<number>(0);

    const {
      control,
      handleSubmit,
      trigger,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const nextStepHandler = () => {
      if (activeStep < 1) {
        trigger(['username', 'code']).then((res) => {
          if (res) {
            authorizationSt.setSignup("error", null);
            setActiveStep((prev) => prev + 1);
          }
        });
      }
    };

    const prevStepHandler = () => {
      if (activeStep > 0) {
        setActiveStep((prev) => prev - 1);
      }
    };

    const onSubmitHandler: SubmitHandler<SignupFormValues> = (data) => {
      trigger().then((res) => {
        if (res) {
          authorizationSt.clickRegistrationButton(data);
        }
      });
    };

    return (
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmitHandler)}
        justifyContent="space-between"
        height="100%"
        position="relative"
      >
        {activeStep === 0 && (
          <StepOneForm control={control} errors={errors} nextStepHandler={nextStepHandler} />
        )}
        {activeStep === 1 && (
          <StepTwoForm control={control} errors={errors} prevStepHandler={prevStepHandler} />
        )}
      </Stack>
    );
  }),
);

export default SignupForm;
