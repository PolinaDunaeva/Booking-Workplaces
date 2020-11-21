import React from 'react'

import AppsIcon from '@material-ui/icons/Apps';

import block from 'bem-cn-lite';
import './wall.less';

const b = block('wall');

const Wall = () => (
  <AppsIcon className={b()} />
);

export default Wall;
