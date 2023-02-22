import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://suaapi.com', // coloque aqui a URL base da sua API
  timeout: 5000, // tempo máximo de espera para uma resposta da API
});

export default instance;
