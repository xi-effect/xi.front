import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Typography, MenuItem, Stack, MenuList, ListItemIcon, ListItemText } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocalStorage } from 'react-use';
import { motion } from 'framer-motion';
import Scroll from 'kit/Scroll';
import MyIcon from 'kit/MyIcon';

const arrowVariants = {
  open: {
    rotate: 90,
    x: -15,
  },
  closed: {
    rotate: 0,
  },
};

const Channel = inject('communityChannelsSt')(
  observer(({ communityChannelsSt, index }) => {
    const channel = communityChannelsSt.channels[index];

    const router = useRouter();
    const splitPathname = router.pathname.split('/');
    const lastType = splitPathname[splitPathname.length - 2];
    const typeId = router.query.typeId ?? null;

    if (channel.type === 'category') {
      return (
        <Stack
          key={index.toString()}
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{
            mt: '10px',
            mb: '2px',
            pl: 1,
            pr: 1,
            width: '100%',
          }}
        >
          <Stack
            onClick={() => communityChannelsSt.setChannel(index, 'open', !channel.open)}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
              width: '100%',
              pl: 0,
              pr: 1,
              cursor: 'pointer',
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
              zIndex: 1,
            }}
          >
            <ArrowForwardIosIcon
              component={motion.svg}
              variants={arrowVariants}
              animate={channel.open ? 'open' : 'closed'}
              transition={{ type: 'ease', duration: 0.2 }}
              sx={{ fontSize: 8 }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                ml: 1,
                fontSize: 14,
              }}
            >
              {channel.name.toLowerCase()}
            </Typography>
          </Stack>
          {channel.open && (
            <MenuList sx={{ width: '100%', pl: 2, pr: 1, zIndex: 1 }}>
              {channel.children.map((child, indexCh) => (
                <MenuItem
                  onClick={() =>
                    router.push(`/community/${router.query.id}/${child.type}/${child.id}`)
                  }
                  key={indexCh.toString()}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    height: 36,
                    bgcolor: lastType === child.type && typeId === child.id ? 'action.hover' : null,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      '&.MuiListItemIcon-root': {
                        minWidth: '2px !important',
                        fontSize: 26,
                      },
                    }}
                  >
                    <MyIcon name={child.type} />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    sx={{
                      pl: 1,
                      fontSize: 16,
                    }}
                  >
                    {child.name}
                  </ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          )}
        </Stack>
      );
    }
    if (channel.type !== 'category') {
      return (
        <MenuItem
          onClick={() => router.push(`/community/${router.query.id}/${channel.type}/${channel.id}`)}
          sx={{
            width: 'calc(100% - 16px)',
            borderRadius: 1,
            height: 36,
            ml: 1,
            mr: 1,
            bgcolor: lastType === channel.type && typeId === channel.id ? 'action.hover' : null,
            '&:hover': {
              bgcolor: 'primary.pale',
            },
          }}
        >
          <ListItemIcon
            sx={{
              '&.MuiListItemIcon-root': {
                minWidth: '2px !important',
                fontSize: 26,
              },
            }}
          >
            <MyIcon name={channel.type} />
          </ListItemIcon>
          <ListItemText
            disableTypography
            sx={{
              pl: 1,
              fontSize: 16,
            }}
          >
            {channel.name}
          </ListItemText>
        </MenuItem>
      );
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
            <Channel index={index} key={index.toString()} />
          ))}
        </Scroll>
      </MenuList>
    );
  }),
);

export default MenuCommunity;
