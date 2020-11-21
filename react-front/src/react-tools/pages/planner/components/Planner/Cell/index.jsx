import React, {useCallback, useEffect, useState} from 'react';
import Draw from '../../Draw/index.jsx';

import block from 'bem-cn-lite';
import './cell.less';

const b = block('Cell');

const isEqualTools = (first, second) => first.name === second.name && first.dir === second.dir;

const Cell = ({
  index,
  items,
  setItems,
  givenTool,
  currentTool,
  isEditing,
  checkIfMouseIsDown,
  addElement,
  deleteElement,
  undoAddition,
  undoDeletion,
  setDesk
}) => {
  const [displayedTool, setDisplayedTool] = useState(givenTool);
  const [deskState, setDeskState] = useState(givenTool.available ? null : 'booked');

  const replaceElement = useCallback((prev, next) => {
    addElement(next);
    deleteElement(prev);
  }, [addElement, deleteElement]);

  useEffect(() => setDeskState(givenTool.available ? null : 'booked'), [givenTool]);

  const cellMouseOverHandler = () => checkIfMouseIsDown() && cellClickHandler();

  const cellClickHandler = () => {
    if (currentTool.name === 'cursor') {
      currentTool = {...displayedTool};
    }
    if(isEqualTools(displayedTool, currentTool)) {
      return;
    }
    /*let arr = [...items];
    arr[index.i][index.j] = {...currentTool};
    setItems(arr);
     */

    let next = {
      id: items[index.i][index.j].id,
      name: currentTool.name,
      dir: currentTool.dir,
      x: index.j,
      y: index.i,
    };
    let prev = {
      id: items[index.i][index.j].id,
      name: displayedTool.name,
      dir: displayedTool.dir,
      x: index.j,
      y: index.i,
    };

    handleChanges(prev, next);

    setDisplayedTool(currentTool);
  };

  const handleChanges = (prev, next) => {
    if(currentTool.name === '') {
      clearCell(prev);
    } else {
      occupyCell(prev, next);
    }
  };

  function clearCell(cell) {
    if(isEqualTools(items[index.i][index.j], displayedTool)) {
      deleteElement(cell)
    } else {
      undoAddition(cell)
    }
  }

  function occupyCell(prev, next) {
    if(prev.name === '') {
      addElement(next)
    } else if(isEqualTools(items[index.i][index.j], displayedTool)) {
      replaceElement(prev, next);
    } else {
      undoAddition(prev);
      addElement(next);
    }
  }

  const deskClickHandler = () => {
    if (items[index.i][index.j].name === 'desk') {
      setDeskState(!deskState ? 'to_be_booked' : deskState);
      setDesk(items[index.i][index.j].id);
    }
  };

  return (
    <td
      onMouseOver={isEditing ? cellMouseOverHandler : null}
      onClick={isEditing ? cellClickHandler : deskClickHandler}
      onDragStart={(e) => {
        e.preventDefault();
      }}
      className={b({
        view: !isEditing,
        [`${deskState}`]: true
      })}
      title={displayedTool.name}
    >
      <Draw tool={displayedTool} /> 
    </td>
  );
};

export default Cell;
