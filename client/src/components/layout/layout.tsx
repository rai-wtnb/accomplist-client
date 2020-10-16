import React, { FC } from 'react';

import { Header, Footer } from './index';

export const Layout: FC = (props) => {
  return (
    <div className="layout container md:w-3/5">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};
