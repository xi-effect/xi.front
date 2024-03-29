import { observer } from 'mobx-react';
import LayoutPages from 'kit/LayoutPages';
import React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { Navigation } from 'kit/Navigation';
import dynamic from 'next/dynamic';

const ContentEditor = dynamic(import('kit/Editor/ContentEditor'), { ssr: false });

const PagePage = observer(() => {
  const router = useRouter();

  React.useEffect(() => {
    if (router.query.id !== undefined) {
      // do smth
    }
  }, [router.query.id]);

  return (
    <LayoutPages noIndex>
      <Navigation>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            padding: '30px',
            maxWidth: '1060px',
          }}
        >
          <ContentEditor />
        </Box>
      </Navigation>
    </LayoutPages>
  );
});

export default PagePage;
