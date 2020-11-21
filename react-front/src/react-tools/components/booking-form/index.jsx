import 'date-fns';
import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import request from '../../store/commands/utils/request';

import block from 'bem-cn-lite';
import './booking-form.less';

const b = block('booking-form');

const parseDate = (dateToParse) => {
  const day = dateToParse.getDate() / 10 > 1 ? dateToParse.getDate() : `0${dateToParse.getDate()}`;
  const month = (dateToParse.getMonth() + 1) / 10 > 1 ? dateToParse.getMonth() + 1 : `0${dateToParse.getMonth() + 1}`;
  const year = dateToParse.getFullYear();

  return `${year}-${month}-${day}`;
};

const parseTime = (time) => {
  const hours = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  return `${hours}:${minutes}`;
};


const Calendar = ({desk, setDate, enqueueSnackbar}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timePeriod, setTimePeriod] = useState({
    from: new Date(),
    to: new Date()
  });



  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  };

  const handleFromChange = (time) => {
    setTimePeriod({ ...timePeriod, from: time });
  };

  const handleToChange = (time) => {
    setTimePeriod({ ...timePeriod, to: time });
  };

  const handleDeskBook = async () => {
    try {
      const toBook = {
        date: parseDate(selectedDate),
        from: parseTime(timePeriod.from),
        to: parseTime(timePeriod.to),
        deskId: desk
      };
      await request('POST', '/book', toBook).then(response => {
        if (response.status < 400) enqueueSnackbar('Successfully booked!', {variant: 'success'})
      })
    }
    catch(e) {
      enqueueSnackbar(e.response.data, {variant: 'error'})
    }
  };

  return (
    <div className={b()}>
      <h2>Booking form</h2>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid className={b('fields')} container justify="space-around">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <h3>Time period</h3>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-from"
            label="From"
            name="from"
            value={timePeriod.from}
            onChange={handleFromChange}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker-to"
            label="To"
            name="to"
            value={timePeriod.to}
            onChange={handleToChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <div className={b('buttons')}>
            <Button onClick={handleDeskBook}>
              Book
            </Button>
          </div>
        </Grid>
      </MuiPickersUtilsProvider>
    </div>
    
  );
};

export default Calendar;
