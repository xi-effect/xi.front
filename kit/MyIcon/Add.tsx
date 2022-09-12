import { SvgIcon } from '@mui/material';

type Props = {
  color?: string;
  size?: number;
  fontSize?: number;
  [key: string]: any;
};

const Add = ({ color = '#000', size = 24, fontSize, ...props }: Props) => (
  <SvgIcon
    style={{ fontSize: fontSize ?? '' }}
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M11.634 4.063c-.251.077-.559.361-.679.626l-.095.211-.011 2.99-.011 2.99H7.849l-2.989.001-.202.094A1.18 1.18 0 0 0 4 12c0 .427.288.863.689 1.045l.211.095 2.969.011 2.969.011.011 2.969.011 2.969.095.211c.182.401.618.689 1.045.689.427 0 .863-.288 1.045-.689l.095-.211.011-2.969.011-2.969 2.969-.011 2.969-.011.211-.095c.401-.182.689-.618.689-1.045a1.18 1.18 0 0 0-.658-1.025l-.202-.094-2.989-.001h-2.989l-.011-2.99-.011-2.99-.095-.211a1.16 1.16 0 0 0-1.411-.626"
      fill={color}
      fillRule="evenodd"
    />
  </SvgIcon>
);

export default Add;
