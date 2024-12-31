import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const bookAppointment = (data, token) => 
    API.post('/appointments/books', data, { headers: { Authorization: token } });

export const getDoctors = (token) => 
    API.get('/users/doctors', { headers: { Authorization: token } });

export const getReport = (data, token) => 
    API.post('/reports/generate', data, { headers: { Authorization: token } });