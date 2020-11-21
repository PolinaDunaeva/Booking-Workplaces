import immutable from "../../../helpers/immutable-object";
import moment from "moment";

const initialBookings = {
    loading: false,
    error: '',
    list: [],
};

function bookingsReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_BOOKINGS_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_BOOKINGS_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload.map((booking) => {
                    const date = booking.date.split("-");
                    return {...booking, date: moment(date.map((elem,index) => {return  index % 2 === 0 ? Number(elem) : Number(elem)-1}).reverse())};
                }),
            };
        case 'GET_BOOKINGS_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };
        case 'DELETE_BOOKINGS_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'DELETE_BOOKINGS_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                error: '',
                list: action.payload.map((booking) => {
                    const date = booking.date.split("-");
                    return {...booking, date: moment(date.map((elem,index) => {return  index % 2 === 0 ? Number(elem) : Number(elem)-1}).reverse())};
                }),
            };
        case 'DELETE_BOOKINGS_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };

        default:
            return state;
    }
}

export {bookingsReducer, initialBookings};