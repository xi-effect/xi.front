/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import H1 from '../Blocks/H1';
import H2 from '../Blocks/H2';
import Text from '../Blocks/Text';
import DividerComp from '../Blocks/DividerComp';

type Props = {
  attributes: any;
  children: any;
  element: any;
};

const Element: React.FC<Props> = (props) => {
  const { attributes, children, element } = props;
  const style = { textAlign: element.align };
  const dividerStyle: Object = { userSelect: 'none', width: '100%' };
  switch (element.type) {
    // case 'block-quote':
    //   return (
    //     <blockquote style={style} {...attributes}>
    //       {children}
    //     </blockquote>
    //   );
    // case 'bulleted-list':
    //   return (
    //     <ul style={style} {...attributes}>
    //       {children}
    //     </ul>
    //   );
    case 'h1':
      return (
        <H1 style={style} attributes={attributes}>
          {children}
        </H1>
      );
    case 'h2':
      return (
        <H2 style={style} {...attributes}>
          {children}
        </H2>
      );
    case 'divider':
      return (
        <div style={dividerStyle} contentEditable={false}>
          <DividerComp />
        </div>
      );
    // case 'list-item':
    //   return (
    //     <li style={style} {...attributes}>
    //       {children}
    //     </li>
    //   );
    // case 'numbered-list':
    //   return (
    //     <ol style={style} {...attributes}>
    //       {children}
    //     </ol>
    //   );
    default:
      return (
        <Text style={style} attributes={attributes}>
          {children}
        </Text>
      );
  }
};
export default Element;
