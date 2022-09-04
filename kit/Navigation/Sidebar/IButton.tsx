import React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import MyIcon from 'kit/MyIcon';

type Props = {
  tooltip: string;
  href?: string;
  icon?: string;
  isBefore?: boolean;
  typography?: string;
  onClick?: () => void;
  disableHover?: boolean;
  iconColor?: string;
  iconColorHover?: string;
};

const IButton: React.FC<Props> = (props) => {
  const {
    tooltip,
    href,
    icon,
    isBefore = false,
    typography,
    onClick,
    disableHover = false,
    iconColor,
    iconColorHover,
  } = props;

  const [isHover, setIsHover] = React.useState(false);

  const toggleHover = () => {
    setIsHover((prev) => !prev);
  };

  const router = useRouter();
  const array = href ? href.split('/') : false;
  const isActive = array ? router.query.id === array[2] : false;

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
    if (href) {
      return router.push(href);
    }
    return null;
  };

  const getSvgFill = () => {
    if (iconColor && iconColorHover && isActive) return iconColorHover;
    if (iconColor) return iconColor;
    return '';
  };

  const getSvgFillHover = () => {
    if (iconColor && iconColorHover && isActive) return iconColorHover;
    if (iconColorHover) return iconColorHover;
    return '';
  };

  return (
    <Tooltip placement="right" title={tooltip}>
      <IconButton
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={handleClick}
        sx={{
          bgcolor: isActive ? 'primary.dark' : 'gray.0',
          width: 48,
          height: 48,
          borderRadius: isActive ? '16px' : 24,
          transition: '0.3s',
          svg: {
            fill: getSvgFill(),
          },

          '&:hover': {
            bgcolor: !disableHover ? 'primary.dark' : '',
            borderRadius: '16px',

            '.MuiTypography-root': {
              color: !disableHover ? 'gray.0' : '',
            },
            svg: {
              fill: getSvgFillHover(),
            },
          },

          '&:before': {
            display: isBefore && isActive ? 'block' : 'none',
            transition: '0.4s',
            position: 'absolute',
            top: '12px',
            left: '-8px',
            bgcolor: 'gray.80',
            content: '""',
            width: '4px',
            height: '26px',
            borderBottomRightRadius: '8px',
            borderTopRightRadius: '8px',
          },
        }}
      >
        {typography && (
          <Typography
            sx={{
              color: isActive ? 'gray.0' : 'gray.100',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '20px',
            }}
          >
            {typography}
          </Typography>
        )}
        {icon && <MyIcon name={icon} color={isHover ? 'primary' : 'primary'} />}
      </IconButton>
    </Tooltip>
  );
};

export default IButton;
