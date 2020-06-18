import { useState } from 'react';

// TODO: Store immutable data correctly
const useRoutes = () => {
  const [routes] = useState([
    { name: 'Home', path: '/' },
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
      ],
    },
    // { name: 'Trading', path: '/trading' },
    // { name: 'Validator', path: '/validator' },
  ]);

  return routes;
};

export default useRoutes;
