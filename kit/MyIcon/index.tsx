import Image from 'next/image';
import * as React from 'react';

type Props = {
  name: string;
  width?: number;
  height?: number;
};

const MyIcon: React.FC<Props> = ({ name, width = 24, height = 24 }) => (
  <Image src={`/icons/i-${name}.svg`} width={width} height={height} />
);

export default MyIcon;
