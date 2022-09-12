/* eslint-disable react/jsx-no-bind */

import React from 'react';
import { inject, observer } from 'mobx-react';

import {
  Box,
  Typography,
  Stack,
  Tooltip,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from '@mui/material';

import { AnimatePresence, motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CloseIcon from '@mui/icons-material/Close';

import CommunityMenu from 'kit/CommunityMenu';

type CommunityT = {
  communitySt?: any;
};

const Community = inject('communitySt')(
  observer(({ communitySt }: CommunityT) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      // @ts-irnore
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (anchorRef && anchorRef.current && prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);

    return (
      <Stack
        onClick={handleToggle}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          p: 1,
          '&:hover': {
            bgcolor: 'action.hover',
            cursor: 'pointer',
          },
        }}
      >
        <Typography
          noWrap
          sx={{
            fontWeight: 500,
            fontSize: 18,
            lineHeight: '22px',
          }}
        >
          {communitySt.meta.name || 'Тестовое сообщество'}
        </Typography>
        <Tooltip arrow title="Меню сообщества">
          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            sx={{
              height: 36,
              width: 36,
            }}
          >
            <AnimatePresence initial={false} exitBeforeEnter>
              {!open && (
                <Stack
                  key="arrow"
                  component={motion.div}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <KeyboardArrowDownIcon />
                </Stack>
              )}
              {open && (
                <Stack
                  key="close"
                  component={motion.div}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CloseIcon />
                </Stack>
              )}
            </AnimatePresence>
          </IconButton>
        </Tooltip>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          transition
          sx={{
            height: 356,
            width: 248,
            left: 0,
            zIndex: 10000,
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={{ position: 'absolute', left: 4, top: 4, width: 248 }}>
                <ClickAwayListener onClickAway={handleClose}>
                  <Box>
                    <CommunityMenu
                      open={open}
                      setOpen={setOpen}
                      handleListKeyDown={handleListKeyDown}
                      handleClose={handleClose}
                    />
                  </Box>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>
    );
  }),
);

export default Community;
