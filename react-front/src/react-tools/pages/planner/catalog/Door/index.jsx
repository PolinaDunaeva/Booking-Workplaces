import React from 'react';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import block from 'bem-cn-lite';
import './door.less';

const b = block('door');

const Door = () => (
  <MeetingRoomIcon className={b()} />
);

export default Door;
