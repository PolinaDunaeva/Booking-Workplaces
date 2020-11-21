import axios from 'axios';
import {withSnackbar} from 'notistack';

function logOut () {
    localStorage.removeItem('key');
    document.location.reload();
}

const RequestInterceptor = () => {
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (error.response.status == 401 || error.response.status == 403)
            logOut();
        return Promise.reject(error);
    });

    return null;
};

export default withSnackbar(RequestInterceptor)
