import React from 'react';
import H1 from 'components/ContentEditor/Blocks/H1';
import H2 from 'components/ContentEditor/Blocks/H2';
import Text from 'components/ContentEditor/Blocks/Text';
import DividerComp from 'components/ContentEditor/Blocks/DividerComp';
import Quote from 'components/ContentEditor/Blocks/Quote';
import H3 from 'components/ContentEditor/Blocks/H3';
import { RenderElementProps } from 'slate-react';
import { Type } from 'kit/Editor/common/withListsPlugin';
import { CreationMenuConfigT } from 'kit/Editor/common/menuConfig';
import Ol from '../Blocks/Ol';
import ListItem from '../Blocks/ListItem';
import Ul from '../Blocks/Ul';

export type ResultBlockT = RenderElementProps & { element: CreationMenuConfigT };

const ResultBlock: React.FC<ResultBlockT> = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case Type.H1:
      return <H1>{children}</H1>;

    case Type.H2:
      return <H2>{children}</H2>;

    case Type.H3:
      return <H3>{children}</H3>;

    case Type.QUOTE:
      return <Quote>{children}</Quote>;

    case Type.DIVIDER:
      return <DividerComp />;

    case Type.ORDERED_LIST:
      return <Ol>{children}</Ol>;

    case Type.UNORDERED_LIST:
      return <Ul>{children}</Ul>;

    case Type.LIST_ITEM:
      return <ListItem>{children}</ListItem>;

    case Type.LIST_ITEM_TEXT:
      return <div {...attributes}>{children}</div>;

    default:
      return <Text attributes={attributes}>{children}</Text>;
  }
};
export default ResultBlock;
