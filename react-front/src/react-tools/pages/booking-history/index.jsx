import React, {useContext, useEffect} from 'react';
import block from 'bem-cn-lite';
import './booking-history.less';

const b = block('booking-history')

function BookingHistory () {

    return (
        <div className={b()}>
            <div className={b('title')}>Booking History</div>
        </div>
    )
}

export default BookingHistory;