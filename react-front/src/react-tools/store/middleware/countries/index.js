import {getCountries} from "../../commands/countries/index";

function dispatchCountriesMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_COUNTRIES_DATA':
                getCountries(dispatch, action.type, action.enqueueSnackbar);
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchCountriesMiddleware};
