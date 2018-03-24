import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-a4ab2.firebaseio.com/',

});

export default instance;
