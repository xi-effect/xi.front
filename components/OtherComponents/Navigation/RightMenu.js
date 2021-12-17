/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";

import { Button, Box, useMediaQuery, ClickAwayListener, Divider, MenuList, MenuItem, ListItemText, ListItemIcon, Tooltip, Popper, IconButton, Link, Paper, useTheme, Stack, Typography, Grow } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReportIcon from '@mui/icons-material/Report';
import CustomAvatar from '../Avatar/CustomAvatar'

import KnowledgeСreatePage from "./RightMenu/KnowledgeСreatePage";
import KnowledgeСreateModule from "./RightMenu/KnowledgeСreateModule";
import KnowledgeСreatePageMap from "./RightMenu/KnowledgeСreatePageMap";
import KnowledgeСreateModuleMap from "./RightMenu/KnowledgeСreateModuleMap";
import KnowledgeModuleTools from "./RightMenu/KnowledgeModuleTools";
import KnowledgePageTools from "./RightMenu/KnowledgePageTools";
import KnowledgePagesTools from "./RightMenu/KnowledgePagesTools";
import KnowledgeModulesTools from "./RightMenu/KnowledgeModulesTools";
import KnowledgeModuleMap from "./RightMenu/KnowledgeModuleMap";
import KnowledgeModulesFilters from "./RightMenu/KnowledgeModulesFilters";



import { motion, AnimatePresence } from "framer-motion"
import ReportDialog from "./RightMenu/ReportDialog";



