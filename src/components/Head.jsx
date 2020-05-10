import React from 'react';
import {Helmet} from 'react-helmet';

const Head =()=>(
  <Helmet>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <meta charSet="utf-8" />
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
    <title>Kims Books Review App</title>
    <meta name="description" content="description" />
  </Helmet>
)
export default Head;