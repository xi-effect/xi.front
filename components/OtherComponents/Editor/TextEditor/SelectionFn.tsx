/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { SelectionHOCProps } from '../types';
import H1 from '../Blocks/H1';
import Text from '../Blocks/Text';
import Block from '../ContentEditor/Block';

// eslint-disable-next-line react/function-component-definition
const SelectionHOC: React.FC<SelectionHOCProps> = ({ props }) => {
  const { blockProps } = props;
  // console.log('SelectionHOC', props);
  switch (blockProps?.type) {
    case 'unstyled':
      return <Text props={props} />;
    case 'h1':
      return <H1 props={props} />;
    default:
      return null;
  }
};

const WrapperHOC: React.FC<SelectionHOCProps> = (props) => (
  <Block propsBlock={props}>
    <SelectionHOC props={props} />
  </Block>
);

const SelectionFn = (contentBlock: { getType: () => any }) => {
  const type = contentBlock.getType();
  // console.log('contentBlock', contentBlock);
  return {
    // @ts-ignore
    component: WrapperHOC,
    editable: true,
    props: {
      type,
    },
  };
};

export default SelectionFn;
