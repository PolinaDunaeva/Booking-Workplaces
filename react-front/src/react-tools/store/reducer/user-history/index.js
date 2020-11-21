import immutable from "../../../helpers/immutable-object";
import moment from "moment";

const initialUserHistory = {
    loading: false,
    list: [],
    error: ''
};

function userHistoryReducer(oldState, action) {
    const state = immutable(oldState);
    switch (action.type) {
        case 'GET_USER_HISTORY_DATA_START':
            return {
                ...state,
                loading: true,
                error: '',
            };
        case 'GET_USER_HISTORY_DATA_SUCCESS':
            return {
                ...state,
                loading: false,
                list: action.payload.map((booking) => {
                    const date = booking.date.split("-");
                    return {...booking, date: moment(date.map((elem,index) => {return  index % 2 === 0 ? Number(elem) : Number(elem)-1}).reverse())};
                }),
                error: '',
            };
        case 'GET_USER_HISTORY_DATA_ERROR':
            return {
                ...state,
                loading: false,
                error: '',
            };

        default:
            return state;
    }
}

export {userHistoryReducer, initialUserHistory};
