import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  Button,
  useMediaQuery,
  Box,
  Stack,
  Tooltip,
  useTheme,
  Typography,
  AccordionDetails,
  Grid,
  IconButton,
} from "@mui/material";
import { inject, observer } from "mobx-react";

import SaveIcon from "@mui/icons-material/Save";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";

import NavigationAll from "../../components/OtherComponents/Navigation/NavigationAll";
import CustomAvatar from "../../components/OtherComponents/Avatar/CustomAvatar";

import Secure from "./../../components/PagesComponents/Settings/Secure";

import { useSnackbar } from 'notistack';

const Invite = dynamic(() =>
  import("./../../components/PagesComponents/Settings/Invite")
);

const Customize = dynamic(() =>
  import("./../../components/PagesComponents/Settings/Customize")
);

const UserAvatar = dynamic(() =>
  import("../../components/PagesComponents/Settings/UserAvatar")
);

const Settings = inject(
  "rootStore",
  "settingsStore",
  "messageStore"
)(
  observer(({ rootStore, settingsStore, messageStore }) => {
    const theme = useTheme()
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("xl"))
    const router = useRouter()

    React.useEffect(() => {
      rootStore
        .fetchDataScr(`${rootStore.url}/settings/main/`, "GET")
        .then((data) => {
          if (data) {
            console.log("settings/main", data)
            settingsStore.setSettings("darkTheme", data["dark-theme"])
            settingsStore.setSettings("id", data.id)
            settingsStore.setSettings("username", data.username)
          }
        });
      rootStore
        .fetchDataScr(`${rootStore.url}/settings/`, "GET")
        .then((data) => {
          if (data) {
            console.log("settings", data);
            let emailArr = data.email.split("@", 2)
            settingsStore.setSettings("emailBefore", emailArr[0])
            settingsStore.setSettings("emailAfter", "@" + emailArr[1])
            settingsStore.setSettings("emailConfirmed", data["email-confirmed"])
            settingsStore.setSettings("avatar", data["avatar"])
            settingsStore.setSettings("invite", data.code)
          }
        });
    }, []);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    React.useEffect(() => {
      console.log("query", router.query)
      if (router.query.option) setExpanded(router.query.option)
    }, [router.query])

    return (
      <>
        <Head>
          <title>Ξffect</title>
        </Head>
        <NavigationAll>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                paddingLeft: 1,
                paddingRight: 1,
                width: "100%",
                pb: 4,
              }}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-end"
                sx={{
                  width: "100%",
                  height: 276,
                  maxWidth: 1200,
                }}
              >
                <Box sx={{ height: 290, width: 290 }}>
                  <CustomAvatar
                    avatar={{ ...settingsStore.settings.avatar, bgcolor: null }}
                    viewBox={{
                      x: "-175",
                      y: "-100",
                      width: "1256",
                      height: "1256",
                    }}
                  />
                </Box>
                {!mobile && (
                  <Button
                    sx={{ ml: "auto", mr: 1, mb: 1.2 }}
                    onClick={() => settingsStore.saveNewSettimgs()}
                    color="inherit"
                  >
                    Сохранить изменения
                  </Button>
                )}
                {mobile && (
                  <Tooltip title="Сохранить изменения">
                    <IconButton
                      sx={{ ml: "auto", mr: 1, mb: 1 }}
                      onClick={() => settingsStore.saveNewSettimgs()}
                      color="inherit"
                    >
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Выйти">
                  <IconButton
                    sx={{ m: 1 }}
                    onClick={() => settingsStore.logout()}
                    color="error"
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Grid
                sx={{
                  width: "100%",
                  maxWidth: 1200,
                }}
              >
                <Accordion
                  sx={{ width: "100%", backgroundColor: "primary.dark" }}
                  expanded={expanded === 'secure'}
                  onChange={handleChange('secure')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Безопасность</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Secure />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{ width: "100%", backgroundColor: "primary.dark" }}
                  expanded={expanded === 'useravatar'}
                  onChange={handleChange('useravatar')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Настройка Аватара</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <UserAvatar />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{ width: "100%", backgroundColor: "primary.dark" }}
                  expanded={expanded === 'castomize'}
                  onChange={handleChange('castomize')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Внешний вид приложения</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Customize />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={{ width: "100%", backgroundColor: "primary.dark" }}
                  expanded={expanded === 'invite'}
                  onChange={handleChange('invite')}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography>Приглашения</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Invite />
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Box>
        </NavigationAll>
      </>
    );
  })
);

export default Settings;
