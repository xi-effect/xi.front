import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Tooltip, IconButton } from '@mui/material';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import useListen from 'utils/useListen';
import Scroll from 'kit/Scroll';
import MyIcon from 'kit/MyIcon';
import CommunityItem from './CommunityItem';

const DialogCreateCommunity = dynamic(() => import('./DialogCreateCommunity'), {
  ssr: false,
});

type SidebarType = {
  rootStore?: any;
  communitiesMenuSt?: any;
  userSt?: any;
};

const Sidebar: React.FC<SidebarType> = inject(
  'rootStore',
  'communitiesMenuSt',
  'userSt',
)(
  observer(({ rootStore, communitiesMenuSt, userSt }) => {
    const [openDialogCC, setOpenDialogCC] = React.useState(false);
    const router = useRouter();

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
        spacing={1}
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
            spacing={2}
          >
            <Tooltip placement="right" title="Главная">
              <IconButton
                onClick={() => router.push('/home')}
                sx={{
                  bgcolor: router.pathname.includes('home') ? 'primary.dark' : 'gray.0',
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  '&:hover': {
                    bgcolor: router.pathname.includes('home') ? 'primary.main' : 'primary.pale',
                  }
                }}
              >
                <MyIcon name={router.pathname.includes('home') ? 'home-white' : 'home-blue'} />
              </IconButton>
            </Tooltip>
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
        <Tooltip placement="right" title="Профиль пользователя">
          <IconButton
            sx={{
              bgcolor: 'white',
              width: 48,
              height: 48,
              borderRadius: 24,
            }}
          >
            <MyIcon name="account" />
          </IconButton>
        </Tooltip>
        <Tooltip placement="right" title="Выйти">
          <IconButton
            onClick={() => {
              userSt.logout();
            }}
            sx={{
              bgcolor: 'white',
              width: 48,
              height: 48,
              borderRadius: 24,
              '&:hover': {
                bgcolor: 'error.light',
              },
            }}
          >
            <MyIcon name="exit" />
          </IconButton>
        </Tooltip>
        <DialogCreateCommunity openDialogCC={openDialogCC} setOpenDialogCC={setOpenDialogCC} />
      </Stack>
    );
  }),
);

export default Sidebar;
