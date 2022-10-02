import { IconWrap } from './index';

type Props = {
  color?: string;
};

const Video = ({ color = '#333' }: Props) => (
  <IconWrap>
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.3905 7.8779C11.0854 7.49888 11.0854 6.50112 10.3905 6.1221L2.47885 1.80665C1.81248 1.44317 1 1.92548 1 2.68454V11.3155C1 12.0745 1.81248 12.5568 2.47885 12.1934L10.3905 7.8779Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrap>
);

export default Video;
