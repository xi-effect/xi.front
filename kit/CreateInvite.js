import React from 'react';
import { Stepper, Paper, Button, Box, Step, Select, InputLabel, MenuItem, FormControl, StepLabel, StepContent, Typography } from "@mui/material";

import TextFieldCustom from "./TextFieldCustom";

const steps = [
  {
    label: 'Выберите роль',
    description: `Выбранная вами роль будет автоматически добавлена пользователю, который присоедениться по этому приглашению`,
  },
  {
    label: 'Задайте время действия',
    description:
      'Вы можете дополнительно задать время действия приглшения с момента его создания',
  },
  {
    label: 'Добавте ограничение на использование',
    description: `Вы можете дополнительно задать количетство новых участников, которые могут воспользоваться этим приглашением`,
  },
];


const CreateInvite = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [role, setRole] = React.useState(null);

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const [time, setTime] = React.useState(null);

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  const [count, setCount] = React.useState(null);

  const handleChangeCount = (event) => {
    setCount(event.target.value);
  };

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Последний шаг</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {index === 0 && <FormControl variant="filled" sx={{ mt: 2, mb: 2, minWidth: 296 }}>
                <InputLabel>Роль пользователя</InputLabel>
                <Select
                  value={role}
                  onChange={handleChangeRole}
                >
                  <MenuItem value={null}>Не назначена</MenuItem>
                  <MenuItem>Создать новую роль</MenuItem>
                </Select>
              </FormControl>}
              {index === 1 && <FormControl variant="filled" sx={{ mt: 2, mb: 2, minWidth: 296 }}>
                <InputLabel>Время действия</InputLabel>
                <Select
                  value={time}
                  onChange={handleChangeTime}
                >
                  <MenuItem value={null}>Бессрочное</MenuItem>
                  <MenuItem value={12}>12 часов</MenuItem>
                  <MenuItem value={24}>24 часа</MenuItem>
                  <MenuItem value={72}>3 дня</MenuItem>
                  <MenuItem value={168}>7 дней</MenuItem>
                  <MenuItem value={720}>30 дней</MenuItem>
                </Select>
              </FormControl>}
              {index === 2 && <FormControl variant="filled" sx={{ mt: 2, mb: 2, minWidth: 296 }}>
                <InputLabel>Количество использований</InputLabel>
                <Select
                  value={count}
                  onChange={handleChangeCount}
                >
                  <MenuItem value={null}>Без ограничений</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                </Select>
              </FormControl>}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Завершить' : 'Вперёд'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Назад
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, borderRadius: 4 }}>
          <Typography>Новое приглашение только что создано!</Typography>
          <Typography variant="subtitle2">Скопируйте ссылку ниже и отправьте её пользователю, которого хотите пригласить</Typography>
          <TextFieldCustom
            variant="filled"
            type="text"
            fullWidth
            label="Ссылка-приглашение"
          />
          <Button color="inherit" onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Создать ещё одно приглашение
          </Button>
        </Paper>
      )}
    </>
  );
};

export default CreateInvite;
