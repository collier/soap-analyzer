import React from 'react';
import './WebServiceList.css';

export default ({ services, setActiveService }) => {
  const ServiceItems = services.map((service) => {
    const isSelectedClass = service.isActive ? 'selected' : '';
    const attrs = {
      key: service.id,
      className: `list-group-item ${isSelectedClass}`,
      onClick: () => setActiveService(service.id)
    };
    return <li {...attrs}>{service.name}</li>;
  });
  return (
    <div className="WebServiceList">
      <ul className="list-group">{ServiceItems}</ul>
    </div>
  );
}