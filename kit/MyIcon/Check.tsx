import { SvgIcon } from '@mui/material';

type Props = {
  color?: string;
  size?: number;
  [key: string]: any;
};

const Check = ({ color = '#000', size = 24,  ...props }: Props) => (
  <SvgIcon width={size} height={size} fill="none" {...props}>
    <path
      d="M17.516 6.726c-.231.113-.612.481-3.885 3.748l-3.63 3.622-1.63-1.621c-1.418-1.409-1.665-1.638-1.887-1.748-.494-.244-.945-.133-1.43.351-.336.337-.434.545-.434.922 0 .237.02.342.098.5.076.155.603.704 2.34 2.442 2.418 2.418 2.418 2.418 2.868 2.451.264.019.465-.038.714-.204.241-.16 8.232-8.139 8.479-8.466.225-.297.298-.516.273-.813-.023-.289-.163-.548-.446-.832-.484-.483-.935-.595-1.43-.352"
      fillRule="evenodd"
      fill={color}
    />
  </SvgIcon>
);

export default Check;
