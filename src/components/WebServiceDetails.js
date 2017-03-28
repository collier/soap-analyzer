import React, { Component } from 'react';

export default class WebServiceList extends Component {

  render() {
    return (
      <div className="service-details-container">
        <div className="service-details">
          <ul className="nav nav-tabs" role="tablist">
            <li className="active"><a href="#request" data-toggle="tab">Request</a></li>
            <li><a href="#response" data-toggle="tab">Response</a></li>
            <li><a href="#all" data-toggle="tab">All</a></li>
            <li><a href="#details" data-toggle="tab">Details</a></li>
          </ul>
          <div className="service-detail tab-content">
            <div role="tabpanel" className="tab-pane active pretty-xml" id="request"></div>
            <div role="tabpanel" className="tab-pane pretty-xml" id="response"></div>
            <div role="tabpanel" className="tab-pane" id="all"></div>
            <div role="tabpanel" className="tab-pane" id="details"></div>
          </div>
        </div>
      </div>
    );
  }

}