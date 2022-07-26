import * as React from "react";
import Head from "next/head";
import Image from "next/image";

import { Stack, Paper, Typography, useMediaQuery } from "@mui/material";
import { inject, observer } from "mobx-react";

import XiLogo from "kit/XiLogo";

const Email = inject("rootStore")(
  observer(({ rootStore }) => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const [ok, setOk] = React.useState(null);

    React.useEffect(() => {
      const id = rootStore
        .fetchData(`${rootStore.url}/email-confirm/${id}/`, "POST")
        .then((data) => {
          if (data.a === "Success") {
            setOk(true);
          }
          if (data.a === "Invalid code") {
            setOk(false);
          }
        });
    }, []);

    return (
      <>
        <Head>
          <title>Ξ Подтверждение почты</title>
        </Head>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "background.main", // Цвета есть в файле theme.js и в дефолтной теме в MUI
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              height: mobile ? "100px" : "140px",
              p: mobile ? "20px" : "40px",
              width: "100%",
            }}
          >
            <XiLogo />
          </Stack>
          <Paper
            elevation={24}
            sx={{
              zIndex: 10,
              width: "calc(100% - 32px)",
              maxWidth: 512,
              mt: 0,
              bgcolor: "grey.800",
              borderRadius: "20px",
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{ width: "100%", p: 2 }}
            >
              <Image
                alt="alt"
                src="/assets/app/ConfirmedEmail.svg"
                quality={100}
                width={456}
                height={456}
              />
              <Typography variant="h4" sx={{ fontWeight: "normal" }}>
                Подтверждение почты
              </Typography>
              {ok && (
                <Typography
                  sx={{ textAlign: "center", fontSize: "20px", mt: 2 }}
                >
                  Ваша почта успешно подтверждена. <br /> С этой страницы можно
                  уходить.
                </Typography>
              )}
              {ok === false && (
                <Typography
                  sx={{ textAlign: "center", fontSize: "20px", mt: 2 }}
                >
                  Что-то пошло не так
                </Typography>
              )}
            </Stack>
          </Paper>
          <div />
        </Stack>
      </>
    );
  })
);

export default Email;
