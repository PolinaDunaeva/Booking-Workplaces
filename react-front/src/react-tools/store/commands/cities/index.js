import request from "../utils/request";

const getCities = async (dispatch, type, enqueueSnackbar ) => {
    try {
        dispatch({type: type.start});
        const {data} = await request('GET', '/cities');
        dispatch({type: type.success, payload: data});
    } catch (e) {
        enqueueSnackbar(e.response.data, {variant: 'error'});
    }
};


export {getCities};
