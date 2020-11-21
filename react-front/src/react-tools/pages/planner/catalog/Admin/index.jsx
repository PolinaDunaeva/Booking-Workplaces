import React from 'react';

import PersonPinIcon from '@material-ui/icons/PersonPin';

import block from 'bem-cn-lite';
import './admin.less';

const b = block('admin');

const Admin = () => (
  <PersonPinIcon className={b()} />
);

export default Admin;
