import axios from 'axios';

// Central Axios instance. Every screen imports this instead of writing the
// full API URL and options repeatedly.
//
// We use JSONPlaceholder (a free fake REST API) as a stand-in backend so the
// app has something real to GET/POST/PUT/DELETE against — swap baseURL for
// your real API when you have one.
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
});

export default api;
