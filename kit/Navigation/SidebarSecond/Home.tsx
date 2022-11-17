import React from 'react';
import { inject, observer } from 'mobx-react';

import { ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import { Scroll } from '@xieffect/base.components.scroll';
import { Announce } from '@xieffect/base.icons.announce';
import { Calendar } from '@xieffect/base.icons.calendar';
import { ChannelsType } from 'store/community/communityChannelsSt';
import HomeChannelsSt from 'store/home/homeChannelsSt';
import { Update } from '../../MyIcon/Update';

const iconsDict = {
  posts: <Announce color="" />,
  schedule: <Calendar color="" />,
  update: <Update color="" />,
};

type ChannelT = {
  channel: ChannelsType;
};

const Channel: React.FC<ChannelT> = inject('homeChannelsSt')(
  observer(({ channel }) => {
    const handleChannelClick = () => {
      console.log(`click ${channel.name} id: ${channel.id}`);
    };

    const isSameChannel = false;

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
          bgcolor: isSameChannel ? 'primary.pale' : null,

          '.MuiListItemText-root': {
            color: isSameChannel ? 'primary.dark' : null,
          },

          svg: {
            fill: isSameChannel ? '#445AFF' : '#000',
          },

          '&:hover': {
            bgcolor: 'primary.pale',

            '.MuiListItemText-root': {
              color: 'primary.dark',
            },

            svg: {
              fill: '#445AFF',
            },
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
          {iconsDict[channel?.type]}
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
          {channel?.name}
        </ListItemText>
      </MenuItem>
    );
  }),
);

type MenuCommunityT = {
  homeChannelsSt: HomeChannelsSt;
};

const MenuHome = inject('homeChannelsSt')(
  observer((props) => {
    const { homeChannelsSt }: MenuCommunityT = props;

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
          {homeChannelsSt.channels.map((channel, index) => (
            <Channel channel={channel} key={index.toString()} />
          ))}
        </Scroll>
      </MenuList>
    );
  }),
);

export default MenuHome;
