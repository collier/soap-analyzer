import React from 'react';
import './ServiceList.css';

const ServiceList = ({ services, setActiveService }) => {
  const serviceItems = services.map((service) => {
    const isSelectedClass = service.isActive ? 'selected' : '';
    const attrs = {
      key: service.id,
      className: `list-group-item ${isSelectedClass}`,
      onClick: () => setActiveService(service.id)
    };
    return <li {...attrs}>{service.name}</li>;
  });
  return (
    <div className="ServiceList">
      <ul className="list-group">
        {serviceItems}
      </ul>
    </div>
  );
}

export default ServiceList;
