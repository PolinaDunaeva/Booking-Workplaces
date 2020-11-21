import React, { useState } from 'react';

import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

import Desk from '../catalog/Desk/index.jsx';
import Wall from '../catalog/Wall/index.jsx';
import Door from '../catalog/Door/index.jsx';
import Window from '../catalog/Window/index.jsx';
import Eraser from '../catalog/Eraser/index.jsx';
import WC from '../catalog/WC/index.jsx';
import Cursor from '../catalog/Cursor/index.jsx';
import Kitchen from '../catalog/Kitchen/index.jsx';
import Stairs from '../catalog/Stairs/index.jsx';
import Admin from '../catalog/Admin/index.jsx';

import block from 'bem-cn-lite';
import './sidebar.less';

const b = block('sidebar');


const Sidebar = ({ tool, setTool }) => {
  const [open, setOpen] = useState(false);
  const [deskDir, setDeskDir] = useState(0);

  const tabs = [
    { label: 'Hand', icon: (<Cursor />) },
    { label: 'Eraser', icon: (<Eraser />) },
    { label: 'Admin', icon: (<Admin />) },
    { label: 'Desk', icon: (<Desk dir={deskDir} />) },
    { label: 'Wall', icon: (<Wall />) },
    { label: 'Door', icon: (<Door />) },
    { label: 'Stairs', icon: (<Stairs />) },
    { label: 'Window', icon: (<Window />) },
    { label: 'WC', icon: (<WC />) },
    { label: 'Kitchen', icon: (<Kitchen />) },
  ];

  const toolClickHandler = (name) => {
    switch (name) {
      case 'Hand': 
        setTool({ name: 'cursor', dir: 0 });
        break;
      case 'Eraser': 
        setTool({ name: '', dir: 0 });
        break;
      case 'Desk':
        setDeskDir((deskDir + 1) % 4);
        setTool({ name: 'desk', dir: tool.name === 'desk' ? (deskDir + 1) % 4 : deskDir + 1 });
        break;
      case 'Door':
        setTool({ name: 'door', dir: 0 });
        break;
      case 'Stairs':
        setTool({ name: 'stairs', dir: 0 });
        break;
      case 'Admin':
        setTool({ name: 'admin', dir: 0 });
        break;
      case 'Wall':
        setTool({ name: 'wall', dir: 0 });
        break;
      case 'Window':
        setTool({ name: 'window', dir: 0 });
        break;
      case 'WC':
        setTool({ name: 'wc', dir: 0 });
        break;
      case 'Kitchen':
        setTool({ name: 'kitchen', dir: 0 });
        break;
      default:
        setTool({ name: '', dir: 0 });
    }
  };

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={b()}>

      <Drawer
        variant="permanent"
        className={b('drawer', {open: open, close: !open})}
        classes={{
          paper: b('drawer', {open: open, close: !open})
        }}
      >
        <List>
          {
            tabs.map((tab, i) => {
              return (
                <div>
                  <ListItem
                    className={b({headerIcon: i === 0})}
                    button
                    onClick={() => toolClickHandler(tab.label)}
                    selected={tab.label === 'Eraser' ? tool.name === '' : tool.name === tab.label.toLowerCase()}
                    key={tab.label + i}
                  >
                    <ListItemIcon>
                      { tab.icon }
                    </ListItemIcon>
                    <ListItemText primary={tab.label} />
                  </ListItem>
                  {tab.label === 'Eraser' || tab.label === 'Window' ? ( <Divider /> ) : null}
                </div>
              )
            })
          }
        </List>
      </Drawer>

    </div>
  );
};

export default Sidebar;
