import React from 'react';
import Humanize from 'humanize-plus';
import moment from 'moment';
import Stat from '../Stat/Stat';
import './StatList.css';

const StatList = ({ webService }) => {
  const { request, response, time, startedDateTime } = webService.request;
  const dateFormat = 'MM/DD/YYYY h:mm.ss a';
  const stats = {
    'Service Name': webService.name,
    'Request Size': Humanize.fileSize(request.bodySize),
    'Response Size': Humanize.fileSize(response.bodySize),
    'Response Time': Math.ceil(time * 100) / 100,
    'Started Date Time': moment(startedDateTime).format(dateFormat),
    'Response Status': response.status
  };
  const listOfStats = Object.keys(stats).map((key, index) =>
    <Stat label={key} value={stats[key]} key={index} />
  );
  return (
    <div className="StatList">
      {listOfStats}
    </div>
  );
};

export default StatList;
