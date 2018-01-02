import React from 'react';
import Header from '../Header';
import WebServiceList from '../WebServiceList';
import WebServiceDetails from '../WebServiceDetails';

export default (props) => (
  <div className={`theme-${props.settings.theme}`}>
    <div className="App">
      <div className="row">
        <div className="col-md-3 web-service-list-container">
          <Header {...props} />
          <WebServiceList {...props} />
        </div>
        <div className="col-md-9 web-service-details-container">
          <WebServiceDetails {...props} />
        </div>
      </div>
    </div>
  </div>
);
