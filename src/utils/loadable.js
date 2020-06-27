import React, { lazy, Suspense } from 'react';

const loadable = (importFunc, options) => {
  const LazyComponent = lazy(importFunc);

  const { fallbackComponent = null } = options;

  return (props) => (
    <Suspense fallback={fallbackComponent}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
