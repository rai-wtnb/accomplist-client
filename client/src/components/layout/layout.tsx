import React, { FC } from 'react';

import { Header, Footer } from './index';

export const Layout: FC = (props) => {
  return (
    <div className='container layout'>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};
