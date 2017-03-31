import React, { Component } from 'react';
import '../css/web-service-list.css';

export default ({ serviceList, activeService, setActiveService }) => {
  const serviceItems = serviceList.map(service => {
    const isActiveService = activeService && (activeService.id === service.id);
    const selected = isActiveService ? 'selected' : '';
    const itemProps = {
      key: service.id,
      className: 'list-group-item ${selected}',
      onClick: () => setActiveService(service)
    };
    return <li {...itemProps}>{service.name}</li>;
  });
  return (
    <div className="WebServiceList">
      <ul className="list-group">{serviceItems}</ul>
    </div>
  );
}