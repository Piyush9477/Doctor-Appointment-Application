import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const addBalance = (data, token) => 
    API.post('/wallet/addBalance', data, { headers: { Authorization: token } });
