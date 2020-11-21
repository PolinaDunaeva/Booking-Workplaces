import React from 'react'

import WcIcon from '@material-ui/icons/Wc';

import block from 'bem-cn-lite';
import './wc.less';

const b = block('wc');

const WC = () => (
  <WcIcon className={b()} />
);

export default WC;
