/* eslint-disable react/jsx-no-bind */

import React, { KeyboardEvent, MouseEvent } from 'react';
import { observer } from 'mobx-react';

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

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CloseIcon from '@mui/icons-material/Close';

import CommunityMenu from 'kit/CommunityMenu';
import { useStore } from 'store/connect';

const Community = observer(() => {
  const rootStore = useStore();
  const { communitySt } = rootStore;

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

  const handleClose = (
    event:
      | MouseEvent<HTMLAnchorElement>
      | MouseEvent<HTMLLIElement>
      | globalThis.MouseEvent
      | TouchEvent,
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

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
        borderBottom: '1px solid #ECEFFF',
        borderRadius: '8px',
        p: 1,
        bgcolor: open ? 'primary.light' : 'grayscale.0',
        '&:hover': {
          bgcolor: open ? 'primary.light' : 'grayscale.0',
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
          {!open && <KeyboardArrowDownIcon />}
          {open && <CloseIcon />}
        </IconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        sx={{
          height: 356,
          width: 228,
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
            <Paper
              sx={{
                position: 'absolute',
                left: 4,
                top: 12,
                width: 228,
                boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                bgcolor: 'primary.pale',
              }}
            >
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
});

export default Community;
