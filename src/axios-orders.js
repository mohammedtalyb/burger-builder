import axios from 'axios';

const instance = axios.create();

instance.defaults.baseURL = 'https://react-burger-builder-3bb2b.firebaseio.com/';

export default instance;