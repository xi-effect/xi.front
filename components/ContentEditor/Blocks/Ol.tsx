import React from 'react';

const Ol: React.FC = ({ children }) => (
  <ol
    style={{
      margin: '0 0 0 20px',
      padding: '5px 0 0 0',
    }}
  >
    {children}
  </ol>
);

export default Ol;
