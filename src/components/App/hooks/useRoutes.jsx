import { useState } from 'react';

// TODO: Store immutable data correctly
const useRoutes = () => {
  const [routes] = useState([
    { name: 'Home', path: '/' },
    { name: 'Blocks', path: '/blocks' },
    { name: 'Transactions', path: '/transactions' },
    {
      name: 'Network',
      paths: [
        {
          name: 'Stats',
          path: '/network-stats',
        },
        {
          name: 'Charts',
          path: '/network-charts',
        },
      ],
    },
    {
      name: 'Governance',
      paths: [
        {
          name: 'Stats',
          path: '/governance-stats',
        },
        {
          name: 'Charts',
          path: '/governance-charts',
        },
      ],
    },
    {
      name: 'Validators',
      paths: [
        {
          name: 'Stats',
          path: '/validators-stats',
        },
        {
          name: 'Charts',
          path: '/validators-charts',
        },
      ],
    },
    // { name: 'Validator', path: '/validator' },
  ]);

  return routes;
};

export default useRoutes;
