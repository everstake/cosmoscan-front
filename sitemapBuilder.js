// TODO: Cannot import the actual API service because of imports
const axios = require('axios').default;
// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  extends: './.babelrc',
});

require.extensions['.css'] = () => {};
const Sitemap = require('react-router-sitemap').default;
const router = require('./src/routes').default;

const filterConfig = {
  isValid: false,
  rules: [/\/auth/, /\*/],
};

const getProposalsIDs = async () => {
  try {
    // TODO: Cannot use process.env. Base URL is hardcoded.
    //  Not using existing API methods
    const proposals = await axios.get(`https://api.cosmoscan.net/proposals`);
    return proposals.data.map((proposal) => {
      return {
        id: proposal.id,
      };
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

const getValidatorsIDs = async () => {
  try {
    // TODO: Cannot use process.env. Base URL is hardcoded.
    //  Not using existing API methods
    const validators = await axios.get(`https://api.cosmoscan.net/validators`);
    return validators.data.map((validator) => {
      return {
        address: validator.operator_address,
      };
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

const buildParamsConfig = async () => {
  const paramsConfig = {
    '/proposal/:id': [],
    '/validator/:address': [],
  };

  try {
    paramsConfig['/proposal/:id'] = await getProposalsIDs();
    paramsConfig['/validator/:address'] = await getValidatorsIDs();

    return paramsConfig;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return paramsConfig;
  }
};

// eslint-disable-next-line consistent-return
const buildSitemap = async () => {
  try {
    return new Sitemap(router())
      .filterPaths(filterConfig)
      .applyParams(await buildParamsConfig())
      .build('https://cosmoscan.net', { limitCountPaths: 5000 })
      .save('./public/sitemap.xml');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

buildSitemap();