const RightMenu = inject(
  "rootStore",
  "knowledgeStore",
  "settingsStore",
)(
  observer(({ rootStore, knowledgeStore, settingsStore }) => {
    const router = useRouter();
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"))

    const sidebar = {
      open: {
        height: mobile ? '300px' : '200px',
        transition: {
          type: "tween",
          stiffness: 20,
          restDelta: 2
        }
      },
      closed: {
        height: '72px',
        transition: {
          delay: 0.5,
          type: "tween",
          stiffness: 400,
          damping: 40
        }
      }
    };

    const variantsCont = {
      open: {
        transition: {
          staggerChildren: 0.07, delayChildren: 0.2
        }
      },
      closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
      }
    };

    const variantsChild = {
      open: {
        y: 0,
        opacity: 1,
        transition: {
          
        }
      },
      closed: {
        y: -10,
        opacity: 0,
        transition: {
          duration: 0.2,
          y: { stiffness: 1000 }
        }
      }
    };

    const goNext = () => {
      if (!router.pathname.includes('/knowledge/module/results')) {
        knowledgeStore.loadPageInModule(
          knowledgeStore.module.activeIdInMap + 1
        )
      }
      if (router.pathname.includes('/knowledge/module/results')) {
        console.log("r", knowledgeStore.moduleCompleted.results)
        let indx = knowledgeStore.moduleCompleted.results.findIndex((item, index) => {
          console.log(item, knowledgeStore.page.id)
          if (item["page-id"] == knowledgeStore.page.id) return true
        })
        console.log("indx", indx)
        if (indx + 1 === knowledgeStore.moduleCompleted.results.length) return knowledgeStore.uploadPageForResults(knowledgeStore.moduleCompleted.results[0]["page-id"], 0)
        indx += 1
        return knowledgeStore.uploadPageForResults(knowledgeStore.moduleCompleted.results[indx]["page-id"], indx)
      }
    }


    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);


    return (
      <Paper
        elevation={12}
        sx={{
          position: "absolute",
          zIndex: 20,
          top: 0,
          right: 0,
          height: '100vh',
          width: '256px',
          pb: mobile ? 10 : 2,
          pt: 0,
          bgcolor: 'primary.dark',
        }}
      >
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
          sx={{
            height: '100%',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              width: '232px',
              mt: 1.5,
              bgcolor: 'secondary.dark',
              borderRadius: 2,
            }}
            component={motion.div}
            initial={false}
            animate={open ? "open" : "closed"}
            variants={sidebar}
          >
            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={0}
            >
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={1}
                onClick={() => setOpen(!open)}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                <Box
                  sx={{ height: 64, width: 64, m: 1, mt: "-2px", mr: 1, cursor: 'pointer' }}
                >
                  <CustomAvatar avatar={{ ...settingsStore.settings.avatar, bgcolor: 'rgba(0,0,0,0)' }} viewBox={{ x: '50', y: '-110', width: '690', height: '790' }} reverse={true} />
                </Box>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="flex-start"
                  spacing={0}
                  sx={{
                    pt: 1
                  }}
                >
                  <Typography variant="h6" sx={{ mt: 0, ml: 0, mr: 0 }}>
                    {settingsStore.settings.username}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 0, ml: 0, mr: 0 }}>
                    {'Иванов Иван'}
                  </Typography>
                </Stack>
              </Stack>
              <Divider
                component={motion.hr}
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{ opacity: 0, }}
                transition={{ duration: 1 }}
                sx={{
                  bgcolor: 'primary.dark',
                  height: '4px',
                  borderRadius: '2px',
                  width: 'calc(100% - 8px)',
                  mt: "2px",
                  ml: 0.5,
                  mr: 0.5,
                }}
              />
              <MenuList
                variants={variantsCont}
                component={motion.ul}
                sx={{
                  width: '100%',
                }}
              >
                <MenuItem disabled={!open} component={motion.li} variants={variantsChild} sx={{ cursor: 'pointer' }} onClick={() => {
                  router.push(`/profile/${settingsStore.settings.id}/`)
                }}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Профиль
                  </ListItemText>
                </MenuItem>
                <MenuItem disabled={!open} component={motion.li} variants={variantsChild} sx={{ cursor: 'pointer' }} onClick={() => {
                  setOpenDialog(true)
                }}>
                  <ListItemIcon>
                    <ReportIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Оставить отзыв
                  </ListItemText>
                </MenuItem>
                <MenuItem disabled={!open} component={motion.li} variants={variantsChild} sx={{ '& .MuiMenuItem-root': { cursor: 'pointer' } }} onClick={() => {
                  settingsStore.logout()
                }}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: 'error.main' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>
                    Выйти
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Stack>
          </Paper>
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            // spacing={12}
            sx={{ height: '100%', width: '100%', zIndex: 100, }}
          >
            <Stack sx={{ height: '100%', width: '100%', mt: 1, mb: 'auto' }}>
              {router.pathname.includes('/knowledge/createpage') && <KnowledgeСreatePageMap />}
              {router.pathname.includes('/knowledge/createmodule') && <KnowledgeСreateModuleMap />}
              {router.pathname.includes('/knowledge/modules') && <KnowledgeModulesFilters />}
              {!knowledgeStore.moduleCompleted.isFinished && knowledgeStore.module["map"] != undefined && knowledgeStore.module["map"].length != 0 && router.pathname.includes('/knowledge/module/') && <KnowledgeModuleMap goNext={goNext} />}
            </Stack>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{ mt: 'auto', pb: 2 }}
            >
              {router.pathname.includes('/knowledge/module/') && <KnowledgeModuleTools goNext={goNext} />}
              {router.pathname.includes('/knowledge/page/') && <KnowledgePageTools />}
              {router.pathname === '/knowledge/pages' && <KnowledgePagesTools />}
              {router.pathname === '/knowledge/modules' && <KnowledgeModulesTools />}
              {router.pathname.includes('/knowledge/createpage') && <KnowledgeСreatePage />}
              {router.pathname.includes('/knowledge/createmodule') && <KnowledgeСreateModule />}

            </Stack>
          </Stack>
          {/* {router.pathname.includes('/knowledge/createmodule') && <KnowledgeСreateModule />} */}

          <ReportDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </Stack >
      </Paper >
    );
  })
);

export default RightMenu;
