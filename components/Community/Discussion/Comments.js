import React from 'react';

import { Stack } from '@mui/material';

import { inject, observer } from 'mobx-react';

const Comment = inject()(
  observer(() => (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.main',
          width: '100%',
          height: '100%',
        }}
      >
        asfbdabfdsgnfsnhfdmn
      </Stack>
    </Stack>
  )),
);

const Comments = inject()(
  observer(() => (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {[...Array(10)].map((comment, index) => (
        <Comment key={index.toString()} comment={comment} index={index} />
      ))}
    </Stack>
  )),
);

export default Comments;
