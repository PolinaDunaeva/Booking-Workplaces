import axios from 'axios';

const request = (method, url, data, params, config, responseType) => {
  const token = !!localStorage.getItem('key') ?
      localStorage.getItem('key') :
      'some token';
  const headers = {'Authorization': `Bearer ${token}`, };
  return (
      axios({
        method,
        url,
        data,
        headers,
        baseURL: 'http://localhost:8080',
        validateStatus: status => (status >= 200 && status < 300),
        responseType,
      })
  );
};

export default request;
