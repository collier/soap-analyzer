import React, { Component } from 'react';
import '../css/web-service-list.css';

export default ({ serviceList, setActiveService }) => {
  const serviceItems = serviceList.map(service => {
    const itemProps = {
      key: service.id,
      className: `list-group-item ${service.isActive ? 'selected' : ''}`,
      onClick: () => setActiveService(service.id)
    };
    return <li {...itemProps}>{service.name}</li>;
  });
  return (
    <div className="WebServiceList">
      <ul className="list-group">{serviceItems}</ul>
    </div>
  );
}