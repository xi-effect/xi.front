import * as React from 'react';
import Home from './Home';
import Exit from './Exit';
import Add from './Add';
import Account from './Account';
import Notification from './Notification';
import EyeOff from './EyeOff';
import EyeOn from './EyeOn';
import Calendar from './Calendar';
import Check from './Check';
import Task from './Task';
import Announce from './Announce';
import Chat from './Chat';

type Props = {
  name: string;
  [key: string]: any;
};

const MyIcon: React.FC<Props> = ({ name, ...props }) => {
  const iDict = {
    home: <Home {...props} />,
    exit: <Exit {...props} />,
    add: <Add {...props} />,
    account: <Account {...props} />,
    notification: <Notification {...props} />,
    eyeoff: <EyeOff {...props} />,
    eyeon: <EyeOn {...props} />,
    calendar: <Calendar {...props} />,
    check: <Check {...props} />,
    task: <Task {...props} />,
    announce: <Announce {...props} />,
    chat: <Chat {...props} />,
  };

  return name && Object.keys(iDict).includes(name) ? iDict[name] : <Home {...props} />;
};

export default MyIcon;
