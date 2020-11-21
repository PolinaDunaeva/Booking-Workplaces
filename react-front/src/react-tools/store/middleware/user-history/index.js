import {getUserHistory} from "../../commands/user-history/index.js";

function dispatchUserHistoryMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_USER_HISTORY_DATA':
                getUserHistory(dispatch, action.type, action.enqueueSnackbar,action.role,action.key);
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchUserHistoryMiddleware};