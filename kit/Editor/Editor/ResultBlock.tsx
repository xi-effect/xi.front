import React from 'react';
import H1 from './Blocks/H1';
import H2 from './Blocks/H2';
import Text from './Blocks/Text';
import DividerComp from './Blocks/DividerComp';
import Quote from './Blocks/Quote';
import H3 from './Blocks/H3';

type Props = {
  attributes: any;
  children: any;
  element: any;
};

const ResultBlock: React.FC<Props> = (props) => {
  const { attributes, children, element } = props;

  const dividerStyle: Object = { userSelect: 'none', width: '100%' };

  console.log(element);

  switch (element.type) {
    case 'quote':
      return <Quote {...attributes}>{children}</Quote>;
    case 'h1':
      return <H1 attributes={attributes}>{children}</H1>;
    case 'h2':
      return <H2 {...attributes}>{children}</H2>;
    case 'h3':
      return <H3 {...attributes}>{children}</H3>;
    case 'divider':
      return (
        <div style={dividerStyle} contentEditable={false}>
          <DividerComp />
        </div>
      );
    default:
      return <Text attributes={attributes}>{children}</Text>;
  }
};
export default ResultBlock;
