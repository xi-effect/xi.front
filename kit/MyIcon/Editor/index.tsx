import React from 'react';
import { Stack } from '@mui/material';
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import Text from './Text';
import Quote from './Quote';
import Image from './Image';
import Video from './Video';
import Arrow from './Arrow';
import Delete from './Delete';
import Divider from './Divider';
import FileEditor from './File';
import NumList from './NumList';
import MarkList from './MarkList';
import Copy from './Copy';

type EditorIconT = {
  name: string;
  color?: string;
  size?: number;
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

const EditorIcon: React.FC<EditorIconT> = ({ name, color, size }) => {
  const icon = {
    h1: <H1 color={color} />,
    h2: <H2 color={color} />,
    h3: <H3 color={color} />,
    text: <Text color={color} />,
    ol: <NumList color={color} />,
    ul: <MarkList color={color} />,
    quote: <Quote color={color} />,
    image: <Image color={color} />,
    video: <Video color={color} />,
    delete: <Delete color={color} />,
    arrowDown: <Arrow color={color} />,
    divider: <Divider color={color} />,
    arrowUp: <Arrow up color={color} />,
    fileEditor: <FileEditor color={color} />,
    imageMedium: <Image medium color={color} />,
    videoMedium: <Video medium color={color} />,
    fileEditorMedium: <FileEditor medium color={color} />,
    copy: <Copy color={color} size={size} />,
  };

  return icon[name];
};

export default EditorIcon;

