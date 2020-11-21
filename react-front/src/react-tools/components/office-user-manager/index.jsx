import React, {useEffect, useMemo} from 'react';
import {Button, MenuItem, TextField, Typography} from "@material-ui/core"
import Planner from "../../pages/planner/index.jsx";
import Calendar from '../booking-form/index.jsx';
import {withSnackbar} from 'notistack';

import block from 'bem-cn-lite';
import './office-user-manager.less';
import {Link} from "react-router-dom";

const b = block('office-user-manager');

function UserOfficeManager({enqueueSnackbar, officeState, userState, setFloor, date, setDate, desk, setDesk}) {

    const bookedDesks = useMemo(() => {
        return officeState.bookings ? Object.keys(officeState.bookings).filter(key => {
            for(let item of officeState.bookings[key]) {
                const diff = item.date.getTime() - date.getTime();
                if(diff >= 0 && diff < 86400000) {
                    return true;
                }
            }
            return false;
        }) : []
    }, [date, officeState.bookings]);

    useEffect(() => console.log('desks', bookedDesks), [date, bookedDesks]);


    return (
        <div className={b('row')}>
            <div className={b('container')}>
                <Typography variant="h6">{`${userState.firstName} ${userState.lastName}`}</Typography>
                <div className={b('text')}>You have chosen {officeState.name}</div>
                <Link to='/' className={b('link')}><Button variant='outlined' color='primary'>Back</Button></Link>
                <div className={b('floors')}>
                    <TextField
                        label={'floor'}
                        variant='outlined'
                        value={officeState.floor}
                        select
                        onChange={e => setFloor(e.target.value)}
                    >
                        { officeState.floors.map((item, index) => (
                            <MenuItem key={`f${index}`} value={item}>{item}</MenuItem>
                            ))}
                    </TextField>
                </div>
            </div>
            <Planner mutable={false} officeState={officeState} setDesk={setDesk} bookedDesks={bookedDesks}/>
            <Calendar desk={desk} date={date} setDate={setDate} officeState={officeState} enqueueSnackbar={enqueueSnackbar} />
        </div>
    )
}

export default withSnackbar(UserOfficeManager);