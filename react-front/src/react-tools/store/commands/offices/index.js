import request from "../utils/request";

const getOffices = async (dispatch, type, enqueueSnackbar ) => {
    try {
        dispatch({type: type.start});
        const {data} = await request('GET', '/offices');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar(e.message, {variant: 'error'});
        dispatch({type: type.success, payload: [{country: 'USA', name: 'Greencity'}, {country: 'USA', name: 'Redcity'}, {country: 'Belarus', name: 'Bluecity'}]});
    }
};

export {getOffices};
