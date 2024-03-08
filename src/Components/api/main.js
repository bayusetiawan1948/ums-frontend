import axios from 'axios';

// inisialisasi axios
const instance = axios.create({
  baseUrl: 'http://127.0.0.1:8000/api',
});

export default instance;
