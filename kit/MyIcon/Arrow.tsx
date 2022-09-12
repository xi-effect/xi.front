import { SvgIcon } from '@mui/material';

type Props = {
  color?: string;
  size?: number;
  fontSize?: number;
  [key: string]: any;
};
const Arrow = ({ color = '#000', size = 24, fontSize, ...props }: Props) => (
  <SvgIcon
    style={{ fontSize: fontSize ?? '' }}
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M8.487 3.56a2.155 2.155 0 0 0-.511.367c-.528.507-.669 1.049-.414 1.593.113.24.363.501 3.23 3.37L13.899 12l-3.107 3.11c-2.867 2.869-3.117 3.13-3.23 3.37-.247.527-.128 1.031.365 1.544.342.356.702.536 1.073.536.227 0 .312-.021.545-.139.254-.127.565-.428 4.023-3.89 3.472-3.475 3.757-3.77 3.87-4.011.17-.363.17-.677 0-1.04-.113-.241-.398-.536-3.87-4.011-3.458-3.462-3.769-3.763-4.023-3.89-.374-.189-.688-.194-1.058-.019"
      fillRule="evenodd"
      fill={color}
    />
  </SvgIcon>
);

export default Arrow;
