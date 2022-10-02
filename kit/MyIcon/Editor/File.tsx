import { IconWrap } from './index';

type Props = {
  color?: string;
};

const File = ({ color = '#333' }: Props) => (
  <IconWrap>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 20H16C17.6569 20 19 18.6569 19 17V9.24264C19 8.44699 18.6839 7.68393 18.1213 7.12132L15.8787 4.87868C15.3161 4.31607 14.553 4 13.7574 4H8C6.34315 4 5 5.34315 5 7V17C5 18.6569 6.34315 20 8 20Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 4V7C14 8.10457 14.8954 9 16 9H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M9 12H11.75M9 16H13.75" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconWrap>
);

export default File;
