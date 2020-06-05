import axios from 'axios';
import queryString from 'querystring';
import { removeTrailingSlash } from '../utils';

const formatParams = (params) => (params && Object.keys(params).length ? `?${queryString.stringify(params)}` : '');

const APIService = axios.create({
  baseURL: removeTrailingSlash(process.env.REACT_APP_API_HOST),
  timeout: 30000,
  responseType: 'json',
});

const API = {
  getMetaStats() {
    return APIService.get('meta');
  },
  getHistoricalState() {
    return APIService.get('historical-state');
  },
  getTxVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`transfers/volume/agg${formatParams({ by, ...params })}`);
  },
  getFeeVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`/transactions/fee/agg${formatParams({ by, ...params })}`);
  },
};

export default API;
