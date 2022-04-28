import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Stack, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { blue, green, orange, red, indigo } from '@mui/material/colors';
import Avatar from 'boring-avatars';

type CommunityItemType = {
  item: any;
  index: any;
};

const colors = [blue[100], green[600], orange[400], indigo[300], red[700]];

const CommunityItem: React.FC<CommunityItemType> = (props) => {
  const { item, index } = props;

  const router = useRouter();
  return (
    <Draggable draggableId={`sidebar-communities-list-id-${item.cId}`} index={index}>
      {(provided) => (
        <Stack ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Tooltip enterDelay={500} leaveDelay={0} placement="right" title={item.label}>
            <IconButton
              component={motion.li}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                router.push(`/community/${item.cId}`);
              }}
              sx={{
                borderRadius: '21px',
                height: '50px',
                width: '50px',
                p: 0,
                // mt: 2,
                // ml: 2.4,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}>
              <Avatar size={64} name={`${item.label}${item.cId}`} variant="beam" colors={colors} />
            </IconButton>
          </Tooltip>
        </Stack>
      )}
    </Draggable>
  );
};

export default CommunityItem;
