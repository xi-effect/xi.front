import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Stack } from '@mui/material';
import { RegCommunityT } from 'models/dataProfileStore';
import IButton from './IButton';

type CommunityItemType = {
  item: RegCommunityT;
  index: number;
};

const CommunityItem: React.FC<CommunityItemType> = (props) => {
  const { item, index } = props;

  return (
    <Draggable draggableId={`sidebar-communities-list-id-${item.id}`} index={index}>
      {(provided) => (
        <Stack ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <IButton
            tooltip={item.name}
            typography={item.name[0].toUpperCase()}
            href={`/community/${item.id}`}
            isBefore
          />
        </Stack>
      )}
    </Draggable>
  );
};

export default CommunityItem;
