// @ts-nocheck
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Invites from './MenuItems/Invites';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{
        width: 'calc(100% - 272px)',
      }}
    >
      {value === index && <Box sx={{ p: 4 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Menu() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2, bgcolor: 'background.main', display: 'flex' }}>
      <Tabs
        textColor="inherit"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 2, borderColor: 'divider', pl: 2, width: 128 }}
      >
        <Tab label="Приглашения" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={1}>
        <Invites />
      </TabPanel>
    </Box>
  );
}
