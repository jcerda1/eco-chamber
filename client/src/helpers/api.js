import axios from 'axios';

const get = (route, params) => axios.get(route, { params }).then(res => res.data);

module.exports = {
  get,
}
