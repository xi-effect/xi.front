import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import {
  Box,
  Typography,
  MenuItem,
  Stack,
  MenuList,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useLocalStorage } from 'react-use';
import Scroll from 'kit/Scroll';
import MyIcon from 'kit/MyIcon';
import Image from 'next/image';

const iconsDict = {
  announces: 'announce',
  announce: 'announce',
  task: 'task',
  chat: 'chat',
};

type ChannelT = {
  channel: any;
};

type ItemsT = {
  communityChannelsSt?: any;
  index: number;
};

const Channel: React.FC<ChannelT> = inject('communityChannelsSt')(
  observer(({ channel }) => {
    const router = useRouter();
    const splitPathname = router.pathname.split('/');
    const lastType = splitPathname[splitPathname.length - 2];
    const typeId = router.query.typeId ?? null;

    console.log('channel', channel);

    const handleChannelClick = () => {
      router.push(
        `/community/${router.query.id}/${channel.type}${
          channel.type[channel.type.length - 1] !== 's' ? `/${channel.id}` : ''
        }`,
      );
    };

    return (
      <MenuItem
        onClick={handleChannelClick}
        sx={{
          width: 'calc(100% - 16px)',
          borderRadius: 1,
          height: 36,
          ml: 1,
          mr: 1,
          pl: '6px',
          pr: '6px',
          bgcolor: lastType === channel.type && typeId === channel.id ? 'action.hover' : null,
          '&:hover': {
            bgcolor: 'primary.pale',
          },
        }}
      >
        <ListItemIcon
          sx={{
            width: '24px',
            height: '24px',
            minWidth: '24px !important',
          }}
        >
          <MyIcon name={iconsDict[channel.type]} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          sx={{
            pl: '6px',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '18px',
          }}
        >
          {channel.name}
        </ListItemText>
      </MenuItem>
    );
  }),
);

const Items: React.FC<ItemsT> = inject('communityChannelsSt')(
  observer(({ communityChannelsSt, index }) => {
    const channel = communityChannelsSt.channels[index];

    if (channel.type === 'category') {
      return (
        <Stack
          key={index.toString()}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            mt: '24px',
            mb: '2px',
            width: '100%',
          }}
        >
          <Stack
            onClick={() => communityChannelsSt.setChannel(index, 'open', !channel.open)}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
              width: '100%',
              cursor: 'pointer',
              color: 'gray.80',
              zIndex: 1,
              pl: '14px',
              position: 'relative',
            }}
            spacing={0.5}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '4px',
                width: '7px',
                height: '2px',
              }}
            >
              <Image
                style={{
                  transition: '0.4s',
                  transform: !channel.open ? 'rotate(-90deg)' : '',
                }}
                src="/icons/arrow.svg"
                width={7}
                height={7}
              />
            </Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '20px',
              }}
            >
              {channel.name}
            </Typography>
            {channel.subtext && (
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '20px',
                }}
              >
                {channel.subtext}
              </Typography>
            )}
          </Stack>
          {channel.open && (
            <MenuList sx={{ width: '100%', pl: 0, pr: 0, zIndex: 1 }}>
              {channel.children.map((child, indexCh) => (
                <Channel key={indexCh.toString()} channel={child} />
              ))}
            </MenuList>
          )}
        </Stack>
      );
    }
    if (channel.type !== 'category') {
      return <Channel channel={channel} />;
    }
    return null;
  }),
);

const MenuCommunity = inject(
  'rootStore',
  'uiSt',
  'communityChannelsSt',
)(
  observer(({ communityChannelsSt }) => {
    const [valueLS, setValueLS] = useLocalStorage('second-menu-c-upper-items-position-is-vert');

    useEffect(() => {
      if (valueLS === undefined) {
        setValueLS(true);
      }
    }, []);

    return (
      <MenuList
        sx={{
          width: '100%',
          height: '100%',
          pl: 0,
          pr: 0,
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Scroll>
          {communityChannelsSt.channels.map((channel, index) => (
            <Items index={index} key={index.toString()} />
          ))}
        </Scroll>
      </MenuList>
    );
  }),
);

export default MenuCommunity;
