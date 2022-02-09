/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import Popper, { PopperProps } from '@mui/material/Popper';
import { Paper, Stack, Fade, Typography, Button, ClickAwayListener } from '@mui/material';
// import "./TextEditor.scss";
import FormatBoldIcon from '@mui/icons-material/FormatBold';

export type InlineToolPanelProps = {
  className?: string;
};

const InlineToolPanel: React.FC<InlineToolPanelProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<PopperProps['anchorEl']>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    console.log('selection', selection);
    if (selection) {
      if (!selection || selection.anchorOffset === selection.focusOffset) {
        handleClose();
        return;
      }
      // if (selection && selection.rangeCount > 0) {
      // Resets when the selection has a length of 0

      const getBoundingClientRect = () => {
        if (selection && selection.rangeCount >= 1) return selection.getRangeAt(0).getBoundingClientRect();
        return null;
      } 
      console.log('selection1', selection);
      setOpen(true);
      setAnchorEl({
        getBoundingClientRect,
      });
    }
    // }
  };

  const id = open ? 'virtual-element-popper' : undefined;

  return (
    <div onMouseLeave={handleClose}>
      <Typography aria-describedby={id} onMouseUp={handleMouseUp}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus, bibendum sit
        amet vulputate eget, porta semper ligula. Donec bibendum vulputate erat, ac fringilla mi
        finibus nec. Donec ac dolor sed dolor porttitor blandit vel vel purus. Fusce vel malesuada
        ligula. Nam quis vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis
        finibus massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit amet
        facilisis neque enim sed neque. Quisque accumsan metus vel maximus consequat. Suspendisse
        lacinia tellus a libero volutpat maximus.
      </Typography>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement="top-start"
        modifiers={[
          {
            name: 'offset',
            enabled: true,
            options: {
              offset: [-40, 10],
            },
          },
        ]}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              sx={{
                bgcolor: 'primary.main',
              }}>
              <Stack direction="row" justifyContent="flex-start" alignItems="center">
                {[...Array(5)].map((item, index) => (
                  <Button key={index.toString()}>
                    <FormatBoldIcon sx={{ color: 'text.primary' }} />
                  </Button>
                ))}
              </Stack>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};

export default InlineToolPanel;
