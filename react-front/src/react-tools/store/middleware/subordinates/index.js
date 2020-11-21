import {getHrsSubordinate,deleteSubordinate} from "../../commands/subordinates/index.js";

function dispatchHrsSubordinatesMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_HR_SUBORDINATES_DATA':
                getHrsSubordinate(dispatch, action.type, action.enqueueSnackbar,action.email);
                break;
            case 'DELETE_HR_SUBORDINATES_DATA':
                deleteSubordinate(dispatch, action.type, action.enqueueSnackbar, action.hrEmail, action.userEmail);
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchHrsSubordinatesMiddleware};