import React from 'react';
import { inject, observer } from 'mobx-react';

import { Stack, Tooltip, Divider, IconButton } from '@mui/material';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import useListen from 'utils/useListen';
import { Account } from '@xieffect/base.icons.account';
import { Add } from '@xieffect/base.icons.add';
import { Notification } from '@xieffect/base.icons.notification';
import { Home } from '@xieffect/base.icons.home';
import { Exit } from '@xieffect/base.icons.exit';
import { Scroll } from '@xieffect/base.components.scroll';
import CommunityItem from './CommunityItem';
import IButton from './IButton';

const DialogCreateCommunity = dynamic(() => import('./DialogCreateCommunity'), {
  ssr: false,
});

type SidebarType = {
  rootStore?: any;
  communitiesMenuSt?: any;
  userSt?: any;
  uiSt?: any;
};

const Sidebar: React.FC<SidebarType> = inject(
  'rootStore',
  'communitiesMenuSt',
  'userSt',
  'uiSt',
)(
  observer(({ rootStore, communitiesMenuSt, userSt, uiSt }) => {
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const reorderFn = (source, destination) => {
      const communities = reorder(communitiesMenuSt.userCommunities, source, destination);
      // @ts-ignore
      rootStore.socket.emit(
        'reorder-community',
        {
          // @ts-ignore
          'source-id': communities[destination].id,
          'target-index': destination,
        },
        ({ code, message, data }) => {
          console.info(code, message, data);
        },
      );
      communitiesMenuSt.setUserCommunities(communities);
    };

    const onDragEnd = (result) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      reorderFn(result.source.index, result.destination.index);
    };

    type Communty = {
      id: number;
      name: string;
    };

    const subReorder = (data) => {
      const newArray = Array.from(communitiesMenuSt.userCommunities);
      const item = newArray.find((i: Communty) => i.id === data['source-id']);
      const itemIndex = newArray.findIndex((i: Communty) => i.id === data['source-id']);
      newArray.splice(itemIndex, 1);
      newArray.splice(data['target-index'], 0, item);
      console.log('on reorder-community', newArray);
      communitiesMenuSt.setUserCommunities(newArray);
    };

    useListen(rootStore.socket, 'reorder-community', subReorder, communitiesMenuSt.userCommunities);

    const addItemtoMenu = (data) => {
      console.log('on new-community', data);
      const array = communitiesMenuSt.userCommunities;
      communitiesMenuSt.setUserCommunities([
        {
          name: data.name,
          id: data.id,
        },
        ...array,
      ]);
    };

    useListen(rootStore.socket, 'new-community', addItemtoMenu, communitiesMenuSt.userCommunities);

    const removeItem = (data) => {
      console.log('on leave-community');
      communitiesMenuSt.removeCommunity(data.id);
    };

    useListen(rootStore.socket, 'leave-community', removeItem, communitiesMenuSt);

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={0}
        sx={{
          pt: 1,
          pb: 1,
          width: 64,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Stack
          sx={{
            width: 64,
          }}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Stack
            sx={{ width: 64 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <IButton
              tooltip="Главная"
              href="/home"
              icon={<Home color="primary" />}
              iconColor="#445AFF"
              iconColorHover="#FFFFFF"
              isBefore
            />
            <IButton
              tooltip="Создать сообщество"
              icon={<Add color="primary" />}
              onClick={() => uiSt.setDialogs('communityCreation', true)}
              iconColor="#333333"
              iconColorHover="#FFFFFF"
            />
            <Divider
              sx={{
                height: '1px',
                width: '40px',
                borderRadius: '5px',
                backgroundColor: 'primary.light',
              }}
            />
          </Stack>
        </Stack>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sidebar-communities-list">
            {(provided) => (
              <Scroll>
                <Stack
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                  sx={{
                    pt: 1,
                    pb: 1,
                    width: 64,
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {communitiesMenuSt.userCommunities.map((item, index) => (
                    <CommunityItem item={item} index={index} key={item.id} />
                  ))}
                  {provided.placeholder}
                </Stack>
              </Scroll>
            )}
          </Droppable>
        </DragDropContext>
        <Stack
          sx={{ width: 64 }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Divider
            sx={{
              height: '1px',
              width: '40px',
              borderRadius: '5px',
              backgroundColor: 'primary.light',
            }}
          />
          <IButton
            tooltip="Уведомления"
            icon={<Notification color="primary" />}
            iconColor="#333333"
            iconColorHover="#FFFFFF"
          />
          <IButton
            tooltip="Профиль"
            href="/profile/profile1"
            icon={<Account color="primary" />}
            isBefore
            iconColor="#333333"
            iconColorHover="#FFFFFF"
          />
          <Tooltip placement="right" title="Выйти">
            <IconButton
              onClick={() => {
                userSt.logout();
              }}
              sx={{
                bgcolor: '#FFFFFF',
                width: 48,
                height: 48,
                borderRadius: 24,
                svg: {
                  fill: '#F42D2D',
                },

                '&:hover': {
                  borderRadius: '16px',
                  bgcolor: '#F42D2D',

                  svg: {
                    fill: '#FFFFFF',
                  },
                },
              }}
            >
              <Exit color="" />
            </IconButton>
          </Tooltip>
        </Stack>
        <DialogCreateCommunity />
      </Stack>
    );
  }),
);

export default Sidebar;
