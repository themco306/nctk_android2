import axios from "axios";
import AppUrl from "./AppUrl";
// import Store from "../state/Store";

const configInstance={
    baseURL: AppUrl.baseURL,
    headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
    }
};

const axiosInstance = axios.create(configInstance);

axiosInstance.interceptors.request.use(function (config) {
    // const token = Store.getState().user.token;
    const token ='c9fad84b250ac520ee9951cf5f746e462c927473c8e32ac9f6c6c61513c0645326af4ff52bb70913ede97daf34b797edbda74284b01fe6b60024fc226a456174c267995e93b03a07723e95af75350f8db39e687f6b16c801817ffc7446036575db41ef5938cc0ed696debc547036f05401073c00a8f183822b001383110b07db';
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;