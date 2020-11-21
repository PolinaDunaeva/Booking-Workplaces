import {getOffices} from "../../commands/offices/index.js";

function dispatchOfficesMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_OFFICES_DATA':
                getOffices(dispatch, action.type, action.enqueueSnackbar);
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchOfficesMiddleware};
