import { IconWrap } from './index';

type Props = {
  color?: string;
};

const Delete = ({ color = '#333' }: Props) => (
  <IconWrap>
    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5V4C12 3.06812 12 2.60218 11.8478 2.23463C11.6448 1.74458 11.2554 1.35523 10.7654 1.15224C10.3978 1 9.93188 1 9 1V1C8.06812 1 7.60218 1 7.23463 1.15224C6.74458 1.35523 6.35523 1.74458 6.15224 2.23463C6 2.60218 6 3.06812 6 4V5M1 5H17M15 5V13.2C15 14.8802 15 15.7202 14.673 16.362C14.3854 16.9265 13.9265 17.3854 13.362 17.673C12.7202 18 11.8804 18 10.2008 18C9.40907 18 8.59093 18 7.7992 18C6.11958 18 5.27976 18 4.63803 17.673C4.07354 17.3854 3.6146 16.9265 3.32698 16.362C3 15.7202 3 14.8803 3 13.2005C3 9.46319 3 5 3 5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrap>
);

export default Delete;
