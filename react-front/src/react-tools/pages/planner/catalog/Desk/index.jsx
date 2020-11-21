import React from 'react';

import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

import block from 'bem-cn-lite';
import './desk.less';

const b = block('desk');

const Desk = ({ dir }) => (
  <ArrowDropDownCircleOutlinedIcon className={b('rotate', {[`${dir * 90}`]: true})} />
);

export default Desk;
