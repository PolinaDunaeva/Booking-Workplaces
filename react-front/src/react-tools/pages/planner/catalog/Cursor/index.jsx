import React from 'react';

import TouchAppIcon from '@material-ui/icons/TouchApp';

import block from 'bem-cn-lite';
import './cursor.less';

const b = block('cursor');

const Cursor = () => (
  <TouchAppIcon className={b()} />
);

export default Cursor;
