/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable react/prefer-exact-props */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useRef, useEffect, Ref, PropsWithChildren } from 'react';
import { useSlate, useFocused } from 'slate-react';
import { Editor, Range } from 'slate';
import ReactDOM from 'react-dom';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
// @ts-ignore
import { cx, css } from '@emotion/css';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => (
    <span
      {...props}
      // @ts-ignore
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed ? (active ? 'white' : '#aaa') : active ? 'black' : '#ccc'};
        `,
      )}
    />
  ),
);

const Menu = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
    <div
      {...props}
      // @ts-ignore
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 8px;
          }
        `,
      )}
    />
  ),
);

const Portal = ({ children }) =>
  typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    if (domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = '1';
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
    }
  });

  return (
    <Portal>
      <Menu
        // @ts-ignore
        ref={ref}
        className={css`
          padding: 8px 7px 2px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: 0px;
          opacity: 0;
          background-color: #757575;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}>
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
      </Menu>
    </Portal>
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: 'all',
  });
  return !!match;
};

export const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const FormatButton = ({ format, icon }) => {
  const editor = useSlate();
  const active = isFormatActive(editor, format);
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onClick={() => toggleFormat(editor, format)}>
      {icon === 'format_bold' && (
        <FormatBoldIcon sx={{ color: active ? 'secondary.main' : 'text.main' }} />
      )}
      {icon === 'format_italic' && (
        <FormatItalicIcon sx={{ color: active ? 'secondary.main' : 'text.main' }} />
      )}
      {icon === 'format_underlined' && (
        <FormatUnderlinedIcon sx={{ color: active ? 'secondary.main' : 'text.main' }} />
      )}
    </Button>
  );
};

export default HoveringToolbar;
