/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Picker, PickerProps, EmojiData } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

interface EmojiPickerProps extends PickerProps {
  onSelect: (emoji: EmojiData) => void;
}

function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return <Picker theme="auto" set="twitter" onSelect={onSelect} />;
}

export default React.memo<EmojiPickerProps>(EmojiPicker);
