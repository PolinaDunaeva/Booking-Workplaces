import request from "../utils/request";

const getCountries = async (dispatch, type, enqueueSnackbar ) => {
    try {
        dispatch({type: type.start});
        const {data} = await request('GET', '/countries');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar(e.response.data, {variant: 'error'});
    }
};


export {getCountries};
