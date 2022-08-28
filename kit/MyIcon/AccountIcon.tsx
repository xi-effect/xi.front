import { SvgIcon } from '@mui/material';

type Props = {
  color?: string;
  [key: string]: any;
};

const AccountIcon = ({ color = 'white', ...props }: Props) => (
  <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M4.9642 17.9742L5.2614 16.9958C6.16271 14.0285 8.89888 12 12 12C15.1011 12 17.8373 14.0285 18.7386 16.9958L19.0358 17.9742C19.342 18.9824 18.5876 20 17.5339 20H6.46606C5.41238 20 4.65796 18.9824 4.9642 17.9742Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </SvgIcon>
);

export default AccountIcon;
