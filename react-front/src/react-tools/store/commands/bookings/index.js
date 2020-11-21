import request from "../utils/request";


const getBookings = async (dispatch, type, enqueueSnackbar) => {
    try {
        dispatch({type: type.start});
        const {data} = await request('GET', '/user/bookings');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar('Smth goes wrong with bookings', {variant: 'error'});
        dispatch({type: type.error});
    }
};

const deleteBookings = async (dispatch, type, enqueueSnackbar, bookings) => {
    try {
        dispatch({type: type.start});
        for(let booking of bookings) {
            try {
                await request('DELETE', `/book?desk=${booking.desk}&date=${booking.date.format('YYYY-MM-DD')}`);
            } catch (e) {
                enqueueSnackbar(e.message, {variant: 'error'});
            }
        }
        const {data} = await request('GET', '/user/bookings');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
    }
};

export {getBookings, deleteBookings};