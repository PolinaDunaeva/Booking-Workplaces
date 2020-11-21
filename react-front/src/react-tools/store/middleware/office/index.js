import {getOffice, postOffice, deleteOffice, putOffice} from "../../commands/office";

function dispatchOfficeMiddleware(dispatch) {
    return (action) => {
        switch (action.type.base) {
            case 'GET_OFFICE_DATA':
                getOffice(dispatch, action.type, action.enqueueSnackbar, action.id, action.floor);
                break;
            case 'PUT_OFFICE_DATA':
                putOffice(dispatch, action.type, action.enqueueSnackbar, action.id, action.officeFields.floor, action.delta)
                    .then(() => {
                        action.delta.additions.clear();
                        action.delta.deletions.clear();
                    });
                break;
            case 'POST_OFFICE_DATA':
                console.log('delta', action.delta);
                postOffice(dispatch, action.type, action.enqueueSnackbar, action.officeFields.floor, action.officeFields.name,
                    action.officeFields.country, action.newCountry, action.officeFields.city, action.newCity,
                    action.height, action.width, action.delta)
                    .then(res => {
                        action.delta.additions.clear();
                        action.delta.deletions.clear();
                        window.location.href = `/office/${res}`;
                    });
                break;
            case 'DELETE_OFFICE_DATA':
                deleteOffice(dispatch, action.type, action.enqueueSnackbar, action.id, action.floors, action.map)
                    .then(() => window.location.href = '/');
                break;
            case 'SET_OFFICE_DATA':
                dispatch({type: action.type.success, payload: action.id});
                break;
            case 'RESET_OFFICE_DATA':
                dispatch({type: action.type.success});
                break;
            default:
                return dispatch(action);
        }
    };
}

export {dispatchOfficeMiddleware};
