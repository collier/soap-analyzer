import React from 'react';
import Header from '../Header/Header';
import ServiceList from '../ServiceList/ServiceList';
import ServicePanel from '../ServicePanel/ServicePanel';

export default (props) => (
  <div className={`theme-${props.theme}`}>
    <div className="App">
      <div className="row">
        <div className="col-xs-12">
          <Header {...props} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-3 web-service-list-container">
          <ServiceList {...props} />
        </div>
        <div className="col-xs-9 web-service-details-container">
          <ServicePanel {...props} />
        </div>
      </div>
    </div>
  </div>
);
