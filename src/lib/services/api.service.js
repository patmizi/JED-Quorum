import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { API_URL } from './api.config';

const ApiService = {
    init() {
      Vue.use(VueAxios, axios);
      Vue.axios.defaults.baseURL = API_URL;
    },
    setHeader() {
      console.log("This does nothing at the moment :)"); //TODO: Replace with authorization header
    },
    get(res, id="") {
      return Vue.axios
        .get(`${res}/${id}`)
        .catch((err) => {
          throw new Error(`[GET] error at ${res}/${id} => ${err}`);
        })
    },
    post(res, params){
        return Vue.axios
          .post(`${res}`, params)
          .catch((err) => {
            throw new Error(`[POST] error at ${res} with params ${params} => ${err}`);
          })
    },
    update(res, id="", params={}){
        return Vue.axios
          .patch(`${res}/${id}`, params)
          .catch((err) => {
            throw new Error(`[PATCH] error at ${res}/${id} with params ${params} => ${err}`);
          })
    },
    delete(res){
      return Vue.axios
        .delete(`${res}`)
        .catch((err) => { throw new Error(`[DELETE] error at ${res} => ${err}`) });
    }
};
export default ApiService;

export const DoctorService = {
  get_all() {
    return ApiService.get('doctors')
  },
  get(id) {
    return ApiService.get('doctors', id)
  },
  update(id, data) {
    return ApiService.update('doctors', id, data)
  }
};

export const ReceptionistService = {
  get_all() {
    return ApiService.get('receptionists')
  },
  get(id) {
    return ApiService.get('receptionists', id)
  },
  update(id, data) {
    return ApiService.update('receptionists', id, data)
  }
};