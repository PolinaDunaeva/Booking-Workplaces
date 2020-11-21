import React from 'react'

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import block from 'bem-cn-lite';
import './window.less';

const b = block('window');

const Window = () => (
  <CheckBoxOutlineBlankIcon className={b()} />
);

export default Window;