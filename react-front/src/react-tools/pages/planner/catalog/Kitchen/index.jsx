import React from 'react'

import KitchenIcon from '@material-ui/icons/Kitchen';

import block from 'bem-cn-lite';
import './kitchen.less';

const b = block('kitchen');

const Kitchen = () => (
  <KitchenIcon className={b()} />
);

export default Kitchen;
