import { Stack } from '@mui/material';
import { observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';
import { Navigation } from 'kit/Navigation';
import { Header, Items } from 'components/Community/Posts';

const Posts = observer(() => (
  <LayoutPages noIndex>
    <Navigation>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          height: '100vh',
          width: '100%',
          p: 4,
          overflow: 'auto',
        }}
      >
        <Header />
        <Items />
      </Stack>
    </Navigation>
  </LayoutPages>
));

export default Posts;
