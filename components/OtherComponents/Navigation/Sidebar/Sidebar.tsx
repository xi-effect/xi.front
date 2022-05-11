/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router';
import { inject, observer } from 'mobx-react';

import { Stack, Tooltip, IconButton, Box } from '@mui/material';
import { grey } from '@mui/material/colors';

import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import CommunityItem from './CommunityItem';

const DialogCreateCommunity = dynamic(() => import('./DialogCreateCommunity'), { ssr: false });

type SidebarType = {
  rootStore?: any;
  communitiesMenuSt?: any;
};

const menuListDividers = ['home', 'none'];

const Sidebar: React.FC<SidebarType> = inject(
  'rootStore',
  'communitiesMenuSt',
)(
  observer(({ rootStore, communitiesMenuSt }) => {
    const [openDialogCC, setOpenDialogCC] = React.useState(false);
    const router = useRouter();

    console.log('router', router);

    const menuList = [
      {
        id: 0,
        icon: <HomeIcon />,
        label: 'Главная',
        href: '/home',
      },
      {
        id: 1,
        icon: <AddBoxIcon />,
        label: 'Создать сообщество',
        href: 'createcommunity',
      },
    ];

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    const reorderFn = (source, destination) => {
      const communities = reorder(communitiesMenuSt.userCommunities, source, destination);
      rootStore.socket.emit('create-community', {
        // @ts-ignore
        'source-id': communities[destination].id,
        'target-index': destination,
      });
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

    const subReorder = (data) => {
      const newArray = communitiesMenuSt.userCommunities;
      const item = newArray.find((i) => i.id === data['source-id']);
      const itemIndex = newArray.findIndex((i) => i.id === data['source-id']);
      newArray.splice(itemIndex, 1);
      newArray.splice(data['target-index'], 0, item);
    };

    React.useEffect(() => {
      rootStore.socket.on('reorder-community', subReorder);
      return () => {
        rootStore.socket.off('reorder-community', subReorder);
      };
    }, []);

    const addItemtoMenu = (data) => {
      console.log('on new-community');
      communitiesMenuSt.setUserCommunities([
        {
          name: data.name,
          id: data.id,
        },
        ...communitiesMenuSt.userCommunities,
      ]);
    };

    React.useEffect(() => {
      rootStore.socket.on('new-community', addItemtoMenu);
      return () => {
        rootStore.socket.off('new-community', addItemtoMenu);
      };
    }, []);

    React.useEffect(() => {
      rootStore.socket.on('new-community', addItemtoMenu);
      return () => {
        rootStore.socket.off('new-community', addItemtoMenu);
      };
    }, []);

    const removeItem = (data) => {
      console.log('on leave-community');
      communitiesMenuSt.removeCommunity(data.id);
    };

    React.useEffect(() => {
      rootStore.socket.on('leave-community', removeItem);
      return () => {
        rootStore.socket.off('leave-community', removeItem);
      };
    }, []);

    return (
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        sx={{
          position: 'absolute',
          pt: 2,
          width: 80,
          height: '100vh',
          overflow: 'hidden',
        }}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          sx={{ position: 'relative' }}
          alignItems="flex-start">
          <Stack
            sx={{ width: 4, position: 'absolute' }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}>
            {menuListDividers.map((item, index) => (
              <Box
                key={index.toString()}
                sx={{
                  display: router.pathname.includes(item) ? 'flex' : 'none',
                  height: 40,
                  width: 4,
                  bgcolor: grey[200],
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            ))}
          </Stack>
          <Stack
            sx={{ width: 80 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            {menuList.map((item, index) => (
              <Tooltip key={index.toString()} placement="right" title={item.label}>
                <IconButton
                  component={motion.li}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (item.href === 'createcommunity') {
                      setOpenDialogCC(true);
                    } else router.push(item.href);
                  }}
                  sx={{
                    bgcolor: router.pathname.includes(item.href) ? 'primary.main' : '',
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: router.pathname.includes(item.href) ? 'primary.main' : '',
                    },
                  }}>
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sidebar-communities-list">
            {(provided) => (
              <Scrollbars
                renderThumbHorizontal={(props) => (
                  <div
                    {...props}
                    style={{ backgroundColor: '#cccccc', borderRadius: 8, width: 2 }}
                  />
                )}
                renderThumbVertical={(props) => (
                  <div
                    {...props}
                    style={{ backgroundColor: '#cccccc', borderRadius: 8, width: 2 }}
                  />
                )}
                universal
                // @ts-ignore
                style={{ height: '100%', overflowY: 'hidden !important' }}
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  sx={{ position: 'relative', pt: 2 }}
                  alignItems="flex-start">
                  <Stack
                    sx={{ width: 4, position: 'absolute', height: '100%' }}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}>
                    {communitiesMenuSt.userCommunities.map((item, index) => (
                      <Box
                        key={index.toString()}
                        sx={{
                          height: 50,
                          width: 4,
                          bgcolor: Number(router.query.id) === item.id ? grey[200] : 'transparent',
                          borderTopRightRadius: 8,
                          borderBottomRightRadius: 8,
                        }}
                      />
                    ))}
                  </Stack>
                  <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                    sx={{
                      width: 80,
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {communitiesMenuSt.userCommunities.map((item, index) => (
                      <CommunityItem item={item} index={index} key={item.id} />
                    ))}
                    {provided.placeholder}
                  </Stack>
                </Stack>
              </Scrollbars>
            )}
          </Droppable>
          <Box sx={{ height: 12 }} />
        </DragDropContext>
        <Stack
          direction="row"
          justifyContent="flex-start"
          sx={{ position: 'relative' }}
          alignItems="flex-start">
          <Stack
            sx={{ width: 4, position: 'absolute' }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}>
            {router.pathname.includes('settings') && (
              <Box
                sx={{
                  height: 40,
                  width: 4,
                  bgcolor: grey[200],
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              />
            )}
          </Stack>
          <Stack
            sx={{ width: 80 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
            <Tooltip placement="right" title="Настройки">
              <IconButton
                component={motion.li}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  router.push('/settings');
                }}
                sx={{
                  bgcolor: router.pathname.includes('/settings') ? 'primary.main' : '',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: router.pathname.includes('/settings') ? 'primary.main' : '',
                  },
                }}>
                <SettingsIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Box
          sx={{
            height: '4px',
          }}
        />
        <DialogCreateCommunity openDialogCC={openDialogCC} setOpenDialogCC={setOpenDialogCC} />
      </Stack>
    );
  }),
);

export default Sidebar;
