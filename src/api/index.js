import axios from 'axios';
import queryString from 'querystring';
import moment from 'moment';
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
  getBlocks(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`/blocks/count/agg${formatParams({ by, ...params })}`);
  },
  getBlockDelay(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`/blocks/delay/agg${formatParams({ by, ...params })}`);
  },
  getValidators(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`/blocks/validators/uniq/agg${formatParams({ by, ...params })}`);
  },
  getOperations(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`/operations/count/agg${formatParams({ by, ...params })}`);
  },
  getDelegationVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`/delegations/volume/agg${formatParams({ by, ...params })}`);
  },
  getUndelegationVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(`/undelegations/volume/agg${formatParams({ by, ...params })}`);
  },
  getNetworkStats(params = {}) {
    const { to = moment().startOf('day').unix() } = params;
    return APIService.get(`/network/stats${formatParams({ to, ...params })}`);
  },
  getVotingPower() {
    return APIService.get('/staking/pie');
  },
  getProposals(params = {}) {
    const { limit = 0, offset = 0 } = params;
    return APIService.get(`/proposals${formatParams({ limit, offset, ...params })}`);
  },
};

export default API;
