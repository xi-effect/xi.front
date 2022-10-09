import React from 'react';
import { Descendant } from 'slate';
import { Editable, ReactEditor, RenderLeafProps, Slate } from 'slate-react';
import InlineToolPanel, { toggleFormat } from 'components/ContentEditor/Menus/InlineToolPanel';
import Leaf from 'components/ContentEditor/Editor/Leaf';
import ResultBlock, { ResultBlockT } from 'components/ContentEditor/Editor/ResultBlock';
import { slateExample } from 'kit/Editor/common/menuConfig';
import { Stack } from '@mui/material';
import { Type } from 'kit/Editor/common/withListsPlugin';

type SlateSampleT = {
  type: Type;
  editor: ReactEditor;
};

const SlateSample: React.FC<SlateSampleT> = ({ editor, type }) => {
  const [slateValue, setSlateValue] = React.useState<Descendant[]>(slateExample(type));

  const renderElement = (props: ResultBlockT) => <ResultBlock {...props} />;

  const renderLeaf = (props: RenderLeafProps) => <Leaf {...props} />;

  const onDOMBeforeInput = (event: InputEvent) => {
    switch (event.inputType) {
      case 'formatBold':
        return toggleFormat(editor, 'bold');
      case 'formatItalic':
        return toggleFormat(editor, 'italic');
      case 'formatUnderline':
        return toggleFormat(editor, 'underlined');
      case 'formatStrike':
        return toggleFormat(editor, 'strike');
      case 'formatCode':
        return toggleFormat(editor, 'code');
      default:
        break;
    }

    return null;
  };

  const onChange = (value) => setSlateValue(value);

  return (
    <Slate editor={editor} value={slateValue} onChange={onChange}>
      <InlineToolPanel />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          width: '100%',
          height: '100%',
          p: '5px 10px',
        }}
      >
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onDOMBeforeInput={onDOMBeforeInput}
          placeholder="Введите некоторый текст..."
        />
      </Stack>
    </Slate>
  );
};

export default SlateSample;
