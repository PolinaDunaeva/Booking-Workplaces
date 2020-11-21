import React, { useState, useEffect } from 'react';

import EditMode from '../EditMode/index.jsx';
import Cell from './Cell/index.jsx';

import block from 'bem-cn-lite';
import './planner.less';

const b = block('Planner');

const Planner = ({ height, width, tool, isEditing, setIsEditing, officeState, mutable, addElement, deleteElement,
                 undoAddition, undoDeletion, additions, deletions, bookedDesks, setDesk}) => {
  const [items, setItems] = useState([[]]);
  let isMouseDown = false;

  const checkIfMouseIsDown = () => isMouseDown;

  useEffect(() => {
      let matrix = [];
      for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
          row.push(
            !!additions && additions.has(`${j}_${i}`)
            ? additions.get(`${j}_${i}`)
            : {
                id: '',
                name: '',
                dir: 0,
                available: true
          });

        }
        matrix.push(row);
      }
      if (!!officeState && officeState.id !== '0' && officeState.map.desks.length !== 0) {

        officeState.map.desks.forEach(desk => {
          if (desk.y < height && desk.x < width) {
            matrix[desk.y][desk.x].name = 'desk';
            matrix[desk.y][desk.x].dir = desk.dir;
            matrix[desk.y][desk.x].id = desk.id;
            if(bookedDesks.includes(desk.id.toString())) {
                matrix[desk.y][desk.x].available = false;
            }
          }
        });

        officeState.map.items && officeState.map.items.forEach(item => {
          if (item.y < height && item.x < width) {
            matrix[item.y][item.x].name = item.type.toLowerCase();
            matrix[item.y][item.x].id = item.id;
          }
        })


      }
      setItems(matrix);

  }, [height, width, officeState, bookedDesks]);

  const table = Array(+height);

  if (!!items[height - 1] && !!items[height - 1][width - 1]) {
    for (let i = 0; i < height; i++) {
      const tableRow = [];
      for (let j = 0; j < width; j++) {
        tableRow.push((
          <Cell
            index={{i, j}}
            items={items}
            setItems={setItems}
            givenTool={items[i][j]}
            currentTool={tool}
            key={`${i}${j}`}
            isEditing={isEditing}
            checkIfMouseIsDown={checkIfMouseIsDown}
            addElement={addElement}
            deleteElement={deleteElement}
            undoAddition={undoAddition}
            undoDeletion={undoDeletion}
            setDesk={setDesk}
          />
        ));
      }
      table.push((
        <tr key={i}>
          {tableRow}
        </tr>
      ));
    }
  }

  return (
    <div className={b()}>
      <h2>Office plan</h2>
      {
        mutable ? (
          <div className={b({edit: true})}>
            <EditMode
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          </div>
        ) : null
      }
      <div className={b('map')}>
          <table
            onMouseDown={() => {isMouseDown = true}}
            onMouseUp={() => {isMouseDown = false}}
            onMouseEnter={() => {isMouseDown = false}}
            border='1'
            className={b('table')}
          >
            <tbody>{ table }</tbody>
          </table>
      </div>
    </div>
  );
};

export default Planner;
