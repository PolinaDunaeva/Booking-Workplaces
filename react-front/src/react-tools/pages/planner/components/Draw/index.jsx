import React from 'react';

import Desk from '../../catalog/Desk/index.jsx';
import Wall from '../../catalog/Wall/index.jsx';
import Door from '../../catalog/Door/index.jsx';
import Window from '../../catalog/Window/index.jsx';
import WC from '../../catalog/WC/index.jsx';
import Cursor from '../../catalog/Cursor/index.jsx';
import Kitchen from '../../catalog/Kitchen/index.jsx';
import Stairs from '../../catalog/Stairs/index.jsx';
import Admin from '../../catalog/Admin/index.jsx';

import block from 'bem-cn-lite';
import './draw.less';

const b = block('draw');

const Draw = ({ tool }) => {
  const draw = (tool) => {
    switch (tool.name) {
      case 'desk': return ( <Desk dir={tool.dir} /> );
      case 'door': return ( <Door /> );
      case 'window': return ( <Window /> );
      case 'wall': return ( <Wall /> );
      case 'stairs': return ( <Stairs /> );
      case 'admin': return ( <Admin /> );
      case 'wc': return ( <WC /> );
      case 'kitchen': return ( <Kitchen /> );
      case 'cursor': return ( <Cursor /> );
      default: return null;
    }
  };

  if (tool.name === 'cursor') {
    return null;
  }
  else return (
    <div className={b()}>
      { draw(tool) }
    </div>
  );
};

export default Draw;
