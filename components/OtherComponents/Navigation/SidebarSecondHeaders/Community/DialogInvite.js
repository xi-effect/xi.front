import React from "react";
import { inject, observer } from "mobx-react";
import InputAdornment from "@mui/material/InputAdornment";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import {
  Typography,
  Tab,
  Tabs,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Input,
  Dialog,
  DialogContent,
  Stack,
  Tooltip,
  IconButton,
  useMediaQuery,
  TextField,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import UndoIcon from "@mui/icons-material/Undo";
import QRCode from "react-qr-code";
import { useCopyToClipboard } from "react-use";

const DialogInvite = inject()(
  observer(
    ({ openDialogInvite, setOpenDialogInvite }) => {
      const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
      const [step, setStep] = React.useState(0);
      const [statusCopy, setStatusCopy] = React.useState(false);
      // eslint-disable-next-line no-unused-vars
      const [state, copyToClipboard] = useCopyToClipboard();
      const urlInvite = `https://xieffect.ru/invite/community/${123}`;

      const [value, setValue] = React.useState(0);
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      return (
        <Dialog
          fullScreen={fullScreen}
          open={openDialogInvite ?? false}
          onClose={() => setOpenDialogInvite(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: 64,
              width: "100%",
              p: 1,
            }}
          >
            <Typography sx={{ mt: 2, ml: 2, mr: "auto" }} variant="h5">
              Создать приглашение в сообщество
            </Typography>
            <Tooltip title="Назад">
              <span>
                <IconButton
                  sx={{ color: "text.secondary", ml: "auto", mt: 2, mr: 1 }}
                >
                  <UndoIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Закрыть">
              <IconButton
                sx={{ color: "text.secondary", ml: 1, mt: 2, mr: 1 }}
                onClick={() => setOpenDialogInvite(false)}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <DialogContent>
            {step === 0 && (
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                  height: 660,
                  width: "100%",
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    mt: 0,
                    pl: 1,
                    pr: 1,
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    <Typography sx={{ color: "text.primary" }}>
                      Лимит использования приглашения
                    </Typography>
                  </InputLabel>
                  <Input
                    sx={{ width: "100%" }}
                    label="Лимит использования приглашения"
                    type="text"
                  />
                </FormControl>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    p: 2,
                    width: "100%",
                  }}
                >
                  {[1, 5, 15, 30, 100, "Без лимита"].map((item, index) => (
                    <Chip
                      clickable
                      key={index.toString()}
                      onClick={null}
                      variant="filled"
                      label={item}
                    />
                  ))}
                </Stack>
                <FormControl
                  fullWidth
                  sx={{
                    mt: 1,
                    pl: 1,
                    pr: 1,
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    <Typography sx={{ color: "text.primary" }}>
                      Время действия приглашения
                    </Typography>
                  </InputLabel>
                  <Input
                    sx={{ width: "100%" }}
                    label="Время действия приглашения"
                    type="text"
                  />
                </FormControl>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    p: 2,
                    width: "100%",
                  }}
                >
                  {["1 день", "3 дня", "1 месяц", "Без ограничений"].map(
                    (item, index) => (
                      <Chip
                        clickable
                        key={index.toString()}
                        onClick={null}
                        variant="filled"
                        label={item}
                      />
                    )
                  )}
                </Stack>
                <Typography
                  sx={{
                    pt: 2,
                    pl: 2,
                    width: "100%",
                  }}
                >
                  Роль пользователя, которого вы приглашаете:
                </Typography>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={1}
                  sx={{
                    p: 2,
                    width: "100%",
                  }}
                >
                  {["Администратор", "Модератор", "Учитель", "Ученик"].map(
                    (item, index) => (
                      <Chip
                        clickable
                        key={index.toString()}
                        onClick={null}
                        variant="filled"
                        label={item}
                      />
                    )
                  )}
                </Stack>
                <Button
                  onClick={() => setStep(1)}
                  sx={{
                    "&.MuiButton-root": {
                      fontFamily: "Open Sans, sans-serif",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "25px",
                      boxShadow: 6,
                      width: "280px",
                      height: "48px",
                      color: "text.primary",
                      bgcolor: "secondary.main",
                      borderRadius: "88px",
                      "&:hover": {
                        bgcolor: "secondary.main",
                      },
                      mt: "auto",
                    },
                  }}
                >
                  Создать приглашение
                </Button>
              </Stack>
            )}
            {step === 1 && (
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                sx={{
                  height: 660,
                  width: "100%",
                }}
              >
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  sx={{
                    height: 600,
                    width: 600,
                  }}
                >
                  <Alert
                    severity="warning"
                    sx={{
                      fontFamily: "Open Sans, sans-serif",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "25px",
                      color: "text.primary",
                      bgcolor: "secondary.main",
                      width: "100%",
                      mb: "20px",
                    }}
                  >
                    Передавать ссылку третьим лицам запрещено
                  </Alert>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs invite"
                    sx={{ mb: "20px" }}
                  >
                    <Tab label="Link" id="Link" aria-controls="Link" />
                    <Tab
                      label="QR-code"
                      id="QR-code"
                      aria-controls="QR-code"
                    />
                  </Tabs>

                  {value === 0 ? (
                    <Tooltip
                      sx={{ ml: "10px", mr: "10px", width: "100%" }}
                      title={
                        statusCopy
                          ? "Ссылка успешно скопирована в буфер обмена!"
                          : "Кликните чтобы скопировать ссылку"
                      }
                    >
                      <TextField
                        id="invite-code"
                        label="Код-приглашения"
                        defaultValue={urlInvite}
                        onClick={() => {
                          copyToClipboard(urlInvite);
                          setStatusCopy(true);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Button sx={{ color: "text.primary" }}>
                                <ContentCopyIcon />
                              </Button>
                            </InputAdornment>
                          ),
                          readOnly: true,
                          style: {
                            cursor: "pointer",
                            width: "100%",
                          },
                        }}
                      />
                    </Tooltip>
                  ) : (
                    <QRCode size={512} value={urlInvite} />
                  )}
                </Stack>
                <Button
                  onClick={() => setStep(0)}
                  sx={{
                    "&.MuiButton-root": {
                      fontFamily: "Open Sans, sans-serif",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "18px",
                      lineHeight: "25px",
                      boxShadow: 6,
                      width: "280px",
                      height: "48px",
                      color: "text.primary",
                      bgcolor: "secondary.main",
                      borderRadius: "88px",
                      "&:hover": {
                        bgcolor: "secondary.main",
                      },
                      mt: "auto",
                    },
                  }}
                >
                  Вернуться к настройкам
                </Button>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
      );
    }
  )
);

export default DialogInvite;
