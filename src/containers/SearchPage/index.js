import React from 'react';
import loadable from '../../utils/loadable';
import TopBarProgress from '../../components/TopBarProgress';

export default loadable(() => import('./SearchPage'), {
  fallbackComponent: <TopBarProgress />,
});
