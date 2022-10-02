import { IconWrap } from './index';

type Props = {
  color?: string;
};

const Image = ({ color = '#333' }: Props) => (
  <IconWrap>
    <svg width="20" height="13" viewBox="0 0 20 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.6248 1.78801C13.443 1.44268 12.9534 1.42941 12.7531 1.76439L9.12562 7.83379C8.93479 8.15307 8.47458 8.15963 8.27473 7.84592L5.96186 4.21528C5.75583 3.89186 5.27741 3.91119 5.09815 4.25019L1.388 11.2663C1.21192 11.5993 1.45332 12 1.83001 12H18.1718C18.548 12 18.7895 11.6001 18.6142 11.2671L13.6248 1.78801Z"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  </IconWrap>
);

export default Image;
