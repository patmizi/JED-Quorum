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
        console.log(`endpoint: ${res}/${id}`);
        return Vue.axios
          .put(`${res}/${id}`, params)
          .catch((err) => {
            throw new Error(`[PUT] error at ${res}/${id} with params ${params} => ${err}`);
          })
    },
    delete(res, id=""){
      return Vue.axios
        .delete(`${res}/${id}`)
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

export const PatientService = {
  get_all() {
    return ApiService.get('patients', '');
  },
  get(id) {
    return ApiService.get('patients', id)
  },
  update(id, data) {
    console.log("params: ", id, data);
    return ApiService.update('patients', id, data)
  },
  delete(id) {
    return ApiService.delete('patients', id)
  },
  add(data) {
    return ApiService.post('patients', data)
  }
};
