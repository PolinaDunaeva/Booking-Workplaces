import React, { useState } from 'react';

import {TextField, Button} from '@material-ui/core';

import block from 'bem-cn-lite';
import './planner-form.less';

const b = block('FormHolder');

const PlannerForm = ({ size, setSize }) => {
  const [inputValue, setInputValue] = useState({width: '', height: ''});

  const formChangeHandler = (event) => {
    const value = parseInt(event.target.value, 10);
    if (typeof value === 'number' && value > 0 && value <= 100) {
      setInputValue({...inputValue, [event.target.name]: ''});
      setSize({ ...size, [event.target.name]: event.target.value });
    } else {
      setInputValue({...inputValue, [event.target.name]: `${event.target.name} should be in 1-100 range`});
    }
  };

  return (
    <div className={b()}>
      <h2>Size</h2>
      <form className={b('form')} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Height"
          variant="standard"
          name='height'
          type="number"
          onChange={formChangeHandler}
          className={b('field')}
          error={!!inputValue.height}
          helperText={inputValue.height}
          value={size.height}
        />
        <TextField
          id="outlined-basic"
          label="Width"
          variant="standard"
          name='width'
          type="number"
          onChange={formChangeHandler}
          className={b('field')}
          error={!!inputValue.width}
          helperText={inputValue.width}
          value={size.width}
        />
      </form>
    </div>
  );
};

export default React.memo(PlannerForm);
