import axios from "axios";

const clienteAxios = axios.create({

    // baseURL: process.env.REACT_APP_BACKEND_URL
        baseURL: 'https://powerful-dusk-56501.herokuapp.com/'
});

export default clienteAxios;
