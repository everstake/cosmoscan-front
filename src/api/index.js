import axios from 'axios';
import queryString from 'querystring';
import moment from 'moment';
import { changeChain } from '../utils';

const formatParams = (params) =>
  params && Object.keys(params).length
    ? `?${queryString.stringify(params)}`
    : '';

const APIService = axios.create({
  timeout: 30000,
  responseType: 'json',
});

APIService.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.baseURL = await changeChain();
    return config;
  },
  (error) => Promise.reject(error),
);

const API = {
  getMetaStats() {
    return APIService.get('meta');
  },
  getHistoricalState() {
    return APIService.get('historical-state');
  },
  getTxVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `transfers/volume/agg${formatParams({ by, ...params })}`,
    );
  },
  getFeeVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/transactions/fee/agg${formatParams({ by, ...params })}`,
    );
  },
  getBondedRatio(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/bonded-ratio/agg${formatParams({ by, ...params })}`,
    );
  },
  getBlocks(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/blocks/count/agg${formatParams({ by, ...params })}`,
    );
  },
  getBlockDelay(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/blocks/delay/agg${formatParams({ by, ...params })}`,
    );
  },
  getValidators(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/blocks/validators/uniq/agg${formatParams({ by, ...params })}`,
    );
  },
  getOperations(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/operations/count/agg${formatParams({ by, ...params })}`,
    );
  },
  getDelegationVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/delegations/volume/agg${formatParams({ by, ...params })}`,
    );
  },
  getUndelegationVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/undelegations/volume/agg${formatParams({ by, ...params })}`,
    );
  },
  getUnbondingVol(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/unbonding/volume/agg${formatParams({ by, ...params })}`,
    );
  },
  getNetworkStats(params = {}) {
    const { to = moment().startOf('day').unix() } = params;
    return APIService.get(`/network/stats${formatParams({ to, ...params })}`);
  },
  getVotingPower() {
    return APIService.get('/staking/pie');
  },
  getProposals(params = {}) {
    // const { limit = 0, offset = 0 } = params;
    return APIService.get(`/proposals${formatParams({ ...params })}`);
  },
  getVotes(params = {}) {
    return APIService.get(`/proposals/votes${formatParams({ ...params })}`);
  },
  getProposalsCharts() {
    return APIService.get('/proposals/chart');
  },
  getValidatorsVotingPower(params = {}) {
    const { by = 'day' } = params;
    return APIService.get(
      `/validators/33power/agg${formatParams({ by, ...params })}`,
    );
  },
  getValidatorsList() {
    return APIService.get('/validators');
  },
  getBlocksProposed() {
    return APIService.get('/validators/top/proposed');
  },
  getJailed() {
    return APIService.get('/validators/top/jailed');
  },
  getFeeRanges() {
    return APIService.get('/validators/fee/ranges');
  },
  getDelegators() {
    return APIService.get('/validators/delegators/total');
  },
  getValidatorInfo(address) {
    return APIService.get(`/validator/${address}`);
  },
  getBalanceDistribution(address) {
    return APIService.get(`/validator/${address}/balance`);
  },
  getDelegatedBalance(address) {
    return APIService.get(`/validator/${address}/delegations/agg`);
  },
  getNumOfDelegators(address) {
    return APIService.get(`/validator/${address}/delegators/agg`);
  },
  getValidatorStats(address) {
    return APIService.get(`/validator/${address}/blocks/stats`);
  },
  getValidatorDelegators(params) {
    const { limit = 10, offset = 0, address } = params;
    return APIService.get(
      `/validator/${address}/delegators${formatParams({ limit, offset })}`,
    );
  },
  getBlockList(params) {
    return APIService.get(`/blocks${formatParams(params)}`);
  },
  getTransactionList(params) {
    return APIService.get(`/transactions${formatParams(params)}`);
  },
  getBlockDetails(height) {
    return APIService.get(`/block/${height}`);
  },
  getTransactionDetails(hash) {
    return APIService.get(`/transaction/${hash}`);
  },
  getAccountDetails(address) {
    return APIService.get(`/account/${address}`);
  },
};

export default API;
