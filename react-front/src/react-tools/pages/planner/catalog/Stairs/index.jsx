import React from 'react';


import block from 'bem-cn-lite';
import './stairs.less';

const b = block('stairs');

const Door = () => (
  <svg className={b()} version="1.1" id="mdi-stairs-up" width="24" height="24" viewBox="0 0 24 24">
    <path fill="currentColor" d="M15 6H22V9H18V13H14V17H10V21H3V18H7V14H11V10H15V6M10.17 6.66L4.66 12.17L2.83 10.34L8.34 4.83L6.5 3H12V8.5L10.17 6.66Z" />
  </svg>
);

export default Door;
