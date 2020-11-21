import React from 'react'

import Button from "@material-ui/core/Button";

import block from 'bem-cn-lite';
import './edit-mode.less';

const b = block('button');

const EditMode = ({ isEditing, setIsEditing }) => {
  return (
      <Button
        className={b()}
        onClick={() => setIsEditing(!isEditing)}
        variant='outlined'>
        Go to {isEditing ? 'View Mode' : 'Edit Mode'}
      </Button>
  )
};

export default React.memo(EditMode);
