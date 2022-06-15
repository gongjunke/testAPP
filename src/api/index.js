import api from './axios.js';

export const getGrossingList = (params) => api.get(`${process.env.VUE_APP_BASE_API}/rss/topgrossingapplications/limit=${params.limit}/json`)
export const getFreeList = (params) => api.get(`${process.env.VUE_APP_BASE_API}/rss/topfreeapplications/limit=${params.limit}/json`)
export const getLookupData = (params) => api.get(`${process.env.VUE_APP_BASE_API}/lookup?id=${params.ids}`)
