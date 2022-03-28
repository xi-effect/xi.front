/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from 'react';
import styled from '@emotion/styled';
import { menuSelector } from '@szhsin/react-menu/style-utils';
// import { EmojiData } from 'emoji-mart';
import { ControlledMenu as ControlledMenuInner, useMenuState } from '@szhsin/react-menu';
import { Paper, Stack, Button, Tooltip, Menu } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import '@szhsin/react-menu/dist/index.css';
import { inject, observer } from 'mobx-react';
import { INLINE_STYLES } from '../config';
import EmojiPicker from '../Menus/EmojiPicker';

const ControlledMenu = styled(ControlledMenuInner)`
  ${menuSelector.name} {
    background-color: transparent;
  }
`;

const StyleButton = ({
  label,
  active,
  style,
  component,
  onToggle,
}: {
  label: string;
  active: boolean;
  style: string;
  component: JSX.Element;
  onToggle: (type: string) => void;
}) => {
  const handleToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    onToggle(style);
  };

  return (
    <Tooltip title={label} placement="top">
      <Button
        sx={{
          color: active ? 'text.primary' : 'text.secondary',
          minWidth: 16,
          bgcolor: active ? 'primary.light' : 'primary.dark',
          borderRadius: 0,
        }}
        size="large"
        onMouseDown={handleToggle}>
        {component}
      </Button>
    </Tooltip>
  );
};

export type InlineToolPanelProps = {
  contentEditorSt?: any;
  editorRef?: any;
};

const InlineToolPanel: React.FC<InlineToolPanelProps> = inject('contentEditorSt')(
  observer((props) => {
    const { contentEditorSt } = props;

    const currentStyle = contentEditorSt.editorState.getCurrentInlineStyle();

    const [emojiPickerEl, setEmojiPickerEl] = React.useState<HTMLButtonElement | null>(null);

    const handleEmojiPickerClose = () => {
      setEmojiPickerEl(null);
    };

    const openEmojiPicker = Boolean(emojiPickerEl);

    const handleClickEmojiPicker = (event: React.MouseEvent) => {
      event.preventDefault();
      setEmojiPickerEl(
        emojiPickerEl === null
          ? {
              // @ts-ignore
              mouseX: event.clientX - 2,
              mouseY: event.clientY - 4,
            }
          : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
            // Other native context menus might behave different.
            // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
            null,
      );
    };

    const [menuProps] = useMenuState();

    return (
      <ControlledMenu
        {...menuProps}
        state={contentEditorSt.editorMeta.anchorPoint.x !== 0 ? 'open' : 'closed'}
        anchorPoint={contentEditorSt.editorMeta.anchorPoint}
        onClose={() => contentEditorSt.setEditorMeta('anchorPoint', { x: 0, y: 0 })}>
        <Paper
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 0,
            // width: 300,
            // height: 36,
          }}>
          <Stack direction="row" justifyContent="flex-start" alignItems="center">
            {INLINE_STYLES.map((type) => (
              <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                component={type.component}
                onToggle={contentEditorSt.handleToggleInlineStyleType}
                style={type.style}
              />
            ))}
            <Tooltip title="Emoji">
              <Button
                sx={{
                  color: 'text.primary',
                  minWidth: 16,
                  bgcolor: 'primary.dark',
                  borderRadius: 0,
                }}
                size="large"
                onClick={handleClickEmojiPicker}>
                <EmojiEmotionsIcon />
              </Button>
            </Tooltip>
            <Menu
              open={openEmojiPicker}
              onClose={handleEmojiPickerClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              anchorReference="anchorPosition"
              anchorPosition={
                emojiPickerEl !== null
                  ? // @ts-ignore
                    { top: emojiPickerEl.mouseY - 40, left: emojiPickerEl.mouseX + 8 }
                  : undefined
              }
              MenuListProps={{
                style: {
                  paddingBottom: 0,
                  paddingTop: 0,
                },
              }}>
              <EmojiPicker onSelect={contentEditorSt.handleAddEmoji} />
            </Menu>
          </Stack>
        </Paper>
      </ControlledMenu>
    );
  }),
);

export default React.memo<InlineToolPanelProps>(InlineToolPanel);
