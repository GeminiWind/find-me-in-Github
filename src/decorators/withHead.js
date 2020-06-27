import React from 'react';
import Helmet from 'react-helmet';

const withHead = (Head) => (Component) => (props) => (
  <>
    <Helmet>
      <Head />
    </Helmet>
    <Component {...props} />
  </>
);

export default withHead;
