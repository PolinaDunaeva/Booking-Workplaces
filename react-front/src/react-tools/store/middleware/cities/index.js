import {getCities} from "../../commands/cities/index.js";

function dispatchCitiesMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_CITIES_DATA':
                getCities(dispatch, action.type, action.enqueueSnackbar);
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchCitiesMiddleware};
