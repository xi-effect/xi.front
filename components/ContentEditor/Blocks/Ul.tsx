import * as React from 'react';

const Ol: React.FC = ({ children }) => (
  <ul
    style={{
      margin: '0 0 0 20px',
      padding: '5px 0 0 0',
    }}
  >
    {children}
  </ul>
);

export default Ol;
