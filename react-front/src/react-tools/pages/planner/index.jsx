import React, { useState } from 'react';

import PlannerForm from './components/PlannerForm/index.jsx';
import Planner from './components/Planner/index.jsx';
// import PlannerCalendar from './components/PlannerCalendar/index.jsx';
import Sidebar from './sidebar/index.jsx';


import 'react-calendar/dist/Calendar.css';
import block from 'bem-cn-lite';
import './office-planner.less';

const b = block('app');

const App = ({mutable, officeState, addElement, deleteElement, undoAddition, undoDeletion, additions, deletions, setDesk, bookedDesks}) => {
    const [size, setSize] = useState(!!officeState && officeState.id !== '0' ? {
            height:  officeState.height,
            width: officeState.width,
        }
        : {
            height: 10,
            width: 10,
        });


  const [tool, setTool] = useState({
    name: 'cursor',
    dir: 0,
  });

  const [isEditing, setIsEditing] = useState(typeof mutable === 'boolean' ? mutable : true);
  const [isBooking, setIsBooking] = useState(true);


  return (
    <div className={b({view: !isEditing})}>
      {
        isEditing ? ([
          <Sidebar
            tool={tool}
            setTool={setTool}
          />,
          <PlannerForm
            size={size}
            setSize={setSize}
          />
        ]) : null
      }
      <Planner
        height={size.height}
        width={size.width}
        officeState={officeState}
        tool={tool}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        mutable={typeof mutable === 'boolean' ? mutable : true}
        addElement={addElement}
        deleteElement={deleteElement}
        undoAddition={undoAddition}
        undoDeletion={undoDeletion}
        additions={additions}
        deletions={deletions}
        bookedDesks={bookedDesks}
        setDesk={setDesk}
      />
    </div>
  );
};

export default App;
