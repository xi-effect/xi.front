import { IconWrap } from './index';

type Props = {
  color?: string;
  [key: string]: any;
};

const MarkList = ({ color = '#333' }: Props) => (
  <IconWrap>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="3" cy="3" r="3" fill={color} />
    </svg>
  </IconWrap>
);

export default MarkList;
