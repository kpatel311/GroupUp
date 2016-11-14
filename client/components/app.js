import React, {Component} from 'react';
import Header from './header';

import Confirmation from './utility/confirmation';

export default (props) => {
  return (
    <div>
      <Header />
      <div className="background-default padding-default">
        {props.children}
      </div>
    </div>
  );
};
