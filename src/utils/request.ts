import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../configs/envconfig';

const service = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    timeout: 15000,
});

service.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
service.defaults.headers.post['Content-Type'] = 'application/json';

service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default function request(config: AxiosRequestConfig) {
    return service(config).then((res) => {
        if (res.status !== 200) {
            return Promise.reject(res);
        }
        if (typeof res.data !== 'object') {
            return Promise.reject(res.data);
        }
        return Promise.resolve(res.data);
    });
}
