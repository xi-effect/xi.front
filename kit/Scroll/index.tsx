import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

type Props = {
  children: React.ReactNode;
};

const Scroll: React.FC<Props> = ({ children }) => (
  <Scrollbars
    renderTrackVertical={(props) => (
      <div
        {...props}
        style={{
          width: '3px',
          opacity: 0,
          position: 'absolute',
          transition: 'opacity 200ms ease 0s',
          right: '2px',
          bottom: '2px',
          top: '2px',
          borderRadius: '3px',
        }}
      />
    )}
    renderThumbHorizontal={(props) => (
      <div {...props} style={{ backgroundColor: '#cccccc', borderRadius: 8, width: '3px' }} />
    )}
    renderThumbVertical={(props) => (
      <div {...props} style={{ backgroundColor: '#cccccc', borderRadius: 8, width: '3px' }} />
    )}
    universal
    // @ts-ignore
    style={{ height: '100%', overflowY: 'hidden !important' }}
    autoHide
    autoHideTimeout={1000}
    autoHideDuration={200}
  >
    {children}
  </Scrollbars>
);

export default Scroll;
