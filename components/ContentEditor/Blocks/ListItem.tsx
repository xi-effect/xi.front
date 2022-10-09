import * as React from 'react';

const ListItem: React.FC = ({ children }) => (
  <li
    style={{
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '20px',
    }}
  >
    {children}
  </li>
);

export default ListItem;
