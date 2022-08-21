import React from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import MyIcon from 'kit/MyIcon';

type Props = {
  tooltip: string;
  href: string;
  iconWhite?: string;
  iconBlue?: string;
  isBefore?: boolean;
  typography?: string;
};

const IButton: React.FC<Props> = (props) => {
  const { tooltip, href, iconWhite, iconBlue, isBefore = false, typography } = props;

  const router = useRouter();
  const array = href.split('/');
  const isActive = router.query.id === array[2];

  return (
    <Tooltip placement="right" title={tooltip}>
      <IconButton
        onClick={() => router.push(href)}
        sx={{
          bgcolor: isActive ? 'primary.dark' : 'gray.0',
          width: 48,
          height: 48,
          borderRadius: 24,
          '&:hover': {
            bgcolor: isActive ? 'primary.main' : 'primary.pale',
          },
          '&:before': {
            display: isBefore && isActive ? 'block' : 'none',
            transition: '0.4s',
            position: 'absolute',
            top: '12px',
            left: '-8px',
            bgcolor: 'gray.100',
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
        {!typography && iconBlue && iconWhite && <MyIcon name={isActive ? iconWhite : iconBlue} />}
        {!typography && !iconBlue && iconWhite && <MyIcon name={iconWhite} />}
      </IconButton>
    </Tooltip>
  );
};

export default IButton;
