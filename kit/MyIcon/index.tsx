import * as React from 'react';
import HomeIcon from './HomeIcon';
import ExitIcon from './ExitIcon';
import AddIcon from './AddIcon';
import AccountIcon from './AccountIcon';
import NotificationIcon from './NotificationIcon';
import EyeOffIcon from './EyeOffIcon';
import EyeOnIcon from './EyeOnIcon';

type Props = {
  name: string;
  [key: string]: any;
};

const MyIcon: React.FC<Props> = ({ name, ...props }) => {
  const iconsDict = {
    home: <HomeIcon {...props} />,
    exit: <ExitIcon {...props} />,
    add: <AddIcon {...props} />,
    account: <AccountIcon {...props} />,
    notification: <NotificationIcon {...props} />,
    eyeoff: <EyeOffIcon {...props} />,
    eyeon: <EyeOnIcon {...props} />,
  };

  return name && Object.keys(iconsDict).includes(name) ? iconsDict[name] : <HomeIcon {...props} />;
};

export default MyIcon;
