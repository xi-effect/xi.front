import Head from "next/head";
import { useRouter } from "next/router";
import { Stack, useMediaQuery, Paper, Typography, Button } from "@mui/material";
import React from "react";
import { inject, observer } from "mobx-react";

import XiLogo from "../../../kit/XiLogo.tsx";

const InviteCommunity = inject()(
  observer(() => {
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

    const router = useRouter();

    const { id } = router.query;

    return (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "background.main",
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
              zIndex: 500,
              height: mobile ? "auto" : "300px",
              mb: "20px",
              ml: mobile ? "16px" : "0px",
              mr: mobile ? "16px" : "0px",
              bgcolor: "grey.800",
              borderRadius: "20px",
              maxWidth: "400px",
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{ width: "100%", height: "100%", p: 2 }}
            >
              <Typography
                component="div"
                variant="OpenSans500MainLabel"
                sx={{
                  fontFamily: "Open Sans, sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "25px",
                  color: "text.primary",
                  textAlign: "center",
                  p: 2,
                  fontSize: {
                    xs: "20px",
                    sm: "18px",
                    md: "20px",
                    lg: "22px",
                  },
                }}
              >
                Наименования сообщества
              </Typography>

              <Button
                variant="outlined"
                size="large"
                type="submit"
                sx={{
                  "&.MuiButton-root": {
                    fontFamily: "Open Sans, sans-serif",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "25px",
                    height: mobile ? "40px" : "50px",
                    color: "text.primary",
                    bgcolor: "secondary.main",
                    borderRadius: mobile ? "62px" : "88px",
                    "&:hover": {
                      bgcolor: "secondary.main",
                    },
                    mt: 2,
                    boxShadow: 12,
                    marginTop: "2%",
                  },
                }}
                onClick={() => {
                  router.push({
                    pathname: `https://xieffect.ru/invite/community/${id}/`,
                  });
                }}
              >
                <Typography component="p">Вступить в сообщество</Typography>
              </Button>
            </Stack>
          </Paper>

          <div />
        </Stack>
      </>
    );
  })
);

export default InviteCommunity;
