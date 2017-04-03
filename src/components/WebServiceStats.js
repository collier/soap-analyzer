import React, { Component } from 'react';
import Humanize from 'humanize-plus';
import moment from 'moment';
import '../css/web-service-stats.css';

export default ({ webService }) => {
  const dateFormat = 'MM/DD/YYYY h:mm.ss a';
  const requestSize = Humanize.fileSize(webService.request.request.bodySize);
  const responseSize = Humanize.fileSize(webService.request.response.bodySize);
  const responseTime = Math.ceil(webService.request.time * 100) / 100;
  const startedDateTime = moment(webService.request.startedDateTime).format(dateFormat);
  const status = webService.request.response.status;
  return (
    <div className="WebServiceStats">
      <span className="key">Service Name:</span> {webService.name} <br/>
      <span className="key">Request Size:</span> {requestSize} <br/>
      <span className="key">Response Size:</span> {responseSize} <br/>
      <span className="key">Response Time:</span> {responseTime} ms <br/>
      <span className="key">Started Date Time:</span> {startedDateTime} <br/>
      <span className="key">Response Status:</span> {status} <br/>
    </div>
  );
};
