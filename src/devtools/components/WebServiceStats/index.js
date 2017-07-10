import React from 'react';
import Humanize from 'humanize-plus';
import moment from 'moment';
import './WebServiceStats.css';

export default ({ webService }) => {
  const { request, response, time, startedDateTime } = webService.request;
  const dateFormat = 'MM/DD/YYYY h:mm.ss a';
  const requestSize = Humanize.fileSize(request.bodySize);
  const responseSize = Humanize.fileSize(response.bodySize);
  const responseTime = Math.ceil(time * 100) / 100;
  const dateTime = moment(startedDateTime).format(dateFormat);
  const status = response.status;
  return (
    <div className="WebServiceStats">
      <span className="key">Service Name:</span> {webService.name} <br/>
      <span className="key">Request Size:</span> {requestSize} <br/>
      <span className="key">Response Size:</span> {responseSize} <br/>
      <span className="key">Response Time:</span> {responseTime} ms <br/>
      <span className="key">Started Date Time:</span> {dateTime} <br/>
      <span className="key">Response Status:</span> {status} <br/>
    </div>
  );
};
