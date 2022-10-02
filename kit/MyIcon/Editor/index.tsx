import * as React from 'react';
import { Stack } from '@mui/material';
import Text from './Text';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import NumList from './NumList';
import MarkList from './MarkList';
import Quote from './Quote';
import Divider from './Divider';
import Image from './Image';
import Video from './Video';
import FileEditor from './File';
import Delete from './Delete';
import Arrow from './Arrow';

type EditorIconT = {
  name: string;
  [key: string]: any;
};

export const IconWrap: React.FC = ({ children, ...props }) => (
  <Stack
    justifyContent="center"
    alignItems="center"
    sx={{
      pr: '8px',
      width: '24px',
      height: '24px',
      svg: {
        transition: 'fill 0.2s ease-in, stroke 0.2s ease-in ',
      },
    }}
    {...props}
  >
    {children}
  </Stack>
);

const EditorIcon: React.FC<EditorIconT> = ({ name, ...props }) => {
  const icon = {
    text: <Text {...props} />,
    h1: <H1 {...props} />,
    h2: <H2 {...props} />,
    h3: <H3 {...props} />,
    ol: <NumList {...props} />,
    ul: <MarkList {...props} />,
    quote: <Quote {...props} />,
    divider: <Divider {...props} />,
    image: <Image {...props} />,
    video: <Video {...props} />,
    fileEditor: <FileEditor {...props} />,
    delete: <Delete {...props} />,
    arrowUp: <Arrow up {...props} />,
    arrowDown: <Arrow {...props} />,
  };

  return icon[name];
};

export default EditorIcon;
