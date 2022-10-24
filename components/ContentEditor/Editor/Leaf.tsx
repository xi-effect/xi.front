/* eslint-disable no-param-reassign */
import React from 'react';
import { css } from '@emotion/css';
import { RenderLeafProps } from 'slate-react';

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  Object.keys(leaf).forEach((key) => {
    switch (key) {
      case 'bold':
        children = <strong>{children}</strong>;
        break;
      case 'italic':
        children = <em>{children}</em>;
        break;
      case 'underlined':
        children = <u>{children}</u>;
        break;
      case 'strike':
        children = <s>{children}</s>;
        break;
      case 'code':
        children = (
          <code
            className={css`
              background-color: #333;
              padding: 0.25em 0.5em;
              border-radius: 0.25em;
            `}
          >
            {children}
          </code>
        );
        break;
      default:
        break;
    }
  });
  return <span {...attributes}>{children}</span>;
};

export default Leaf;
