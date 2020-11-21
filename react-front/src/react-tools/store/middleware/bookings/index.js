import {getBookings, deleteBookings} from "../../commands/bookings/index";

function dispatchBookingsMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_BOOKINGS_DATA':
                getBookings(dispatch, action.type, action.enqueueSnackbar);
                break;
            case 'DELETE_BOOKINGS_DATA':
                deleteBookings(dispatch, action.type, action.enqueueSnackbar, action.bookings);
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchBookingsMiddleware};
