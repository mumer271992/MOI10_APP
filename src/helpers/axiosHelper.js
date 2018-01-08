import axios from 'axios';

const API_URL = 'http://api.moi10.com';

export const get = (endpoint, queryParams = undefined) => {
    let url = API_URL + endpoint;
    let config = {};
    config = mergeHeaders(config);
    if(queryParams){
        config.params = queryParams;
    }

    return axios.get(url, config);
    
}

export const post = (endpoint, data) => {
    let url = API_URL + endpoint;
    let config = {};
    config = mergeHeaders(config);

    return axios.post(url, data, config);
}

const mergeHeaders = (config) => {
    let token = localStorage.getItem('auth_token');
    config.headers = {
        'Content-Type': 'application/json'
    };
    if(token){
        config.headers.Authorization = `Basic ${token}`
    }
    return config;
}

const serialize = function(obj) {
    var str = [];
    for(var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
}