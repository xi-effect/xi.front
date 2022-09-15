import * as React from 'react';
import Home from './Home';
import Exit from './Exit';
import Add from './Add';
import Arrow from './Arrow';
import Account from './Account';
import Notification from './Notification';
import EyeOff from './EyeOff';
import EyeOn from './EyeOn';
import Calendar from './Calendar';
import Check from './Check';
import Task from './Task';
import Announce from './Announce';
import Chat from './Chat';
import Burger from './Burger';
import Camera from './Camera';
import Settings from './Settings';
import Close from './Close';
import Invite from './Invite';
import Clip from './Clip';
import File from './File';
import Send from './Send';

type Props = {
  name: string;
  [key: string]: any;
};

const MyIcon: React.FC<Props> = ({ name, ...props }) => {
  const iDict = {
    burger: <Burger {...props} />,
    arrow: <Arrow {...props} />,
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
    camera: <Camera {...props} />,
    settings: <Settings {...props} />,
    close: <Close {...props} />,
    invite: <Invite {...props} />,
    clip: <Clip {...props} />,
    file: <File {...props} />,
    send: <Send {...props} />,
  };

  return name && Object.keys(iDict).includes(name) ? iDict[name] : <Home {...props} />;
};

export default MyIcon;
