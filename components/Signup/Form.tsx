/* eslint-disable no-unused-vars */
import React from 'react';
import { inject, observer } from 'mobx-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Stack } from '@mui/material';
import AuthorizationSt from 'store/user/authorizationSt';
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
  authorizationSt: AuthorizationSt;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

type SignupFormValues = {
  code: string;
  username: string;
  email: string;
  password: string;
};

const Form = inject('authorizationSt')(
  observer((props) => {
    const { authorizationSt, activeStep, setActiveStep }: ISignupForm = props;

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
            authorizationSt.setSignup('error', null);
            setActiveStep((prev: number) => prev + 1);
          }
        });
      }
    };

    const prevStepHandler = () => {
      if (activeStep > 0) {
        setActiveStep((prev: number) => prev - 1);
      }
    };

    const onSubmitHandler: SubmitHandler<SignupFormValues> = (data) => {
      trigger();
      if (Object.keys(errors).length === 0) {
        authorizationSt.clickRegistrationButton(data);
      }
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

export default Form;
